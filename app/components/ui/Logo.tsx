import Image from "next/image";
import { cn } from "@/app/lib/utils";
import {
  BRAND_NAME,
  BRAND_SHORT,
  BRAND_TAGLINE,
  LOGO_FULL,
  LOGO_ICON,
} from "@/app/lib/themes";

interface LogoProps {
  className?: string;
  variant?: "icon" | "full" | "watermark";
  showWordmark?: boolean;
  wordmarkClassName?: string;
  taglineClassName?: string;
}

export function Logo({
  className,
  variant = "icon",
  showWordmark = false,
  wordmarkClassName,
  taglineClassName,
}: LogoProps) {
  if (variant === "watermark") {
    return (
      <Image
        src={LOGO_ICON}
        alt={BRAND_NAME}
        width={320}
        height={320}
        className={cn(
          "shrink-0 object-contain w-72 h-72 md:w-80 md:h-80 opacity-75",
          className,
        )}
        priority
      />
    );
  }

  if (variant === "full") {
    return (
      <Image
        src={LOGO_FULL}
        alt={BRAND_NAME}
        width={400}
        height={120}
        className={cn("h-auto w-auto max-h-[4.5rem] object-contain object-left", className)}
        priority
      />
    );
  }

  if (showWordmark) {
    return (
      <span className={cn("inline-flex items-center gap-3", className)}>
        <Image
          src={LOGO_ICON}
          alt={BRAND_NAME}
          width={56}
          height={56}
          className="shrink-0 h-10 w-10 md:h-12 md:w-12 object-contain"
          priority
        />
        <span className="flex flex-col leading-tight">
          <span className={cn("font-bold tracking-tight text-foreground", wordmarkClassName)}>
            {BRAND_SHORT}{" "}
            <span className="font-semibold text-primary">Solution</span>
          </span>
          <span
            className={cn(
              "text-[10px] md:text-xs font-medium tracking-widest text-muted-foreground uppercase",
              taglineClassName,
            )}
          >
            {BRAND_TAGLINE}
          </span>
        </span>
      </span>
    );
  }

  return (
    <Image
      src={LOGO_ICON}
      alt={BRAND_NAME}
      width={256}
      height={256}
      className={cn("shrink-0 object-contain h-10 w-10", className)}
      priority
    />
  );
}
