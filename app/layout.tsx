import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  const protocol = headerList.get("x-forwarded-proto") ?? "https";
  const metadataBase = new URL(host ? `${protocol}://${host}` : "https://chatapp.site");
  const title = "ChatApp | Güvenli Sohbet Uygulaması";
  const description =
    "ChatApp, herkes için premium ve modern bir güvenli sohbet deneyimi sunar.";

  return {
    metadataBase,
    title,
    description,
    openGraph: {
      title,
      description:
        "Güvenli sohbet etmek, bekleme listesine katılmak ve demo talebi oluşturmak için ChatApp'i keşfet.",
      images: [new URL("/og.png", metadataBase).toString()],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description:
        "Premium, modern ve teknoloji odaklı güvenli sohbet deneyimi.",
      images: [new URL("/og.png", metadataBase).toString()],
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
