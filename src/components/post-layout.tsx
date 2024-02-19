import Head from "next/head";

const PostLayout = ({ children, frontmatter }: {
    children: React.ReactNode;
    frontmatter: {
        title: string
    };
}) => {
    const title = frontmatter?.title || "Default Title";

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div>{children}</div>
        </>
    );
};

export default PostLayout;