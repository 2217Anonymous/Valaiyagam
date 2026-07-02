"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, Facebook, Instagram, Twitter, X } from "lucide-react";
import { Button } from "./Button";
import { Logo } from "./Logo";

export function NavBar() {
    const headerRef = useRef<HTMLElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const header = headerRef.current;
        if (!header) return;

        const syncHeaderHeight = () => {
            document.documentElement.style.setProperty(
                "--header-height",
                `${header.offsetHeight}px`,
            );
        };

        syncHeaderHeight();
        const observer = new ResizeObserver(syncHeaderHeight);
        observer.observe(header);
        window.addEventListener("resize", syncHeaderHeight);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", syncHeaderHeight);
        };
    }, [isScrolled, isMobileMenuOpen]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsMobileMenuOpen(false);
        };
        if (isMobileMenuOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isMobileMenuOpen]);

    const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);

    const scrollToSection = (
        e: React.MouseEvent<HTMLAnchorElement>,
        id: string,
    ) => {
        e.preventDefault();
        const sectionId = id.replace(/^#/, "");
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            closeMenu();
            setActiveSection(sectionId);
        }
    };

    const navLinks = [
        { name: "home", to: "#home" },
        { name: "about", to: "#about" },
        { name: "services", to: "#services" },
        { name: "work", to: "#gallery" },
        { name: "careers", to: "#careers" },
        { name: "contact", to: "#contact" },
    ];

    const mobileMenu =
        mounted && isMobileMenuOpen
            ? createPortal(
                  <>
                      <button
                          type="button"
                          className="fixed inset-x-0 bottom-0 top-[var(--header-height,4.5rem)] z-[200] bg-black/40 backdrop-blur-sm lg:hidden"
                          aria-label="Close menu"
                          onClick={closeMenu}
                      />
                      <nav
                          className="fixed inset-x-0 bottom-0 top-[var(--header-height,4.5rem)] z-[201] bg-white lg:hidden overflow-y-auto shadow-xl"
                          aria-label="Mobile navigation"
                      >
                          <div className="flex flex-col py-4 px-4 sm:px-6">
                              {navLinks.map((item) => {
                                  const sectionId = item.to.replace("#", "");
                                  const isActive = activeSection === sectionId;
                                  return (
                                      <a
                                          key={item.name}
                                          href={item.to}
                                          onClick={(e) => scrollToSection(e, item.to)}
                                          className={`text-lg font-semibold capitalize py-4 px-2 border-b border-slate-100 transition-colors ${
                                              isActive
                                                  ? "text-primary"
                                                  : "text-slate-700 hover:text-primary"
                                          }`}
                                      >
                                          {item.name}
                                      </a>
                                  );
                              })}
                              <a
                                  href="#contact"
                                  onClick={(e) => scrollToSection(e, "contact")}
                                  className="mt-6"
                              >
                                  <Button className="rounded-full nav-contact-btn border-0 px-10 h-12 font-bold w-full">
                                      contact
                                  </Button>
                              </a>
                              <div className="flex items-center justify-center gap-6 mt-8 pt-4 border-t border-slate-100 md:hidden">
                                  <Facebook className="w-5 h-5 cursor-pointer text-slate-800 hover:text-primary transition-colors" />
                                  <Twitter className="w-5 h-5 cursor-pointer text-slate-800 hover:text-primary transition-colors" />
                                  <Instagram className="w-5 h-5 cursor-pointer text-slate-800 hover:text-primary transition-colors" />
                              </div>
                          </div>
                      </nav>
                  </>,
                  document.body,
              )
            : null;

    return (
        <>
            <header
                ref={headerRef}
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 w-full ${
                    isScrolled
                        ? "bg-white/90 backdrop-blur-md shadow-lg shadow-black/5 py-3 sm:py-4"
                        : "bg-white/80 backdrop-blur-sm lg:bg-transparent py-3 sm:py-4 lg:py-5"
                } ${isMobileMenuOpen ? "lg:bg-white/90" : ""}`}
            >
                {/* Full-width bar — logo left, nav + actions right (previous desktop layout) */}
                <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                    <div className="flex items-center justify-between gap-4">
                        <Link
                            href="#home"
                            onClick={(e) => scrollToSection(e, "#home")}
                            className="flex items-center relative z-[102] shrink-0 min-w-0"
                        >
                            <span className="hidden lg:block">
                                <Logo
                                    variant="full"
                                    className={isScrolled ? "max-h-12 xl:max-h-14" : "max-h-14 xl:max-h-16"}
                                />
                            </span>
                            <span className="lg:hidden">
                                <Logo
                                    showWordmark
                                    wordmarkClassName={
                                        isScrolled ? "text-sm sm:text-base" : "text-base sm:text-lg"
                                    }
                                />
                            </span>
                        </Link>

                        <div className="hidden lg:flex items-center gap-8 xl:gap-10">
                            <div className="flex items-center gap-6 xl:gap-8">
                                {navLinks.map((item) => {
                                    const sectionId = item.to.replace("#", "");
                                    const isActive = activeSection === sectionId;
                                    return (
                                        <a
                                            key={item.name}
                                            href={item.to}
                                            onClick={(e) => scrollToSection(e, item.to)}
                                            className={`text-sm font-semibold capitalize transition-colors relative whitespace-nowrap ${
                                                isActive
                                                    ? "text-primary nav-link-active"
                                                    : "text-slate-700 hover:text-primary"
                                            }`}
                                        >
                                            {item.name}
                                            {isActive && (
                                                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                                            )}
                                        </a>
                                    );
                                })}
                            </div>

                            <a href="#contact" onClick={(e) => scrollToSection(e, "contact")}>
                                <Button
                                    size="sm"
                                    className="rounded-full nav-contact-btn border-0 px-8 h-10 font-bold"
                                >
                                    contact
                                </Button>
                            </a>
                        </div>

                        <div className="flex items-center gap-3 sm:gap-6 relative z-[102]">
                            <div className="hidden md:flex items-center gap-4">
                                <Facebook className="w-5 h-5 cursor-pointer text-slate-800 hover:text-primary transition-colors" />
                                <Twitter className="w-5 h-5 cursor-pointer text-slate-800 hover:text-primary transition-colors" />
                                <Instagram className="w-5 h-5 cursor-pointer text-slate-800 hover:text-primary transition-colors" />
                            </div>

                            <button
                                type="button"
                                suppressHydrationWarning
                                onClick={() => setIsMobileMenuOpen((open) => !open)}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors lg:hidden"
                                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                                aria-expanded={isMobileMenuOpen}
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-6 h-6 text-slate-900" />
                                ) : (
                                    <Menu className="w-6 h-6 text-slate-900" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {mobileMenu}
        </>
    );
}
