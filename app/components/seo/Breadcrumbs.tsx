import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/app/lib/seo";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const schemaItems = items.map((item, index) => ({
    name: item.label,
    path:
      item.href ||
      (index === items.length - 1 ? items[index]?.href || "/" : "/"),
  }));

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <JsonLd
        data={breadcrumbJsonLd(
          schemaItems.map((item) => ({
            name: item.name,
            path: item.path.replace(/^\//, "") || "/",
          })),
        )}
      />
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
              )}
              {isLast || !item.href ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
