import type { GetServerSideProps, NextPage } from 'next';
import mongoose from 'mongoose';

interface UrlDoc {
    fullUrl: string;
    shortUrl: string;
}

const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGO_URI!);
};

const Url = mongoose.models.Url || mongoose.model('Url', new mongoose.Schema({
    fullUrl: String,
    shortUrl: String,
}));

const RedirectPage: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async (context) => {
    await connectDB();
    const { shortUrl } = context.params as { shortUrl: string };
    const urlDoc = await Url.findOne({ shortUrl });
    if (urlDoc) {
        return {
            redirect: {
                destination: urlDoc.fullUrl,
                permanent: false,
            },
        };
    }
    return {
        notFound: true,
    };
};

export default RedirectPage;
