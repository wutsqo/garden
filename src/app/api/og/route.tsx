import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  const chivo = await fetch(
    new URL("../../../../public/Chivo-Regular.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());
  const chivoMono = await fetch(
    new URL("../../../../public/ChivoMono-Regular.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          backgroundImage: `url(${
            process.env.SITE_URL ?? "http://localhost:3000"
          }/og.png)`,
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "24px",
            fontFamily: "Chivo Mono",
          }}
        >
          <span style={{ color: "#DA1D7E" }}>W</span>
          <span style={{ color: "#F8B725" }}>W</span>
          <span style={{ color: "#885EDD" }}>W</span>
          <span style={{ color: "#23C8A0" }}>UTSQO</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            height: "360px",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontStyle: "normal",
            }}
          >
            {title ?? "Muhammad Urwatil Wutsqo"}
          </div>
          <div
            style={{
              fontSize: "32px",
              fontStyle: "normal",
              paddingLeft: "4px",
            }}
          >
            {description}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Chivo",
          data: chivo,
          style: "normal",
        },
        {
          name: "Chivo Mono",
          data: chivoMono,
          style: "normal",
        },
      ],
    }
  );
}
