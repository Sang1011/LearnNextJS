
// import { GetStaticProps, GetStaticPropsContext } from 'next';
// import React from 'react';
// import Link from 'next/link';
// import axios from 'axios';

// // export interface Post {
// //   id: number;
// //   title: string;
// // }

// // export interface PostListPageProps {
// //   posts: Post[];
// // }

// export default function App () {
//   return (
//     <>
//     <h1>
//       Post List Page
//     </h1>
//     {/* <ul>
//       {posts.map((posts) => <li key={posts.id}>
//         <Link href={`posts/${posts.id}`}>
//         {posts.title}
//         </Link>
//       </li>)}
//     </ul> */}
//     </>
//   );
// }

// // export const getStaticProps: GetStaticProps<PostListPageProps> = async (context: GetStaticPropsContext) => {
// //   try {
// //     const res = await axios.get("https://dummyjson.com/posts");

// //     if (!res.data || !res.data.posts) {
// //       // Trả về một thông báo lỗi hoặc 404 nếu không có posts
// //       return { notFound: true };
// //     }

// //     const data = res.data.posts;

// //     const posts: Post[] = data.map((x: Post) => ({
// //       id: x.id,
// //       title: x.title,
// //     }));

// //     return {
// //       props: {
// //         posts,
// //       },
// //       revalidate: 10,
// //     };

// //   } catch (error) {
// //     console.error("Error fetching data:", error);
// //     return { notFound: true };  // Xử lý lỗi khi gọi API thất bại
// //   }
// // };

