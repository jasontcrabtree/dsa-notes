
import { GetStaticPaths, NextPage } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';

interface PostMetadata {
    title: string;
    date?: string;
}

interface PostPageProps {
    source: any;
    frontmatter: PostMetadata;
}

const PostPage: NextPage<PostPageProps> = ({ source, frontmatter }) => {
    return (
        <article>
            <Head>
                <title>{frontmatter.title}</title>
            </Head>
            <h1>{frontmatter.title}</h1>
            <MDXRemote {...source} />
        </article>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const topicsDirectory = path.join(process.cwd(), 'topics');
    const filenames = fs.readdirSync(topicsDirectory);
    const paths = filenames
        .filter(filename => filename.endsWith('.mdx'))
        .map(filename => ({
            params: { post: filename.replace(/\.mdx$/, '') },
        }));

    return { paths, fallback: false };
};

export const getStaticProps = async (
    { params }: { params: { post: string } }) => {
    const topicsDirectory = path.join(process.cwd(), 'topics');
    const { post } = params!;
    const filePath = path.join(topicsDirectory, `${post}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);
    const mdxSource = await serialize(content);

    return {
        props: {
            source: mdxSource,
            frontmatter
        }
    };
};

export default PostPage;