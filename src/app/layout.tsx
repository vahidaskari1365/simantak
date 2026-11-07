import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "سیمان تک | میکروسمنت، پوشش دکوراتیو و بتن اکسپوز",
    template: "%s | سیمان تک",
  },
  description: site.description,
  keywords: [
    "میکروسمنت",
    "پوشش دکوراتیو",
    "بتن اکسپوز",
    "سیمان تک",
    "اجرای میکروسمنت",
    "پوشش سیمانی نما",
    "پلاستر ونیزی",
  ],
  authors: [{ name: site.legalName }],
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: site.brandFa,
    title: "سیمان تک | میکروسمنت، پوشش دکوراتیو و بتن اکسپوز",
    description: site.description,
    images: [
      { url: "/images/hero.jpg", alt: "فضای داخلی با پوشش میکروسمنت سیمان تک" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "سیمان تک | پوشش‌های میکروسمنت و دکوراتیو",
    description: site.description,
    images: ["/images/hero.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  alternateName: site.brandEn,
  url: site.url,
  logo: `${site.url}/images/samples.jpg`,
  description: site.description,
  telephone: site.phoneHref,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address,
    addressLocality: "تهران",
    addressCountry: "IR",
  },
  sameAs: site.socials.map((social) => social.href),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#1a1a18" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-paper text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          پرش به محتوای اصلی
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
