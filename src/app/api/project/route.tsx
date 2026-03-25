import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;
const MAX_DETAILS_LENGTH = 2_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const submissions = new Map<string, number[]>();

const getIpAddress = (req: Request) =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  req.headers.get("x-real-ip") ??
  "unknown";

const trimToString = (value: FormDataEntryValue | null) =>
  typeof value === "string" ? value.trim() : "";

const escapeDiscordMentions = (value: string) => value.replace(/@/g, "@\u200b");

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const recentRequests = (submissions.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  recentRequests.push(now);
  submissions.set(ip, recentRequests);

  return recentRequests.length > RATE_LIMIT_MAX_REQUESTS;
};

export async function POST(req: Request) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { success: false, message: "Project submissions are temporarily unavailable." },
      { status: 503 }
    );
  }

  const ipAddress = getIpAddress(req);
  if (isRateLimited(ipAddress)) {
    return NextResponse.json(
      { success: false, message: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  const formData = await req.formData();
  const name = trimToString(formData.get("name"));
  const email = trimToString(formData.get("email"));
  const details = trimToString(formData.get("details"));
  const website = trimToString(formData.get("website"));

  if (website) {
    return NextResponse.json({ success: true, message: "Project submitted!" });
  }

  if (!name || !email || !details) {
    return NextResponse.json(
      { success: false, message: "All fields are required." },
      { status: 400 }
    );
  }

  if (
    name.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    details.length > MAX_DETAILS_LENGTH
  ) {
    return NextResponse.json(
      { success: false, message: "One or more fields are too long." },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { success: false, message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `New project request from ${escapeDiscordMentions(name)}`,
        embeds: [
          {
            title: escapeDiscordMentions(name),
            description: escapeDiscordMentions(details),
            fields: [
              {
                name: "Email",
                value: escapeDiscordMentions(email),
              },
            ],
          },
        ],
      }),
    });

    if (res.status === 204) {
      return NextResponse.json({ success: true, message: "Project submitted!" });
    }
  } catch {
    return NextResponse.json(
      { success: false, message: "Project submissions are temporarily unavailable." },
      { status: 502 }
    );
  }

  return NextResponse.json(
    { success: false, message: "Something went wrong" },
    { status: 502 }
  );
}
