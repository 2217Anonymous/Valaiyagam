"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Facebook, Instagram, Twitter, X } from "lucide-react";
import { Button } from "./Button";
import { Logo } from "./Logo";

export function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        if (id.startsWith("#")) {
            e.preventDefault();
            const sectionId = id.replace("#", "");
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                setIsMobileMenuOpen(false);
                setActiveSection(sectionId);
            }
        }
    };

    const navLinks = [
        { name: "home", to: "#home" },
        { name: "about", to: "#about" },
        { name: "services", to: "#services" },
        { name: "work", to: "#work" },
        { name: "careers", to: "#careers" },
        { name: "contact", to: "#contact" },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-2xl shadow-black/10 py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="w-full px-6 md:px-12 flex items-center justify-between">

                <Link
                    href="#home"
                    onClick={(e) => scrollToSection(e, "home")}
                    className="flex items-center relative z-50 shrink-0"
                >
                    <span className="hidden lg:block">
                        <Logo
                            variant="full"
                            className={isScrolled ? "max-h-14" : "max-h-16"}
                        />
                    </span>
                    <span className="lg:hidden">
                        <Logo
                            showWordmark
                            wordmarkClassName={isScrolled ? "text-base" : "text-lg"}
                        />
                    </span>
                </Link>

                <div className="hidden lg:flex items-center gap-10">
                    <div className="flex items-center gap-8">
                        {navLinks.map((item) => {
                            const sectionId = item.to.replace("#", "");
                            const isActive = activeSection === sectionId;
                            return (
                                <a
                                    key={item.name}
                                    href={item.to}
                                    onClick={(e) => scrollToSection(e, item.to)}
                                    className={`text-sm font-semibold capitalize transition-colors relative ${
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

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-4">
                        <Facebook className="w-5 h-5 cursor-pointer text-slate-800 hover:text-primary transition-colors" />
                        <Twitter className="w-5 h-5 cursor-pointer text-slate-800 hover:text-primary transition-colors" />
                        <Instagram className="w-5 h-5 cursor-pointer text-slate-800 hover:text-primary transition-colors" />
                    </div>

                    <button
                        suppressHydrationWarning
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors lg:hidden"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6 text-slate-900" />
                        ) : (
                            <Menu className="w-6 h-6 text-slate-900" />
                        )}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl py-6 flex flex-col items-center gap-4 lg:hidden animate-in slide-in-from-top-2">
                    {navLinks.map((item) => (
                        <a
                            key={item.name}
                            href={item.to}
                            onClick={(e) => scrollToSection(e, item.to)}
                            className="text-lg font-semibold text-slate-700 hover:text-primary capitalize py-2"
                        >
                            {item.name}
                        </a>
                    ))}
                    <a href="#contact" onClick={(e) => scrollToSection(e, "contact")}>
                        <Button
                            className="rounded-full nav-contact-btn border-0 px-10 h-12 font-bold mt-2"
                        >
                            contact
                        </Button>
                    </a>
                </div>
            )}
        </header>
    );
}
