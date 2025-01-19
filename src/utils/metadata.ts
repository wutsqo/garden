import { Metadata } from "next";

const URL = process.env.SITE_URL ?? "http://localhost:3000";

export const DEFAULT_METADATA: Metadata = {
  title: "The Garden of Wutsqo",
  description: "The portfolio and digital garden of Wutsqo.",
  authors: [
    {
      name: "Muhammad Urwatil Wutsqo",
      url: URL,
    },
  ],
  robots: "index, follow",
  twitter: {
    card: "summary_large_image",
    site: "@gitcommitsudoku",
    title: "The Garden of Wutsqo",
    description: "The portfolio and digital garden of Wutsqo.",
    images: {
      url: `${URL}/og.png`,
      alt: "The Garden of Wutsqo",
    },
  },
  openGraph: {
    title: "The Garden of Wutsqo",
    url: URL,
    description: "The portfolio and digital garden of Wutsqo.",
    siteName: "The Garden of Wutsqo",
    images: [
      {
        url: `${URL}/og.png`,
        width: 1200,
        height: 630,
        alt: "The Garden of Wutsqo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
