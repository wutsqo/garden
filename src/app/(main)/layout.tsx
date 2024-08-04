import "./globals.css";
import Navbar from "@components/home/components/navbar";
import Footer from "@components/home/components/footer";
import dynamic from "next/dynamic";

const Mondrian = dynamic(() => import("@components/mondrian"), {
  ssr: false,
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
    <html lang="en">
      <body>
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
