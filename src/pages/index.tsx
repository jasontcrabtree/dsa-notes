import Head from "next/head";

export default function Home({ postSlugs }: {
  postSlugs: { slug: string }
}) {
  console.log('props', postSlugs)
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24`}
      >
        Home
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const fs = require("fs");
  const path = require("path");

  const files = fs.readdirSync(path.join("src", "pages", "topics"));
  const postSlugs = files.map((filename: string) => {
    const slug = filename.replace(".mdx", "");
    return {
      slug,
    };
  });

  return {
    props: {
      postSlugs
    },
  };
}