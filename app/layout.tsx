import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXT-X",
  description: "X Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body className="bg-neutral-900 *:text-neutral-200">{children}</body>
    </html>
  );
}
