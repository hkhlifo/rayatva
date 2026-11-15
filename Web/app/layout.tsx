import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import AppProvider from "../AppProvider";
import Header from "../Header";
import Footer from "../Footer";
import { AuthModal, BookingModal } from "../Modals";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const tight = Inter_Tight({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-tight" });

export const metadata: Metadata = {
  metadataBase: new URL("https://rayatva.in"),
  title: {
    default: "Rayatva | Courses, Yoga & Growth Studio",
    template: "%s | Rayatva",
  },
  description:
    "Certified courses, live yoga classes, brand strategy and custom websites for ambitious businesses.",
  applicationName: "Rayatva",
  keywords: [
    "Rayatva",
    "courses",
    "live yoga",
    "brand strategy",
    "website design",
    "digital marketing",
    "business growth",
  ],
  openGraph: {
    title: "Rayatva | Courses, Yoga & Growth Studio",
    description:
      "Learn practical skills, move through live yoga sessions, and build a stronger brand with Rayatva.",
    url: "https://rayatva.in",
    siteName: "Rayatva",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rayatva | Courses, Yoga & Growth Studio",
    description:
      "Learn practical skills, move through live yoga sessions, and build a stronger brand with Rayatva.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0812",
  width: "device-width",
  initialScale: 1,
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
