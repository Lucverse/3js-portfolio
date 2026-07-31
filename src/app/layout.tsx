import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { getPortfolioData } from "@/lib/getPortfolioData";
import StarsCanvasClient from "@/components/Canvas/StarsCanvasClient";
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-base",
});

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();
  const siteMeta = data.siteMetadata;

  return {
    metadataBase: new URL(siteMeta.siteUrl),
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
          width: 1200,
          height: 630,
          alt: `${data.name} Portfolio Preview`,
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
}

export async function generateViewport(): Promise<Viewport> {
  const data = await getPortfolioData();
  const siteMeta = data.siteMetadata;

  return {
    themeColor: siteMeta.themeColor,
    width: "device-width",
    initialScale: 1,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getPortfolioData();
  const siteMeta = data.siteMetadata;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    url: siteMeta.siteUrl,
    jobTitle: data.title.join(" & "),
    description: siteMeta.description,
    sameAs: data.socialLinks
      .map((s) => s.url)
      .filter((url) => !url.startsWith("mailto:")),
  };

  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-bg-dark text-secondary">
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <CustomCursor />
        <div className="fixed top-0 left-0 w-full h-dvh -z-1">
          <StarsCanvasClient />
        </div>
        {children}
      </body>
    </html>
  );
}
