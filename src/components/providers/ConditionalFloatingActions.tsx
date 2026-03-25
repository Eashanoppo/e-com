"use client";
import { usePathname } from "next/navigation";
import FloatingActions from "@/components/landing/FloatingActions";

export default function ConditionalFloatingActions() {
  const pathname = usePathname();
  const isAdminPath = pathname.startsWith("/admin");

  if (isAdminPath) return null;

  return <FloatingActions />;
}
