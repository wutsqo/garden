import "./globals.css";
import Navbar from "@components/home/components/navbar";
import Footer from "@components/home/components/footer";
import dynamic from "next/dynamic";
import { Chivo, Chivo_Mono } from "next/font/google";
import { Metadata } from "next";

const Mondrian = dynamic(() => import("@components/mondrian"), {
  ssr: false,
});

const chivo = Chivo({
  display: "swap",
  variable: "--font-chivo",
  subsets: ["latin"],
});

const chivoMono = Chivo_Mono({
  display: "swap",
  variable: "--font-chivo-mono",
  subsets: ["latin"],
});

const defaultMetadata = {
  title: "Muhammad Urwatil Wutsqo",
  description:
    "The personal site and portfolio of creative technologist Muhammad Urwatil Wutsqo",
};

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${chivo.variable} ${chivoMono.variable}`}>
      <body className="font-mono">
        <Navbar />
        <div className="mt-8 absolute">
          <Mondrian keyPrefix="header" />
        </div>
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
