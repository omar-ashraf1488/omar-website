"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Calendar } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";

export default function Hero() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#2563eb" } },
      });
    })();
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 px-4"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-2 bg-[var(--secondary)] text-[var(--primary)] rounded-full text-sm font-medium mb-6">
            Backend | Data | DevOps
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--foreground)] mb-6"
        >
          I build scalable systems
          <br />
          and data pipelines where
          <br />
          <span className="text-[var(--primary)]">reliability meets performance</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-[var(--muted)] mb-8 max-w-2xl mx-auto"
        >
          A Software Engineer focused on Backend development, Data Engineering,
          and DevOps. Building robust, scalable infrastructure and data solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            data-cal-link="omar-ashraf-omar-xyzwoj/30min"
            data-cal-config='{"layout":"month_view"}'
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors duration-200 font-medium"
          >
            <Calendar size={20} />
            Book a Call
          </button>
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[var(--border)] text-[var(--foreground)] rounded-lg hover:bg-[var(--secondary)] transition-colors duration-200 font-medium"
          >
            View My Work
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16"
        >
          <a
            href="#about"
            className="inline-flex flex-col items-center text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-200"
          >
            <span className="text-sm mb-2">Scroll down</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown size={20} />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
