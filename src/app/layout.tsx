import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Undangan Digital - Elegance in Simplicity",
  description: "Dibuat dengan kasih sayang",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${lexend.className} bg-black antialiased`}>
        {children}
      </body>
    </html>
  );
}