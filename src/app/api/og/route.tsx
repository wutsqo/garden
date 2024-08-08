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
          }/og-lg.png)`,
          padding: "110px 120px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "48px",
            paddingLeft: "8px",
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
            height: "600px",
            gap: "48px",
          }}
        >
          <div
            style={{
              fontSize: "128px",
              fontStyle: "normal",
            }}
          >
            {title ?? "Muhammad Urwatil Wutsqo"}
          </div>
          <div
            style={{
              fontSize: "64px",
              fontStyle: "normal",
              paddingLeft: "8px",
            }}
          >
            {description}
          </div>
        </div>
      </div>
    ),
    {
      width: 2000,
      height: 1000,
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
