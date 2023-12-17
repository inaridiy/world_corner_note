import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Toaster from "@/app/toaster";
import { Github } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "World Corner Note",
  description: "Use it first, feel it.",
  openGraph: {
    title: "World Corner Note",
    images: [
      {
        url: "https://www.world-corner.net/ogp.webp",
        alt: "World Corner Note",
      },
    ],
    siteName: "API Gen",
    type: "website",
    url: "https://www.world-corner.net/",
    description:
      "Read the posts of an anonymous someone and post as anonymous. In a world without the existence of precise searches, encounter fleeting moments through someone's notebook",
  },
  twitter: {
    title: "World Corner Note",
    card: "summary",
    description:
      "Read the posts of an anonymous someone and post as anonymous. In a world without the existence of precise searches, encounter fleeting moments through someone's notebook",
    images: "https://www.world-corner.net/ogp.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
        <div className="fixed top-4 right-4">
          <a
            className="rounded-full p-2"
            href="https://github.com/inaridiy/world_corner_note"
          >
            <Github size={32} />
          </a>
        </div>
      </body>
    </html>
  );
}
