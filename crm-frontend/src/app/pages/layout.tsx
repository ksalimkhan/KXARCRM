import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import "./dashboard/pageStyle.css";

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

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="min-h-screen flex-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}