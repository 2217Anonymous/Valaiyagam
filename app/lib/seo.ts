import type { Metadata } from "next";
import {
  BRAND_NAME,
  BRAND_SHORT,
  BRAND_TAGLINE,
  LOGO_FULL,
  LOGO_ICON,
} from "./themes";

const DEFAULT_SITE_URL = "https://www.valaiyagam.com";
const DEFAULT_BASE_PATH = "";

/** Production site origin including optional GitHub Pages base path */
export function getSiteUrl(): string {
  const origin = (
    process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
  ).replace(/\/$/, "");
  const basePath = (
    process.env.NEXT_PUBLIC_BASE_PATH ?? DEFAULT_BASE_PATH
  ).replace(/\/$/, "");
  return `${origin}${basePath}`;
}

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const site = getSiteUrl();

  if (/\.[a-z0-9]+$/i.test(normalized)) {
    return `${site}${normalized}`;
  }

  // trailingSlash: true — canonical URLs use trailing slash, no .html extension
  const withSlash =
    normalized === "/"
      ? "/"
      : normalized.endsWith("/")
        ? normalized
        : `${normalized}/`;
  return `${site}${withSlash}`;
}

export const SITE_CONFIG = {
  name: BRAND_NAME,
  shortName: BRAND_SHORT,
  tagline: BRAND_TAGLINE,
  description:
    "Valaiyagam Solution delivers enterprise software, cloud engineering, and full-stack digital marketing services including SEO, SEM, social media, and content marketing.",
  locale: "en_IN",
  language: "en",
  email: "hello@valaiyagam.com",
  phone: "+91-7530008253",
  address: {
    streetAddress: "Coimbatore",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    postalCode: "641000",
    addressCountry: "IN",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/valaiyagam",
    twitter: "https://twitter.com/valaiyagam",
    facebook: "https://www.facebook.com/valaiyagam",
    instagram: "https://www.instagram.com/valaiyagam",
  },
  defaultKeywords: [
    "Valaiyagam Solution",
    "software development",
    "digital marketing agency",
    "SEO services",
    "web development",
    "mobile app development",
    "cloud solutions",
    "Coimbatore IT company",
  ],
} as const;

export const OG_IMAGE = LOGO_FULL;
export const FAVICON = LOGO_ICON;

export type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
  ogImage?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  noIndex = false,
  ogImage = OG_IMAGE,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = ogImage.startsWith("http") ? ogImage : absoluteUrl(ogImage);

  return {
    title,
    description,
    keywords: [...SITE_CONFIG.defaultKeywords, ...keywords],
    authors: [{ name: BRAND_NAME, url: getSiteUrl() }],
    creator: BRAND_NAME,
    publisher: BRAND_NAME,
    applicationName: BRAND_NAME,
    category: "technology",
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : {
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
      locale: SITE_CONFIG.locale,
      url,
      siteName: BRAND_NAME,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${BRAND_NAME} — ${BRAND_TAGLINE}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${BRAND_NAME} | Software & Digital Marketing`,
    template: `%s | ${BRAND_NAME}`,
  },
  description: SITE_CONFIG.description,
  keywords: [...SITE_CONFIG.defaultKeywords],
  authors: [{ name: BRAND_NAME }],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
  applicationName: BRAND_NAME,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: FAVICON, type: "image/png" }],
    apple: [{ url: FAVICON, type: "image/png" }],
    shortcut: [FAVICON],
  },
  manifest: absoluteUrl("/manifest.webmanifest"),
  alternates: {
    canonical: absoluteUrl("/"),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: absoluteUrl("/"),
    siteName: BRAND_NAME,
    title: BRAND_NAME,
    description: SITE_CONFIG.description,
    images: [
      {
        url: absoluteUrl(OG_IMAGE),
        width: 1200,
        height: 630,
        alt: BRAND_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND_NAME,
    description: SITE_CONFIG.description,
    images: [absoluteUrl(OG_IMAGE)],
  },
  other: {
    "google-site-verification":
      process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",
  },
};

export const adminMetadata: Metadata = {
  robots: { index: false, follow: false, nocache: true, noarchive: true },
  title: "Admin",
};

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.shortName,
    url: getSiteUrl(),
    logo: absoluteUrl(LOGO_FULL),
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    address: {
      "@type": "PostalAddress",
      ...SITE_CONFIG.address,
    },
    sameAs: Object.values(SITE_CONFIG.social),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: getSiteUrl(),
    description: SITE_CONFIG.description,
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl("/services")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_CONFIG.name,
    image: absoluteUrl(LOGO_FULL),
    url: getSiteUrl(),
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      ...SITE_CONFIG.address,
    },
    areaServed: ["IN", "Coimbatore", "Chennai", "Bangalore"],
    priceRange: "$$",
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function jobPostingJsonLd(job: {
  title: string;
  description: string;
  code: string;
  location: string;
  type: string;
  department: string;
  postedDate?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    identifier: {
      "@type": "PropertyValue",
      name: SITE_CONFIG.name,
      value: job.code,
    },
    datePosted: job.postedDate || new Date().toISOString(),
    employmentType: job.type.toUpperCase().includes("FULL")
      ? "FULL_TIME"
      : "OTHER",
    hiringOrganization: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      sameAs: getSiteUrl(),
      logo: absoluteUrl(LOGO_FULL),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "IN",
      },
    },
    applicantLocationRequirements: {
      "@type": "Country",
      name: "IN",
    },
    industry: job.department,
    url: absoluteUrl(`/careers/${job.code}`),
  };
}

export const PUBLIC_ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/teams", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/careers", priority: 0.8, changeFrequency: "weekly" as const },
];
