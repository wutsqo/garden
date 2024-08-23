import "./globals.css";
import Navbar from "@components/navbar";
import dynamic from "next/dynamic";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import { Metadata } from "next";

const Mondrian = dynamic(() => import("@components/mondrian"), {
  ssr: false,
});
const Footer = dynamic(() => import("@components/footer"));

const defaultMetadata = {
  title: "Muhammad Urwatil Wutsqo",
  description:
    "The personal site and portfolio of creative technologist Muhammad Urwatil Wutsqo",
};

const space = Space_Grotesk({
  display: "swap",
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-space-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${space.variable} ${spaceMono.variable}`}>
      <body className="font-mono">
        <Navbar />
        <div className="mt-8 absolute z-10">
          <Mondrian keyPrefix="header" />
        </div>
        <div className="min-h-screen pt-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: defaultMetadata.title,
  description: defaultMetadata.description,
  openGraph: {
    title: defaultMetadata.title,
    url: process.env.SITE_URL ?? "http://localhost:3000",
    description: defaultMetadata.description,
    siteName: defaultMetadata.title,
    images: [
      {
        url: `${process.env.SITE_URL ?? "http://localhost:3000"}/api/og?title=${
          defaultMetadata.title
        }&description=${defaultMetadata.description}`,
        width: 1200,
        height: 630,
        alt: defaultMetadata.title,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
