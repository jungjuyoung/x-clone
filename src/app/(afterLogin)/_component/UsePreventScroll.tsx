"use client";
import { useEffect } from "react";
import { preventScroll, allowScroll } from "@/app/service/scroll";

export default function UsePreventScroll() {
  useEffect(() => {
    preventScroll();
    return () => {
      document.documentElement.style.scrollBehavior = "smooth";
      allowScroll();
    };
  }, []);

  return null;
}
