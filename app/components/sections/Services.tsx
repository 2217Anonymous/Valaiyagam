"use client";

import { motion } from "framer-motion";
import { Zap, CheckCircle2 } from "lucide-react";
import {
  marketingServices,
  technologyServices,
  renderServiceIcon,
  type ServiceItem,
} from "@/app/data/services";

function ServiceCard({
  service,
  idx,
}: {
  service: ServiceItem;
  idx: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: idx * 0.05, duration: 0.5 }}
      className="group relative p-8 rounded-3xl bg-secondary/20 border border-white/5 overflow-hidden flex flex-col gap-6 items-start w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
    >
      <div
        className={`absolute top-0 right-0 w-64 h-64 bg-linear-to-br ${service.color} opacity-5 blur-3xl rounded-full pointer-events-none transition-opacity duration-300 group-hover:opacity-10`}
      />

      <div
        className={`shrink-0 w-16 h-16 rounded-2xl bg-linear-to-br ${service.color} flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
      >
        {renderServiceIcon(service.icon)}
      </div>

      <div className="relative z-10 flex flex-col gap-3 flex-1">
        <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-sm">
          {service.description}
        </p>

        {service.includes.length > 0 && (
          <ul className="flex flex-col gap-1.5 pt-1">
            {service.includes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-xs text-muted-foreground"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="max-w-[95%] mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-5 max-w-[95%] mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <Zap className="w-3 h-3 fill-primary" /> Expertise
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            Our <span className="text-primary italic">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Our services are designed to help businesses achieve their goals and
            stay ahead of the curve. From enterprise technology to full-scale
            digital marketing, we deliver high-quality results using the latest
            strategies and best practices to help you transform your business and
            reach new heights.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {technologyServices.map((service, idx) => (
            <ServiceCard key={service.id} service={service} idx={idx} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20 mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            <Zap className="w-3 h-3 fill-primary" /> Digital Marketing
          </div>
          <h3 className="text-3xl md:text-4xl font-bold">
            Grow Your <span className="text-gradient">Digital Presence</span>
          </h3>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Data-driven campaigns across search, social, content, and paid media
            to maximize reach, engagement, and ROI.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {marketingServices.map((service, idx) => (
            <ServiceCard
              key={service.id}
              service={service}
              idx={technologyServices.length + idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
