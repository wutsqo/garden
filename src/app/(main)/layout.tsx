import "./globals.css";
import Navbar from "@components/home/components/navbar";
import Footer from "@components/home/components/footer";
import Mondrian from "@components/mondrian";

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
          <Mondrian />
        </div>
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
