import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./dashboard.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRM Dashboard",
  description: "CRM Dashboard",
};

export default function DashboardLayout({
  children,
  }: {
    children: React.ReactNode
  }) {
  return <section>{children}</section>
}
