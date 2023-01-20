import { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";

import BlogPost from "../components/BlogPost";
import NewsletterSignup from "../components/NewsletterSignup";
import { getPost } from "../util/api";

function PostDetailPage() {

  const postData = useLoaderData();
  
  // const [error, setError] = useState();
  // const [post, setPost] = useState();
  // const [isLoading, setIsLoading] = useState(false);

  // const params = useParams();
  // const { id } = params;

  // useEffect(() => {
  //   async function loadPost() {
  //     setIsLoading(true);
  //     try {
  //       const post = await getPost(id);
  //       setPost(post);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //     setIsLoading(false);
  //   }

  //   loadPost();
  // }, [id]);
  
  return (
    <>
      {/* {isLoading && <p>Loading post...</p>}
      {error && <p>{error.message}</p>}
      {!error && post &&  */}

      <BlogPost title={postData.title} text={postData.body} />
      <NewsletterSignup />
    </>
  );
}

export default PostDetailPage;

export function loader({ params }) {
  const postId = params.id;
  return getPost(postId);
}
