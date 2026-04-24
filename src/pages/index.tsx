import { AboutMe } from "@/components/Home/AboutMe";
import { Seo } from "@/components/commons/Seo";
import { Project, AboutMe as TAboutMe } from "@/types/Home";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Importação da solução interna (o arquivo que você criou em src/data/raw.json)
import homeData from "@/pages/api/data/raw.json";

interface HomeProps {
  home: {
    aboutMe: TAboutMe;
    projects: Project[];
  };
}

type RawProject = Omit<Project, 'url'> & {
  external?: string;
};

const Projects = dynamic(
  () => import("@/components/Home/Projects").then((mod) => mod.Projects),
  {
    ssr: false,
    loading: () => <div className="h-40" aria-hidden="true" />,
  }
);

const Home = ({ home }: HomeProps) => {
  // Desestruturação segura dos dados locais
  const { projects, aboutMe } = home;
  const [shouldLoadProjects, setShouldLoadProjects] = useState(false);
  const projectsAnchorRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const anchor = projectsAnchorRef.current;

    if (!anchor || shouldLoadProjects) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadProjects(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "250px 0px",
      }
    );

    observer.observe(anchor);
    return () => observer.disconnect();
  }, [shouldLoadProjects]);

  return (
    <>
      <Seo title="Home | devcix" description="Welcome to my personal space" path="/" />

      {/* Correção: 'pdx-32' alterado para 'px-32' 
          Estrutura de espaçamento vertical e horizontal 
      */}
      <div className="py-10 px-6 md:px-20 lg:px-28 space-y-8 md:space-y-12">
        <AboutMe aboutMe={aboutMe} />
        <section ref={projectsAnchorRef} className="content-auto-section">
          {shouldLoadProjects ? <Projects projects={projects} /> : <div className="h-[420px]" aria-hidden="true" />}
        </section>
      </div>
    </>
  );
};

/**
 * getStaticProps agora consome os dados internamente.
 * Isso elimina a necessidade de APIs externas e melhora a velocidade de build.
 */
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const transformedProjects: Project[] = [...(homeData.projects as RawProject[])].reverse().map((project) => ({
    ...project,
    url: project.external ?? project.repository,
  }));

  return {
    props: {
      home: {
        ...homeData,
        projects: transformedProjects,
      },
    },
  };
};

export default Home;