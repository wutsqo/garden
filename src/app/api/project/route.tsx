export async function POST(req: Request) {
  const formData = await req.formData();
  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    details: formData.get("details"),
  };

  const res = await fetch(`${process.env.DISCORD_WEBHOOK_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `New project request from ${rawFormData.name}`,
      embeds: [
        {
          title: rawFormData.name,
          description: rawFormData.details,
          fields: [
            {
              name: "Email",
              value: rawFormData.email,
            },
          ],
        },
      ],
    }),
  });

  if (res.status === 204) {
    return Response.json({ success: true, message: "Project submitted!" });
  } else {
    return Response.json({ success: false, message: "Something went wrong" });
  }
}
