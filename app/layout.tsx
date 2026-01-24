import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aria Solace Photography",
  description: "Fine art photography for editorials, brands, and intimate celebrations."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
