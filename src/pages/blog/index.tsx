/* eslint-disable @typescript-eslint/no-explicit-any */

import { GetStaticProps } from "next";
import React from "react";
import { getPostList } from "@/utils/posts";
import Link from "next/link";
import { Box, Divider, Typography } from "@mui/material";
import { MainLayout } from "@/src/components/layout";
import PostItem from "@/src/components/blog/post-item";
import { Post } from "@/models";

export interface BlogListPageProps {
  posts: Post[];
}

export default function BlogPage({ posts }: BlogListPageProps) {
  return (
    <Box mx={{ xs: 2.25, md: 30 }}>
      <Typography
        sx={{
          mt: { xs: 3, md: 13.25 },
          mb: { xs: 3, md: 6.785 }, 
        }}
        variant="h3"
        fontWeight="bold"
      >
        Blog
      </Typography>

      <Box component="ul" sx={{ listStyleType: "none", p: 0 }}>
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              style={{ color: "black", textDecoration: "none" }}
              href={`blog/${post.slug}`}
            >
              <PostItem post={post} />
            </Link>
            <Divider sx={{ my: 3 }} />
          </li>
        ))}
      </Box>
    </Box>
  );
}

BlogPage.Layout = MainLayout;

export const getStaticProps: GetStaticProps<BlogListPageProps> = async () => {
  const postList = await getPostList();
  return {
    props: {
      posts: postList,
    },
  };
};
