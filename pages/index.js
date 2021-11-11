import Layout, { siteTitle } from "../components/layout";
import Head from "next/head";
import utilStyles from "../components/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

/**
 * By returning allPostsData inside the props object in getStaticProps,
 * the blog posts will be passed to the Home component as a prop.
 * Now you can access the blog posts like so.
 */
/**
 * If you export an async function called getStaticProps from a page,
 * Next.js will pre-render this page at build time using the props returned by getStaticProps.
 *
 * https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  console.log("allPostsData", allPostsData);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Introdução muito daora e muito profissional WOW]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
