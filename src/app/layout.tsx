import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Agents Builder | Orchestrate Your AI Team",
  description: "Enterprise-grade autonomous fleet architect. Design, configure, and initialize your AI agent teams with technical precision.",
  openGraph: {
    title: "AI Agents Builder | Orchestrate Your AI Team",
    description: "Enterprise-grade autonomous fleet architect. Design, configure, and initialize your AI agent teams with technical precision.",
    url: "https://agt-builder.vercel.app",
    siteName: "AI Agents Builder",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Agents Builder Preview",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agents Builder | Orchestrate Your AI Team",
    description: "Enterprise-grade autonomous fleet architect. Design, configure, and initialize your AI agent teams with technical precision.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#FDFDFF] text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
