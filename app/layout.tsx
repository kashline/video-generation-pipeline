import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DESCRIPTION =
  "An autonomous multi-agent pipeline that researches, writes, grades, narrates, " +
  "illustrates, renders and publishes short-form video to YouTube — unattended, " +
  "at seven cents a video.";

export const metadata: Metadata = {
  metadataBase: new URL("https://video-generation-pipeline-silk.vercel.app"),
  title: "Autonomous Video Pipeline",
  description: DESCRIPTION,
  openGraph: {
    title: "Autonomous Video Pipeline",
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
