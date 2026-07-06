import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ujjawal Singh | Full Stack Developer & Tech Leader",
  description: "Explore the portfolio of Ujjawal Singh - Full Stack Developer and Tech Leader. Specializing in high-performance web systems, interactive 3D WebGL experiences, and scalable cloud solutions.",
  icons: {
    icon: "/pageicon.png",
  },
  openGraph: {
    title: "Ujjawal Singh | Full Stack Developer & Tech Leader",
    description: "Building high-performance web systems and developer tools. Explore projects, terminal configurations, and WebGL experiences.",
    url: "https://lucverse.com",
    siteName: "Lucverse Portfolio",
    images: [
      {
        url: "/meta-data-image.png",
        width: 732,
        height: 732,
        alt: "Ujjawal Singh Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ujjawal Singh | Full Stack Developer & Tech Leader",
    description: "Building high-performance web systems and developer tools. Explore projects, terminal configurations, and WebGL experiences.",
    images: ["/meta-data-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0f10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <noscript>You need to enable JavaScript to run this app.</noscript>
        {children}
      </body>
    </html>
  );
}
