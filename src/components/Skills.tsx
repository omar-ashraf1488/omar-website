"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Backend",
    skills: ["Python", "Go", "Node.js", "REST APIs", "GraphQL", "gRPC"],
  },
  {
    title: "Data Engineering",
    skills: ["Apache Spark", "Airflow", "Kafka", "ETL Pipelines", "SQL", "dbt"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Snowflake"],
  },
  {
    title: "DevOps & Cloud",
    skills: ["AWS", "GCP", "Kubernetes", "Docker", "Terraform", "CI/CD"],
  },
  {
    title: "Monitoring & Tools",
    skills: ["Prometheus", "Grafana", "Git", "Linux", "Datadog", "Jenkins"],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Skills & Technologies
          </h2>
          <div className="w-16 h-1 bg-[var(--primary)] mb-8"></div>
          <p className="text-[var(--muted)] mb-12 max-w-2xl">
            I work with a variety of technologies and tools to bring ideas to life.
            Here&apos;s an overview of my technical toolkit.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-[var(--secondary)] p-6 rounded-lg"
            >
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-white text-[var(--foreground)] text-sm rounded-full border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
