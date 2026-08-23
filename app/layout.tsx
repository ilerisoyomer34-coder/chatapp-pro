import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = "https://chatapp-secure.ysfysfysf.chatgpt.site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "ChatApp | Güvenli Sohbet ve ChatApp Pro";
const description =
  "ChatApp ile modern ve güvenli sohbeti keşfet. Ücretsiz başlangıç, yakında sunulacak ChatApp Pro üyeliği, bekleme listesi ve demo seçenekleri.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "ChatApp",
    "güvenli sohbet",
    "mesajlaşma uygulaması",
    "ChatApp Pro",
    "özel sohbet",
  ],
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "ChatApp",
    title,
    description,
    images: [`${siteUrl}/og-pro.png`],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "ChatApp Pro ile daha fazla kontrol ve daha güçlü gizlilik.",
    images: [`${siteUrl}/og-pro.png`],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ChatApp",
  url: siteUrl,
  applicationCategory: "CommunicationApplication",
  operatingSystem: "Web",
  description,
  offers: {
    "@type": "Offer",
    price: "3.00",
    priceCurrency: "EUR",
    availability: "https://schema.org/PreOrder",
  },
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
