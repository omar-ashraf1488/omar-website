// Types for Notion CMS data

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  order: number;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface SiteConfig {
  // Hero section
  heroBadge: string;
  heroHeading: string;
  heroDescription: string;
  // About section
  aboutBio1: string;
  aboutBio2: string;
  location: string;
  email: string;
  // Social links
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  // Booking
  calLink: string;
}

export interface Value {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}
