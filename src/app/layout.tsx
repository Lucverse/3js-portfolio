import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import rawData from "../data";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-base",
});

const siteMeta = rawData.siteMetadata;

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
  alternates: {
    canonical: `${siteMeta.siteUrl}/`,
  },
  icons: {
    icon: siteMeta.favicon,
  },
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.ogDescription,
    url: siteMeta.siteUrl,
    siteName: siteMeta.siteName,
    images: [
      {
        url: siteMeta.ogImage,
        width: 732,
        height: 732,
        alt: `${rawData.name} Portfolio Preview`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.ogDescription,
    images: [siteMeta.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: siteMeta.themeColor,
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: rawData.name,
  url: siteMeta.siteUrl,
  jobTitle: rawData.title.join(" & "),
  description: siteMeta.description,
  sameAs: rawData.socialLinks
    .map((s) => s.url)
    .filter((url) => !url.startsWith("mailto:")),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <noscript>You need to enable JavaScript to run this app.</noscript>
        {children}
      </body>
    </html>
  );
}

