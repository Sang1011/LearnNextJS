import { MainLayout } from "../components/layout";
import { NextPageWithLayout } from "@/models";
import { Box } from "@mui/material";
// import { useRouter } from "next/router";
import React from "react";
import { HeroSection, RecentPosts, FeaturedWorks } from "../components/home";
import Seo from "../components/common/seo";

const Home: NextPageWithLayout = () => {

  return (
    <Box>
      <Seo data={{
        title: "NextJS Tutorials | Easy Frontend",
        description: "Step by step tutorials to build a full CRUD website using NextJS for beginners",
        url: "",
        thumbnailUrl: "https://res.cloudinary.com/dfrn7ujle/image/upload/v1728623770/cld-sample-5.jpg"
      }}
      />
      <HeroSection/>
      <RecentPosts/>
      <FeaturedWorks/>
    </Box>
  );
}
Home.Layout = MainLayout;

export default Home;
