import type { GetServerSideProps, NextPage } from 'next';

const ExperienceRedirect: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        redirect: {
            destination: '/experiences',
            permanent: true,
        },
    };
};

export default ExperienceRedirect;
