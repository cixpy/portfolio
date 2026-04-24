import Head from 'next/head';

const SITE_URL = 'https://devcix.com';

interface SeoProps {
    title: string;
    description: string;
    path: string;
    noIndex?: boolean;
}

export const Seo = ({ title, description, path, noIndex = false }: SeoProps) => {
    const canonicalPath = path.startsWith('/') ? path : `/${path}`;
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            {noIndex ? <meta name="robots" content="noindex,follow" /> : null}
        </Head>
    );
};