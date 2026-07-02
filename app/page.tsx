import { Hero } from "./components/sections/Hero";
import { Services } from "./components/sections/Services";
import { Teams } from "./components/sections/Teams";
import { Careers } from "./components/sections/Careers";
import { Gallery } from "./components/sections/Gallery";
import { Contact } from "./components/sections/Contact";
import { About } from "./components/sections/About";
import { TerminalSection } from "./components/sections/TerminalSection";
import { Marquee } from "./components/ui/Marquee";
import { AnimatedCursor } from "./components/ui/AnimatedCursor";
import { StackingSection } from "./components/ui/StackingSection";
import { Cpu, Database, Cloud, Code, Smartphone, Shield, Facebook, Twitter as XIcon, Linkedin, Instagram, Mail, MapPin, ArrowRight } from "lucide-react";

import { BRAND_NAME } from "./lib/themes";
import { Logo } from "./components/ui/Logo";
import { FooterIllustration } from "./components/ui/FooterIllustration";

export default function Home() {

  const sections = [
    {
      component: <About />,
      title: "IDENTITY",
      id: "about"
    },
    {
      component: <TerminalSection />,
      title: "THE NEXT GEN",
      id: "tech"
    },
    {
      component: <Services />,
      title: "SOLUTIONS",
      id: "services"
    },
    {
      component: <Gallery />,
      title: "PORTFOLIO",
      id: "gallery"
    },
    {
      component: <Careers />,
      title: "RECRUITMENT",
      id: "careers"
    },
    {
      component: <Contact />,
      title: "INTERFACE",
      id: "contact"
    },
  ];

  return (
    <div className="flex flex-col relative w-full overflow-x-hidden">
      <AnimatedCursor />
      <div className="relative z-10 bg-background mb-[720px] sm:mb-[680px] md:mb-[550px] overflow-x-hidden">
        <Hero id="home" />

        {sections.map((section, index) => (
          <StackingSection
            key={index}
            id={section.id}
            index={index}
            total={sections.length}
            title={section.title}
            allowOverflow={section.id === "about"}
          >
            {section.component}
          </StackingSection>
        ))}
        {/* Sentinel for Footer Animation Trigger */}
        <div id="footer-reveal-trigger" className="w-full h-1 pointer-events-none" />
      </div>

      <footer className="fixed bottom-0 left-0 right-0 z-0 min-h-[720px] sm:min-h-[680px] md:min-h-[550px] h-auto w-full overflow-y-auto overflow-x-hidden">
        <FooterIllustration>
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 xl:gap-20">

              {/* Brand Section */}
              <div className="lg:col-span-4 space-y-6">
                <Logo variant="full" className="max-h-24" />
                <p className="text-slate-600 font-medium leading-relaxed">
                  Pioneering digital transformation through innovative software engineering and cutting-edge cloud solutions.
                </p>

                {/* Social Icons */}
                <div className="flex gap-4 pt-2">
                  <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:-translate-y-1 shadow-sm bg-[#0A66C2] text-white">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:-translate-y-1 shadow-sm bg-black text-white">
                    <XIcon className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:-translate-y-1 shadow-sm bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:-translate-y-1 shadow-sm bg-[#1877F2] text-white">
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Company Links */}
              <div className="lg:col-span-2 space-y-6">
                <h4 className="text-lg font-bold text-slate-900">Company</h4>
                <ul className="space-y-4">
                  <li><a href="#about" className="text-slate-600 hover:text-primary transition-colors font-medium">About Us</a></li>
                  <li><a href="#services" className="text-slate-600 hover:text-primary transition-colors font-medium">Services</a></li>
                  <li><a href="#teams" className="text-slate-600 hover:text-primary transition-colors font-medium">Our Team</a></li>
                  <li><a href="#careers" className="text-slate-600 hover:text-primary transition-colors font-medium">Careers</a></li>
                </ul>
              </div>

              {/* Legal / Resources */}
              <div className="lg:col-span-2 space-y-6">
                <h4 className="text-lg font-bold text-slate-900">Resources</h4>
                <ul className="space-y-4">
                  <li><a href="#gallery" className="text-slate-600 hover:text-primary transition-colors font-medium">Portfolio</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-primary transition-colors font-medium">Privacy Policy</a></li>
                  <li><a href="#" className="text-slate-600 hover:text-primary transition-colors font-medium">Terms of Service</a></li>
                  <li><a href="#contact" className="text-slate-600 hover:text-primary transition-colors font-medium">Contact Us</a></li>
                </ul>
              </div>

              {/* Newsletter & Contact */}
              <div className="lg:col-span-4 space-y-6">
                <h4 className="text-lg font-bold text-slate-900">Stay Connected</h4>
                <p className="text-slate-600 font-medium">
                  Subscribe to our newsletter for the latest tech insights.
                </p>

                <div className="relative">
                  <input
                    suppressHydrationWarning
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-5 py-3 rounded-full bg-white/60 backdrop-blur-md border border-slate-200 focus:outline-none focus:border-primary/50 text-slate-800 placeholder:text-slate-400 shadow-sm transition-all"
                  />
                  <button suppressHydrationWarning className="absolute right-1.5 top-1.5 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition-colors shadow-md">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 text-slate-600 font-medium">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>123 Innovation Drive, Silicon Valley, CA 94025</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 font-medium">
                    <Mail className="w-5 h-5 text-primary shrink-0" />
                    <span>hello@valaiyagam.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-16 pt-8 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
              <p className="text-slate-500 font-medium text-sm">
                © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
              </p>
              <p className="text-slate-400 font-medium text-sm flex items-center gap-1">
                Designed with precision
              </p>
            </div>
          </div>
        </FooterIllustration>
      </footer>
    </div>
  );
}
