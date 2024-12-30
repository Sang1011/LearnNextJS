import { MainLayout } from "@/components/layout";
import { NextPageWithLayout } from "@/models";
import { useRouter } from "next/router";
import React from "react";

const Home: NextPageWithLayout = () => {
  const router = useRouter();

  function goToDetailPage(){
    router.push({
      pathname: "/posts/[postId]",
      query: {
        postId: 123,
        ref: 'social'
      }
    })
  }


  return (
    <>
      <div>
        <div>Home Page</div>
      </div>
    </>
  );
}
Home.Layout = MainLayout;

export default Home;
