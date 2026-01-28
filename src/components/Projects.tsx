"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Data Pipeline Platform",
    description:
      "An end-to-end data pipeline processing millions of events daily. Features real-time streaming, data transformation, and automated quality checks.",
    image: "/projects/project1.jpg",
    technologies: ["Apache Spark", "Airflow", "Kafka", "Python"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    title: "Microservices Infrastructure",
    description:
      "Kubernetes-based microservices platform with service mesh, automated scaling, and comprehensive monitoring and alerting.",
    image: "/projects/project2.jpg",
    technologies: ["Kubernetes", "Go", "Terraform", "Prometheus"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    title: "API Gateway Service",
    description:
      "High-performance API gateway handling authentication, rate limiting, and request routing for distributed services.",
    image: "/projects/project3.jpg",
    technologies: ["Go", "Redis", "PostgreSQL", "Docker"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    title: "CI/CD Automation Platform",
    description:
      "Automated deployment pipeline with infrastructure as code, automated testing, and zero-downtime deployments across environments.",
    image: "/projects/project4.jpg",
    technologies: ["Jenkins", "Terraform", "AWS", "Python"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 px-4 bg-[var(--secondary)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-[var(--primary)] mb-8"></div>
          <p className="text-[var(--muted)] mb-12 max-w-2xl">
            Here are some of my recent projects. Each one presented unique challenges
            and opportunities to learn and grow as a developer.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-[var(--border)] group"
            >
              {/* Project Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                <span className="text-white text-lg font-medium">
                  {project.title}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                  {project.title}
                </h3>
                <p className="text-[var(--muted)] text-sm mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-[var(--secondary)] text-[var(--foreground)] text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--primary)] hover:underline text-sm"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--muted)] hover:text-[var(--foreground)] text-sm"
                  >
                    <Github size={16} />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
