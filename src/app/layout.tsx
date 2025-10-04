import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/providers";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://formify.sandeeprajput.in"),
  title: "Formify – AI-Powered Form Builder",
  description:
    "Formify is an AI-powered drag-and-drop form builder that helps you create customizable, smart, and professional forms in minutes. Build, manage, and analyze forms effortlessly with modern features like AI generation, analytics, and integrations.",
  keywords: [
    "Formify",
    "form builder",
    "AI form builder",
    "drag and drop forms",
    "online forms",
    "form analytics",
    "form templates",
    "survey builder",
  ],
  openGraph: {
    title: "Formify – AI-Powered Form Builder",
    description:
      "Create customizable, smart, and professional forms in minutes with Formify. Powered by AI, designed for developers, freelancers, and teams.",
    url: "https://formify.sandeeprajput.in",
    siteName: "Formify",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formify – AI-Powered Form Builder",
    description:
      "Build smarter forms with AI. Drag-and-drop builder, analytics, and integrations in one dashboard.",
  },
};

export default function RootLayout({
  children,
  model,
}: Readonly<{
  children: React.ReactNode;
  model: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-dark-bg bg-light-bg text-light-fg dark:text-dark-fg `}
      >
        <NextTopLoader
          zIndex={99999999999999}
          color="#3b82f6"
          showSpinner={false}
        />
        <Providers>
          <div id="main-container" className="relative">
            {children}
            {model}
          </div>
        </Providers>
      </body>
    </html>
  );
}
