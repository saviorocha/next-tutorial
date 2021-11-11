import Layout from "../../components/layout";
import { getAllPostsIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../components/utils.module.css";
/**
 * https://nextjs.org/learn/basics/dynamic-routes/implement-getstaticprops
 */

/**
 * paths contains the array of known paths returned by getAllPostIds(),
 * which include the params defined by pages/posts/[id].js
 */
export async function getStaticPaths() {
  const paths = getAllPostsIds();
  return {
    paths,
    fallback: false,
  };
}

/**
 * The post page is now using the getPostData function in getStaticProps to
 * get the post data and return it as props.
 */
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
