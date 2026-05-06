import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blorix Admin",
  description: "Secure Admin Dashboard for Blorix",
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-gray-50 flex flex-col">
        {/* The inner route layouts (e.g. dashboard/layout.tsx) will handle their own UI headers/sidebars.
            This root layout purely provides the clean HTML structure for the admin zone. */}
        {children}
      </body>
    </html>
  );
}
