"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Github, Linkedin, Twitter } from "lucide-react";
import type { SiteConfig } from "@/types/notion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Book a Call", href: "#booking" },
];

interface NavbarProps {
  config?: SiteConfig;
}

export default function Navbar({ config }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = [
    { name: "GitHub", href: config?.githubUrl || "https://github.com", icon: Github },
    { name: "LinkedIn", href: config?.linkedinUrl || "https://linkedin.com", icon: Linkedin },
    { name: "Twitter", href: config?.twitterUrl || "https://twitter.com", icon: Twitter },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[var(--border)]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="text-xl font-bold text-[var(--primary)]">
            Omar<span className="text-[var(--foreground)]">.dev</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social Links - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-200"
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[var(--foreground)]"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex space-x-4 pt-4 border-t border-[var(--border)]">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors duration-200"
                  >
                    <link.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
