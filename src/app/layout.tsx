import type { Metadata } from "next";
import { Inter, Orbitron, Bangers } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const bangers = Bangers({ subsets: ["latin"], weight: "400", variable: "--font-bangers" });

export const metadata: Metadata = {
  title: "4ターンの死闘 - レスバ・バトル",
  description: "全人類を熱狂させる、究極のネットレスバ・シミュレーター",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${orbitron.variable} ${bangers.variable} font-sans`}>{children}</body>
    </html>
  );
}
