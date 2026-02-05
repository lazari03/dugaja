import "locomotive-scroll/dist/locomotive-scroll.css";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dugaja e Fotografisë",
  description: "Analog photography studio in the heart of Shkodër."
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
