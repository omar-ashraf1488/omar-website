"use client";

import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import type { SiteConfig } from "@/types/notion";

interface FooterProps {
  config?: SiteConfig;
}

export default function Footer({ config }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", href: config?.githubUrl || "https://github.com", icon: Github },
    { name: "LinkedIn", href: config?.linkedinUrl || "https://linkedin.com", icon: Linkedin },
    { name: "Twitter", href: config?.twitterUrl || "https://twitter.com", icon: Twitter },
    { name: "Email", href: `mailto:${config?.email || "your.email@example.com"}`, icon: Mail },
  ];

  return (
    <footer className="py-12 px-4 bg-[var(--secondary)] border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#home" className="text-xl font-bold text-[var(--primary)]">
            Omar<span className="text-[var(--foreground)]">.dev</span>
          </a>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-200"
                aria-label={link.name}
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[var(--muted)] text-sm">
            &copy; {currentYear} Omar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
