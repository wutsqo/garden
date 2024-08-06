import "./globals.css";
import Navbar from "@components/home/components/navbar";
import Footer from "@components/home/components/footer";
import dynamic from "next/dynamic";
import { Chivo, Chivo_Mono } from "next/font/google";

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

export const metadata = {
  title: "Muhammad Urwatil Wutsqo",
  description:
    "I can translate your ideas into web applications in lightning speed.",
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
