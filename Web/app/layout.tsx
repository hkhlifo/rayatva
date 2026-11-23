import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "RAYATVA - Multi-Dimensional Growth Company",
  description: "RAYATVA is a multi-dimensional growth company. We transform business ideas into powerful brands, empower individuals through entrepreneurship and skill-based education, and inspire growth through success-oriented learning. We also focus on health, wellness and lifestyle education, creating new skills, opportunities and pathways to success.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
