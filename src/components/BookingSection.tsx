"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Cal from "@calcom/embed-react";

export default function BookingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="booking" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Let&apos;s Work Together
          </h2>
          <div className="w-16 h-1 bg-[var(--primary)] mx-auto mb-8"></div>
          <p className="text-[var(--muted)] max-w-xl mx-auto">
            Ready to start your project? Book a free consultation call and let&apos;s
            discuss how I can help bring your ideas to life.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border border-[var(--border)] overflow-hidden"
        >
          <Cal
            calLink="omar-ashraf-omar-xyzwoj/30min"
            style={{
              width: "100%",
              height: "600px",
              overflow: "hidden",
            }}
            config={{
              layout: "month_view",
              theme: "light",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
