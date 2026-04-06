import type { GetServerSideProps, NextPage } from 'next';

const ExperienceRedirect: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        redirect: {
            destination: '/experiences',
            permanent: false,
        },
    };
};

export default ExperienceRedirect;
