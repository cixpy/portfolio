import Head from 'next/head';

const SITE_URL = 'https://devcix.com';
const SITE_NAME = 'devcix';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

interface SeoProps {
    title: string;
    description: string;
    path: string;
    noIndex?: boolean;
    ogImage?: string;
}

export const Seo = ({ title, description, path, noIndex = false, ogImage }: SeoProps) => {
    const canonicalPath = path.startsWith('/') ? path : `/${path}`;
    const canonicalUrl = `${SITE_URL}${canonicalPath}`;
    const imageUrl = ogImage ?? OG_IMAGE;

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Robots */}
            {noIndex
                ? <meta name="robots" content="noindex,follow" />
                : <meta name="robots" content="index,follow" />
            }

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:locale" content="en_US" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
        </Head>
    );
};