import { AboutMe } from "@/components/Home/AboutMe";
import { Projects } from "@/components/Home/Projects";
import { Project, AboutMe as TAboutMe } from "@/types/Home";
import { GetStaticProps } from "next";
import Head from "next/head";

// Importação da solução interna (o arquivo que você criou em src/data/raw.json)
import homeData from "@/data/raw.json";

interface HomeProps {
  home: {
    aboutMe: TAboutMe;
    projects: Project[];
  };
}

const Home = ({ home }: HomeProps) => {
  // Desestruturação segura dos dados locais
  const { projects, aboutMe } = home;

  return (
    <>
      <Head>
        <title>Home | Cix</title>
        <meta name="description" content="Sou um dev full stack" />
      </Head>

      {/* Correção: 'pdx-32' alterado para 'px-32' 
          Estrutura de espaçamento vertical e horizontal 
      */}
      <div className="py-12 px-6 md:px-32 space-y-10 md:space-y-28">
        <AboutMe aboutMe={aboutMe} />
        <Projects projects={projects} />
      </div>
    </>
  );
};

/**
 * getStaticProps agora consome os dados internamente.
 * Isso elimina a necessidade de APIs externas e melhora a velocidade de build.
 */
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const transformedProjects = homeData.projects.map((project) => ({
    ...project,
    url: project.external,
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