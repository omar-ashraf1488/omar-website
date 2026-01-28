"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Mail, Zap, Users, Code, Sparkles } from "lucide-react";

const values = [
  {
    icon: Zap,
    title: "Performance",
    description: "Optimized systems for high throughput and low latency",
  },
  {
    icon: Users,
    title: "Scalability",
    description: "Infrastructure that grows with your needs",
  },
  {
    icon: Code,
    title: "Clean Code",
    description: "Maintainable and well-documented solutions",
  },
  {
    icon: Sparkles,
    title: "Automation",
    description: "CI/CD pipelines and infrastructure as code",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 px-4 bg-[var(--secondary)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            About Me
          </h2>
          <div className="w-16 h-1 bg-[var(--primary)] mb-8"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-[var(--muted)] mb-6 leading-relaxed">
              Hello! I&apos;m Omar, a Software Engineer with a focus on Backend
              development, Data Engineering, and DevOps. I enjoy building robust
              systems that handle data at scale and automate complex workflows.
            </p>
            <p className="text-[var(--muted)] mb-8 leading-relaxed">
              With experience in designing APIs, building data pipelines, and
              managing cloud infrastructure, I help teams ship reliable software
              faster through automation and best practices.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="text-[var(--primary)]" size={20} />
                <span className="text-[var(--foreground)]">Your Location</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-[var(--primary)]" size={20} />
                <span className="text-[var(--foreground)]">your.email@example.com</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Values */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="bg-white p-4 rounded-lg shadow-sm border border-[var(--border)]"
              >
                <value.icon className="text-[var(--primary)] mb-2" size={24} />
                <h3 className="font-semibold text-[var(--foreground)] mb-1">
                  {value.title}
                </h3>
                <p className="text-sm text-[var(--muted)]">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
