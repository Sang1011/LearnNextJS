import { MainLayout } from "../components/layout";
import { NextPageWithLayout } from "@/models";
import { Box } from "@mui/material";
// import { useRouter } from "next/router";
import React from "react";
import { HeroSection, RecentPosts } from "../components/home";

const Home: NextPageWithLayout = () => {

  return (
    <Box>
      <HeroSection/>
      <RecentPosts/>
    </Box>
  );
}
Home.Layout = MainLayout;

export default Home;
