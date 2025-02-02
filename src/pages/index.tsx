import { MainLayout } from "../components/layout";
import { NextPageWithLayout } from "@/models";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { HeroSection, RecentPosts, FeaturedWorks } from "../components/home";
import Seo from "../components/common/seo";

const Home: NextPageWithLayout = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Box>
      <Seo data={{
        title: "NextJS Tutorials | Easy Frontend",
        description: "Step by step tutorials to build a full CRUD website using NextJS for beginners",
        url: "https://learn-next-js-virid-psi.vercel.app/",
        thumbnailUrl: "https://res.cloudinary.com/dfrn7ujle/image/upload/v1728623770/cld-sample-5.jpg"
      }} />
      <HeroSection />
      <RecentPosts />
      <FeaturedWorks />
    </Box>
  );
}

Home.Layout = MainLayout;

export default Home;
