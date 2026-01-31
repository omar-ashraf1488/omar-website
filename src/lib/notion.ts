import { Client } from "@notionhq/client";
import type { Project, SkillCategory, SiteConfig, Value } from "@/types/notion";

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Database IDs from environment variables
const PROJECTS_DB = process.env.NOTION_PROJECTS_DB!;
const SKILLS_DB = process.env.NOTION_SKILLS_DB!;
const CONFIG_DB = process.env.NOTION_CONFIG_DB!;
const VALUES_DB = process.env.NOTION_VALUES_DB!;

// Helper to extract text from rich text
function getRichText(property: unknown): string {
  const prop = property as { rich_text?: Array<{ plain_text: string }> };
  return prop?.rich_text?.[0]?.plain_text || "";
}

// Helper to extract title
function getTitle(property: unknown): string {
  const prop = property as { title?: Array<{ plain_text: string }> };
  return prop?.title?.[0]?.plain_text || "";
}

// Helper to extract URL
function getUrl(property: unknown): string {
  const prop = property as { url?: string };
  return prop?.url || "";
}

// Helper to extract number
function getNumber(property: unknown): number {
  const prop = property as { number?: number };
  return prop?.number || 0;
}

// Helper to extract multi-select
function getMultiSelect(property: unknown): string[] {
  const prop = property as { multi_select?: Array<{ name: string }> };
  return prop?.multi_select?.map((item) => item.name) || [];
}

// Helper to extract select
function getSelect(property: unknown): string {
  const prop = property as { select?: { name: string } };
  return prop?.select?.name || "";
}

// Helper to extract file URL
function getFile(property: unknown): string {
  const prop = property as {
    files?: Array<{
      file?: { url: string };
      external?: { url: string };
    }>;
  };
  const file = prop?.files?.[0];
  return file?.file?.url || file?.external?.url || "";
}

// Fetch all projects
export async function getProjects(): Promise<Project[]> {
  if (!PROJECTS_DB) return [];

  try {
    const response = await notion.dataSources.query({
      data_source_id: PROJECTS_DB,
      sorts: [{ property: "Order", direction: "ascending" }],
    });

    return response.results.map((page) => {
      const props = (page as { properties: Record<string, unknown> }).properties;
      return {
        id: page.id,
        title: getTitle(props.Title),
        description: getRichText(props.Description),
        image: getFile(props.Image),
        technologies: getMultiSelect(props.Technologies),
        liveUrl: getUrl(props["Live URL"]),
        githubUrl: getUrl(props["GitHub URL"]),
        order: getNumber(props.Order),
      };
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

// Fetch all skills grouped by category
export async function getSkills(): Promise<SkillCategory[]> {
  if (!SKILLS_DB) return [];

  try {
    const response = await notion.dataSources.query({
      data_source_id: SKILLS_DB,
      sorts: [{ property: "Order", direction: "ascending" }],
    });

    // Group skills by category
    const categoryMap = new Map<string, string[]>();

    response.results.forEach((page) => {
      const props = (page as { properties: Record<string, unknown> }).properties;
      const name = getTitle(props.Name);
      const category = getSelect(props.Category);

      if (category && name) {
        const existing = categoryMap.get(category) || [];
        existing.push(name);
        categoryMap.set(category, existing);
      }
    });

    // Convert to array with predefined order
    const categoryOrder = [
      "Backend",
      "Data Engineering",
      "Databases",
      "DevOps & Cloud",
      "Monitoring & Tools",
    ];

    return categoryOrder
      .filter((cat) => categoryMap.has(cat))
      .map((title) => ({
        title,
        skills: categoryMap.get(title) || [],
      }));
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}

// Fetch site configuration
export async function getSiteConfig(): Promise<SiteConfig> {
  const defaultConfig: SiteConfig = {
    heroBadge: "Backend | Data | DevOps",
    heroHeading:
      "I build scalable systems and data pipelines where reliability meets performance",
    heroDescription:
      "A Software Engineer focused on Backend development, Data Engineering, and DevOps. Building robust, scalable infrastructure and data solutions.",
    aboutBio1:
      "Hello! I'm Omar, a Software Engineer with a focus on Backend development, Data Engineering, and DevOps. I enjoy building robust systems that handle data at scale and automate complex workflows.",
    aboutBio2:
      "With experience in designing APIs, building data pipelines, and managing cloud infrastructure, I help teams ship reliable software faster through automation and best practices.",
    location: "Your Location",
    email: "your.email@example.com",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    twitterUrl: "https://twitter.com",
    calLink: "omar-ashraf-omar-xyzwoj/30min",
  };

  if (!CONFIG_DB) return defaultConfig;

  try {
    const response = await notion.dataSources.query({
      data_source_id: CONFIG_DB,
    });

    const config = { ...defaultConfig };

    response.results.forEach((page) => {
      const props = (page as { properties: Record<string, unknown> }).properties;
      const key = getTitle(props.Key);
      const value = getRichText(props.Value);

      if (key && value) {
        switch (key) {
          case "hero_badge":
            config.heroBadge = value;
            break;
          case "hero_heading":
            config.heroHeading = value;
            break;
          case "hero_description":
            config.heroDescription = value;
            break;
          case "about_bio_1":
            config.aboutBio1 = value;
            break;
          case "about_bio_2":
            config.aboutBio2 = value;
            break;
          case "location":
            config.location = value;
            break;
          case "email":
            config.email = value;
            break;
          case "github_url":
            config.githubUrl = value;
            break;
          case "linkedin_url":
            config.linkedinUrl = value;
            break;
          case "twitter_url":
            config.twitterUrl = value;
            break;
          case "cal_link":
            config.calLink = value;
            break;
        }
      }
    });

    return config;
  } catch (error) {
    console.error("Error fetching site config:", error);
    return defaultConfig;
  }
}

// Fetch values/attributes
export async function getValues(): Promise<Value[]> {
  if (!VALUES_DB) return [];

  try {
    const response = await notion.dataSources.query({
      data_source_id: VALUES_DB,
      sorts: [{ property: "Order", direction: "ascending" }],
    });

    return response.results.map((page) => {
      const props = (page as { properties: Record<string, unknown> }).properties;
      return {
        id: page.id,
        title: getTitle(props.Title),
        description: getRichText(props.Description),
        icon: getSelect(props.Icon),
        order: getNumber(props.Order),
      };
    });
  } catch (error) {
    console.error("Error fetching values:", error);
    return [];
  }
}
