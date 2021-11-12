import Layout from "../../components/layout";
import { getAllPostsIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../components/utils.module.css";
import { GetStaticProps, GetStaticPaths } from "next";
/**
 * https://nextjs.org/learn/basics/dynamic-routes/implement-getstaticprops
 */

interface PostPropsInterface {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}

/**
 * paths contains the array of known paths returned by getAllPostIds(),
 * which include the params defined by pages/posts/[id].js
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostsIds();
  return {
    paths,
    fallback: false,
  };
};

/**
 * The post page is now using the getPostData function in getStaticProps to
 * get the post data and return it as props.
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};

const Post = ({ postData }: PostPropsInterface) => {
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
};

export default Post;
