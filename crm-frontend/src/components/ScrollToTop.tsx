"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
// This component scrolls to the top of the page on route change
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
