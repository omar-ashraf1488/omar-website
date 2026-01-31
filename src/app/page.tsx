import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";
import { getProjects, getSkills, getSiteConfig, getValues } from "@/lib/notion";

// Revalidate every hour
export const revalidate = 3600;

export default async function Home() {
  // Fetch all data from Notion in parallel
  const [projects, skills, config, values] = await Promise.all([
    getProjects(),
    getSkills(),
    getSiteConfig(),
    getValues(),
  ]);

  return (
    <main>
      <Navbar config={config} />
      <Hero config={config} />
      <About config={config} values={values} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <BookingSection config={config} />
      <Footer config={config} />
    </main>
  );
}
