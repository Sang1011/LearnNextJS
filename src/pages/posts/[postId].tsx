import axios from 'axios';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface PostDetailPageProps {
  post: Post;
}

export default function PostDetailPage({ post }: PostDetailPageProps) {
  const router = useRouter();

  if (!post) {
    return <div>Post not found!</div>; // Thêm phần xử lý khi post không tìm thấy
  }

  return (
    <div>
      <h1>Post Detail Page</h1>
      <p>Query: {JSON.stringify(router.query)}</p>
      <div>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<PostDetailPageProps> = async (context: GetStaticPropsContext) => {
  const { postId } = context.params as { postId: string };
  
  try {
    const fetch = await axios.get(`https://dummyjson.com/posts/${postId}`);
    const post = fetch.data;

    if (!post) {
      return { notFound: true }; // Trả về lỗi 404 nếu không tìm thấy bài viết
    }

    return {
      props: {
        post,
      },
      revalidate: 10,
    };
  } catch (error) {
    return { notFound: true }; // Xử lý lỗi và trả về 404 nếu có sự cố trong việc lấy dữ liệu
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const fetch = await axios.get('https://dummyjson.com/posts?limit=20');
    const posts = fetch.data.posts;

    const paths = posts?.map((post: { id: number }) => ({
      params: { postId: post.id.toString() },
    })) || [];

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    return {
      paths: [],
      fallback: 'blocking', // Nếu có lỗi, trả về empty path
    };
  }
};
