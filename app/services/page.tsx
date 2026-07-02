import type { Metadata } from "next";
import { CheckCircle2, Zap } from "lucide-react";
import { BRAND_NAME } from "@/app/lib/themes";
import { createPageMetadata } from "@/app/lib/seo";
import { Breadcrumbs } from "@/app/components/seo/Breadcrumbs";
import {
  marketingServices,
  technologyServices,
  type ServiceItem,
} from "@/app/data/services";

export const metadata: Metadata = createPageMetadata({
  title: "Digital Marketing & Technology Services",
  description:
    "Full-service technology and digital marketing solutions including Social Media Marketing, SEO, SEM, Content Marketing, Email Marketing, Influencer Marketing, and Online Advertising.",
  path: "/services",
  keywords: [
    "Social Media Marketing",
    "SEO Services",
    "SEM Services",
    "Content Marketing",
    "Email Marketing",
    "Influencer Marketing",
    "Affiliate Marketing",
    "Online Advertising",
    "Digital Marketing Agency",
  ],
});

function ServicePageCard({ service }: { service: ServiceItem }) {
  const Icon = service.icon;

  return (
    <div className="group glass-card p-8 rounded-2xl border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:bg-white/5">
      <div
        className={`w-14 h-14 rounded-2xl bg-linear-to-br ${service.color} flex items-center justify-center text-white shadow-lg mb-6 transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
        {service.title}
      </h3>
      <p className="text-slate-400 leading-relaxed text-sm mb-4">
        {service.description}
      </p>
      {service.includes.length > 0 && (
        <ul className="space-y-2">
          {service.includes.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-slate-400"
            >
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services" },
          ]}
        />
        <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
          <Zap className="w-3 h-3 fill-primary" /> Our Expertise
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4 sm:mb-6">
          Technology & Digital Marketing Services
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto">
          {BRAND_NAME} delivers enterprise-grade technology solutions and
          data-driven digital marketing campaigns that drive growth, visibility,
          and measurable ROI.
        </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Technology Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologyServices.map((service) => (
            <ServicePageCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Digital Marketing Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {marketingServices.map((service) => (
            <ServicePageCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
