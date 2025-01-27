/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdminLayout, MainLayout } from "../components/layout/index";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {Box, Button, Typography} from "@mui/material"
import Header from "../components/common/header";

export default function AboutPage() {
  // const [postList, setPostList] = useState([])
  // const router = useRouter()

  // console.log("About query: ", router.query);
  // const page = router.query?.page;
  // const limit = 5;
  // const skip = (Number(page) - 1) * limit;
  // useEffect(() => {
  //   if (!page) return;
  //   (async () => {
  //     const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`)
  //     const data = await response.json();

  //     setPostList(data.posts)
    
  //   })()
  // }, [page])

  // function handleNextClick(){
  //   router.push(
  //     {
  //       pathname: '/about',
  //       query: {
  //         page: (Number(page) || 1) + 1,
  //       },
  //     },
  //     undefined,
  //     { shallow: true}
  //   )
  // }
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

          {/* <ul className="post-list">
            {postList.map((post: any) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
          <button onClick={handleNextClick}>Next page</button> */}
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