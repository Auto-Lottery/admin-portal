import type { Metadata } from "next";
import ProtectedLayout from "@/components/layout";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Protected routes",
};

export default function ProtectedRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProtectedLayout>{children}</ProtectedLayout>
    </>
  );
}
