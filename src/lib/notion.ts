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
        title: getTitle(props.title),
        description: getRichText(props.description),
        image: getFile(props.image),
        technologies: getMultiSelect(props.technologies),
        liveUrl: getUrl(props.liveUrl),
        githubUrl: getUrl(props.githubUrl),
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
      sorts: [{ property: "order", direction: "ascending" }],
    });

    // Group skills by category
    const categoryMap = new Map<string, string[]>();

    response.results.forEach((page) => {
      const props = (page as { properties: Record<string, unknown> }).properties;
      const name = getTitle(props.title);
      const categories = getMultiSelect(props.category);

      // Handle multiple categories by adding the skill to each
      if (categories.length > 0 && name) {
        categories.forEach((category) => {
          const existing = categoryMap.get(category) || [];
          existing.push(name);
          categoryMap.set(category, existing);
        });
      }
    });

    // Convert to array and sort alphabetically
    return Array.from(categoryMap.entries())
      .map(([title, skills]) => ({
        title,
        skills,
      }))
      .sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}

// Fetch site configuration
export async function getSiteConfig(): Promise<SiteConfig> {
  if (!CONFIG_DB) {
    throw new Error("NOTION_CONFIG_DB environment variable is not set");
  }

  try {
    const response = await notion.dataSources.query({
      data_source_id: CONFIG_DB,
    });

    const config: SiteConfig = {
      heroBadge: "",
      heroHeading: "",
      heroDescription: "",
      aboutBio1: "",
      aboutBio2: "",
      location: "",
      email: "",
      githubUrl: "",
      linkedinUrl: "",
      twitterUrl: "",
      calLink: "",
    };

    response.results.forEach((page) => {
      const props = (page as { properties: Record<string, unknown> }).properties;
      const key = getTitle(props.key);
      const value = getRichText(props.value);

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
    throw error;
  }
}

// Fetch values/attributes
export async function getValues(): Promise<Value[]> {
  if (!VALUES_DB) return [];

  try {
    const response = await notion.dataSources.query({
      data_source_id: VALUES_DB,
      sorts: [{ property: "order", direction: "ascending" }],
    });

    return response.results.map((page) => {
      const props = (page as { properties: Record<string, unknown> }).properties;
      return {
        id: page.id,
        title: getTitle(props.Name),
        description: getRichText(props.description),
        icon: getSelect(props.icon),
        order: getNumber(props.order),
      };
    });
  } catch (error) {
    console.error("Error fetching values:", error);
    return [];
  }
}
