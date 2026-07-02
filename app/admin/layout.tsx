import type { Metadata } from "next";
import { adminMetadata } from "@/app/lib/seo";

export const metadata: Metadata = adminMetadata;

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
