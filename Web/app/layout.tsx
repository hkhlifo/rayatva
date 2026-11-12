import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import AppProvider from "../AppProvider";
import Header from "../Header";
import Footer from "../Footer";
import { AuthModal, BookingModal } from "../Modals";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const tight = Inter_Tight({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-tight" });

export const metadata: Metadata = {
  title: "Rayatva | Courses, Yoga & Growth Studio",
  description:
    "Certified courses, live yoga classes, brand strategy and custom websites for ambitious businesses.",
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
