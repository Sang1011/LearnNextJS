
import { GetStaticProps, GetStaticPropsContext } from 'next';
import React from 'react';

export interface Post {
  id: number;
  title: string;
}

export interface PostListPageProps {
  posts: Post[];
}

export default function App ({posts}: PostListPageProps) {
  return (
    <>
    <h1>
      Post List Page
    </h1>
    <ul>
      {posts.map((posts) => <li key={posts.id}>{posts.title}</li>)}
    </ul>
    </>
  );
}

export const getStaticProps: GetStaticProps<PostListPageProps> = async (context: GetStaticPropsContext) => {
  // server side
  // build time
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data: { id: number; title: string; body: string; userId: number }[] = await res.json();

  const posts: Post[] = data.map((x) => ({
    id: x.id,
    title: x.title,
  }));

  return {
    props: {
      posts,
    },
  };
}
