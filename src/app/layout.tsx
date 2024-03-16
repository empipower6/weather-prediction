import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./scss/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Future Weather",
  description: "An App to Define how the weather will look like in 20 Years from now",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
