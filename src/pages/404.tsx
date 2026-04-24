import Link from "next/link";
import { Roboto } from 'next/font/google'
import { Seo } from "@/components/commons/Seo";

const roboto = Roboto({
    subsets: ['latin'],
    weight: '500'
})
const NotFound = () => {
    return (
        <>
            <Seo title="404 | devcix" description="404 error page" path="/404" noIndex />
            <div className="flex flex-col text-center items-center mt-12 md:my-24 gap-8 px-6 md:px-32">
                <h1 className="text-5xl sm:text-7xl font-bold">404</h1>
                <p className="flex flex-col gap-8 md:gap-4 md:text-xl">
                    <span>We could not find this page.</span>
                    <span>Use the button below to return home.</span>
                </p>
                <Link href="/" className={`${roboto.className} p-4 bg-dracula-cyan rounded-xl text-black mt-5 md:text-xl md-12 w-fit`}>Go home</Link>
            </div>
        </>
    );
};

export default NotFound;
