import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import Posts from "../components/Posts";
import { getPosts } from "../util/api";

function BlogPostsPage() {
  const loaderData = useLoaderData();

  // const [error, setError] = useState();
  // const [posts, setPosts] = useState();
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   async function loadPosts() {
  //     setIsLoading(true);
  //     try {
  //       const posts = await getPosts();
  //       setPosts(posts);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //     setIsLoading(false);
  //   }

  //   loadPosts();
  // }, []);

  return (
    <>
      <h1>Our Blog Posts</h1>
      <Posts blogPosts={loaderData} />
    </>
  );
}

export default BlogPostsPage;

export function loader() {
  return getPosts();
}
