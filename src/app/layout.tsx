import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AlexCloud - Premium Cloud Gaming",
  description: "Main game spek dewa di hp & laptop kentang otomatis QRIS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
