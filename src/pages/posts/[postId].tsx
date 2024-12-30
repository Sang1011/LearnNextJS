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
  posts: Post;
}

export default function App ({posts}: PostDetailPageProps) {
    const router = useRouter()
  return (
    <div>
      <h1>Post Detail Page</h1>

      <p>Query: {JSON.stringify(router.query)}</p>
        <div>
          <h2>{posts.title}</h2>
          <p>{posts.body}</p>
        </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<PostDetailPageProps> = async (context: GetStaticPropsContext) => {
  const { postId } = context.params as { postId: string };
  const fetch = await axios.get(`https://dummyjson.com/posts/${postId}`);
  const posts = fetch.data;
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const fetch = await axios.get('https://dummyjson.com/posts?limit=20');
  const posts = fetch.data.posts;

  // Trả về các đường dẫn với các tham số `postId` mà bạn muốn pre-build
  // const paths = posts.map((post: { id: number }) => ({
  //   params: { postId: post.id.toString() }, // `postId` cần phải là chuỗi
  // }));

  const paths = posts.map((post: {id: number}) => ({
    params: { postId: post.id.toString()  }
  }))

  return {
    paths, // Đưa ra các đường dẫn động
    fallback: 'blocking',
     // Chế độ fallback cho những đường dẫn chưa được build (có thể dùng 'blocking' hoặc 'true/false')
     // nếu là chế độ này thì nó sẽ chờ api
     // nếu là true thì cho phép người dùng thấy trang trước khi dữ liệu đc render lại
     // false thì trả về 404
  };
};

// gọi path trước để xác định đường dẫn
// sau khi dữ liệu đc pre-render và đc lưu lại tại các path
// props sẽ đc gọi