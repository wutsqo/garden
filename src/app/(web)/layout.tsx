import "./globals.css";
import Navbar from "@components/navbar";
import { Space_Mono, Figtree } from "next/font/google";
import { Metadata } from "next";
import Mondrian from "@components/mondrian";
import Footer from "@components/footer";

const defaultMetadata = {
  title: "Muhammad Urwatil Wutsqo",
  description: "The personal site and portfolio of creative technologist Muhammad Urwatil Wutsqo",
};

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-space-mono",
  subsets: ["latin"],
});

const figtree = Figtree({
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-figtree",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${figtree.variable}`}>
      <body className="font-sans">
        <Navbar />
        <div className="absolute z-10 mt-8">
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
        url: `${process.env.SITE_URL ?? "http://localhost:3000"}/og.png`,
        width: 1200,
        height: 630,
        alt: defaultMetadata.title,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
