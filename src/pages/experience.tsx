import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

const ExperienceRedirect: NextPage = () => (
    <Head>
        <meta name="robots" content="noindex,nofollow" />
    </Head>
);

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        redirect: {
            destination: '/experiences',
            permanent: true,
        },
    };
};

export default ExperienceRedirect;
