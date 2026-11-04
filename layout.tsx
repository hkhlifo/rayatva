import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/AppProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthModal, BookingModal } from "@/components/Modals";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const tight = Inter_Tight({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-tight" });

export const metadata: Metadata = {
  title: "YourBrand – Courses, Live Yoga & Business Growth",
  description: "Certified courses, live yoga classes, brand marketing and websites for businesses.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${tight.variable}`}>
        <AppProvider>
          <Header />
          {children}
          <Footer />
          <AuthModal />
          <BookingModal />
        </AppProvider>
      </body>
    </html>
  );
}
