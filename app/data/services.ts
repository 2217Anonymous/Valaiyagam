import type { LucideIcon } from "lucide-react";
import {
  Code,
  Smartphone,
  Cpu,
  Globe,
  Shield,
  CheckCircle2,
  Cloud,
  Share2,
  Search,
  Target,
  FileText,
  Mail,
  Users,
  Link2,
  Megaphone,
} from "lucide-react";
import { createElement } from "react";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  includes: string[];
  color: string;
  icon: LucideIcon;
  category: "technology" | "marketing";
}

const themeColors = {
  a: "from-[var(--primary-color)] to-[var(--secondary-color)]",
  b: "from-[var(--secondary-color)] to-[var(--accent-color)]",
  c: "from-[var(--primary-color)] to-[var(--accent-color)]",
  d: "from-[var(--accent-color)] to-[var(--deep-color)]",
} as const;

export const technologyServices: ServiceItem[] = [
  {
    id: "web",
    icon: Code,
    title: "Web Application",
    description:
      "We offers end-to-end web application development services by building high-performance, intuitive, secure, and best-in-class tailored web applications, platforms, and products",
    includes: [],
    color: "from-blue-500 to-cyan-500",
    category: "technology",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile Application",
    description:
      "We design and build tailor-made mobile apps for iOS and Android platforms. Our mobile app developers have the expertise to create highly functional, customized mobile applications",
    includes: [],
    color: "from-purple-500 to-pink-500",
    category: "technology",
  },
  {
    id: "iot",
    icon: Cpu,
    title: "Internet of Things",
    description:
      "By connecting spaces, products, industrial manufacturing and modern mobility, our engineers provide IoT platforms to help you re-invent your operations",
    includes: [],
    color: "from-amber-500 to-orange-500",
    category: "technology",
  },
  {
    id: "strategy",
    icon: Globe,
    title: "Digital Strategy",
    description:
      "We help clients set strategies in motion that unify business and technology architectures, generate growth and enable competitive advantage",
    includes: [],
    color: themeColors.a,
    category: "technology",
  },
  {
    id: "security",
    icon: Shield,
    title: "Security",
    description:
      "Outdated security solutions. Sophisticated cyberthreats. Eliminate security blind spots and accelerate innovation, transformation and growth",
    includes: [],
    color: "from-red-500 to-rose-500",
    category: "technology",
  },
  {
    id: "qa",
    icon: CheckCircle2,
    title: "Assurance & QE",
    description:
      "QA is essential to implement an in-built quality assurance process to accelerate time-to-market and deliver superior customer experience",
    includes: [],
    color: "from-indigo-500 to-violet-500",
    category: "technology",
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud",
    description:
      "Serverless and Kubernetes-first cloud deployments optimized for maximum uptime and cost efficiency.",
    includes: [],
    color: "from-sky-500 to-blue-500",
    category: "technology",
  },
];

export const marketingServices: ServiceItem[] = [
  {
    id: "smm",
    icon: Share2,
    title: "Social Media Marketing (SMM)",
    description:
      "Promote brands across social media platforms to increase engagement, reach, and customer acquisition.",
    includes: [
      "Instagram Marketing",
      "Facebook Marketing",
      "LinkedIn Marketing",
      "YouTube Marketing",
      "Reels & Short Videos",
      "Social Media Advertisements",
    ],
    color: themeColors.a,
    category: "marketing",
  },
  {
    id: "seo",
    icon: Search,
    title: "Search Engine Optimization (SEO)",
    description:
      "Improve website visibility and organic rankings on Google and other search engines.",
    includes: [
      "Technical SEO",
      "On-Page SEO",
      "Off-Page SEO",
      "Keyword Research",
      "Local SEO",
      "Performance Optimization",
    ],
    color: themeColors.b,
    category: "marketing",
  },
  {
    id: "sem",
    icon: Target,
    title: "Search Engine Marketing (SEM)",
    description:
      "Generate instant traffic and leads through paid search advertising campaigns.",
    includes: [
      "Google Ads",
      "PPC Campaigns",
      "Search Advertising",
      "Display Advertising",
      "Conversion Tracking",
      "Landing Page Optimization",
    ],
    color: themeColors.c,
    category: "marketing",
  },
  {
    id: "content",
    icon: FileText,
    title: "Content Marketing",
    description:
      "Create valuable content that attracts, educates, and converts potential customers.",
    includes: [
      "Blog Writing",
      "Website Content",
      "Video Content",
      "Social Media Content",
      "Brand Storytelling",
      "Content Strategy",
    ],
    color: themeColors.d,
    category: "marketing",
  },
  {
    id: "email",
    icon: Mail,
    title: "Email Marketing",
    description:
      "Engage customers and increase conversions through personalized email campaigns.",
    includes: [
      "Newsletter Campaigns",
      "Promotional Emails",
      "Customer Retention",
      "Automation Workflows",
      "Lead Nurturing",
      "Email Analytics",
    ],
    color: themeColors.a,
    category: "marketing",
  },
  {
    id: "influencer",
    icon: Users,
    title: "Influencer Marketing",
    description:
      "Collaborate with influencers and creators to increase brand awareness and trust.",
    includes: [
      "Influencer Outreach",
      "Campaign Management",
      "Product Promotions",
      "Creator Partnerships",
      "Brand Collaborations",
      "Social Campaign Tracking",
    ],
    color: themeColors.b,
    category: "marketing",
  },
  {
    id: "affiliate",
    icon: Link2,
    title: "Affiliate Marketing",
    description:
      "Expand sales channels through strategic affiliate partnerships and commission-based promotions.",
    includes: [
      "Affiliate Program Setup",
      "Partner Management",
      "Commission Tracking",
      "Referral Systems",
      "Performance Analytics",
      "Growth Optimization",
    ],
    color: themeColors.c,
    category: "marketing",
  },
  {
    id: "advertising",
    icon: Megaphone,
    title: "Online Advertising",
    description:
      "Launch targeted advertising campaigns across digital platforms to maximize ROI.",
    includes: [
      "Facebook Ads",
      "Instagram Ads",
      "Google Display Ads",
      "YouTube Ads",
      "Remarketing Campaigns",
      "Performance Tracking",
    ],
    color: themeColors.d,
    category: "marketing",
  },
];

export const allServices: ServiceItem[] = [
  ...technologyServices,
  ...marketingServices,
];

export function renderServiceIcon(Icon: LucideIcon, className = "w-10 h-10") {
  return createElement(Icon, { className });
}
