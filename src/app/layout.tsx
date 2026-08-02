import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from '../lib/Providers';
import AgeGate from "@/components/UI/AgeGate";

const corvinusSkyline = localFont({
  src: "./fonts/OPTICorvinus-Skyline.otf",
  variable: "--font-corvinus-skyline",
  weight: "400", // .otf static font, তাই single weight
  style: "normal",
});

export const metadata: Metadata = {
  title: 'Business May Way',
  description: 'Shop a wide selection of cigarette brands online. Fast delivery, competitive prices, and secure age-verified checkout for adult smokers 18+.'
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${corvinusSkyline.variable} antialiased`}
         suppressHydrationWarning
      >
        <Providers>
          <AgeGate>
          {children}
          </AgeGate>
          </Providers>
      </body>
    </html>
  );
}
