/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdminLayout, MainLayout } from "../components/layout/index";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {Box, Button, Typography} from "@mui/material"
import { Header } from "../components/common";
// export interface Post {
//   id: number;
//   title: string;
//   body: string;
// }

// export interface AboutProps {
//   // serverTime: string;
//   data: Post[];
// }

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
  const [postList, setPostList] = useState([])
  const router = useRouter()

  console.log("About query: ", router.query);
  const page = router.query?.page;
  const limit = 5;
  const skip = (Number(page) - 1) * limit;
  useEffect(() => {
    if (!page) return;
    (async () => {
      const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`)
      const data = await response.json();

      setPostList(data.posts)
    
    })()
  }, [page])

  function handleNextClick(){
    router.push(
      {
        pathname: '/about',
        query: {
          page: (Number(page) || 1) + 1,
        },
      },
      undefined,
      { shallow: true}
    )
  }
  // const router = useRouter();
  // console.log(router.query);
  return (
    <Box 
    // sx={{bgcolor: 'primary.light'}} color="text.primary"
    >
          <Typography variant="h3" color="primary.main">
            About Page
          </Typography>
          <Header/>

          <ul className="post-list">
            {postList.map((post: any) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
          <button onClick={handleNextClick}>Next page</button>
          {/* <h1>About Page</h1> */}
          {/* {data.map((item, i) => (
            <div key={item.id}>
              <h2>
                {i}. {item.title}
              </h2>
              <p>{item.body}</p>
            </div>
          ))} */}
    </Box>
  );
}

AboutPage.Layout = AdminLayout;

// export async function getStaticProps() {
//   console.log("get static props");

//   return {
//     props: {},
//   };
// }

// export const getStaticProps: GetStaticProps = async () => {
//   const fetch = await axios.get("https://dummyjson.com/posts?limit=10");
//   console.log("fetch ", fetch.data.posts);
//   const data = fetch.data.posts;
//   if (!data) {
//     return {
//       notFound: true,
//     };
//   }
//   return {
//     props: {
//       data,
//     },
//     revalidate: 10, // Optional: Làm mới trang sau mỗi 10 giây, nếu cần
//   };
// };

// export function getServerSideProps(){
//   const serverTime = new Date().toISOString();
//     return{
//         props: {
//           serverTime
//         }, // truyền qua page component như là 1 props
//     }
// }

// trang này nên dùng static hơn vì nó ít thay đổi
