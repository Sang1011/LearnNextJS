import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import remarkToc from "remark-toc";
import { Box, Container, Divider } from "@mui/material";
import { getPostList } from "@/utils/posts";
import remarkPrism from "remark-prism";
import { Post } from "@/models";
import { MainLayout } from "@/src/components/layout";
import { GetStaticProps, GetStaticPaths } from 'next';
import Seo from "@/src/components/common/seo";
import React, { useEffect } from "react";

export interface BlogDetailPageProps {
  post: Post;
}

export default function BlogDetailPage({ post }: BlogDetailPageProps) {
  useEffect(() => {
    if (!post) return;

    // Tải script sau 3 giây khi có post
    setTimeout(() => {
      const script = document.createElement('script');
      script.src = '/prism.js';
      script.async = true;
      script.onload = () => console.log('Script đã được tải!');
      document.body.appendChild(script);
    }, 1000); // Chạy sau 3 giây
  }, [post]); // useEffect sẽ chạy lại khi `post` thay đổi

  if (!post) {
    return <div>Blog not found!</div>;
  }
  return(
    <Box mx={15}>
      <Seo data={{
              title: post.title,
              description: post.description,
              url: `${process.env.HOST_URL}/blog/${post.slug}`,
              thumbnailUrl: post.thumbnailUrl || "https://res.cloudinary.com/dfrn7ujle/image/upload/v1728623770/cld-sample-5.jpg"
            }}
            />
    <Container>
      <h1>Blog Detail Page</h1>
        <h2>{post.title}</h2>
        <p>{post.author?.name}</p>

        <Divider />
        <div dangerouslySetInnerHTML={{ __html: post.htmlContent || "" }}></div>
        </Container>
    </Box>
  );
}

BlogDetailPage.Layout = MainLayout;

export const getStaticProps: GetStaticProps<BlogDetailPageProps> = async (context) => {
  const postList = await getPostList();
  const slug = context.params?.slug;

  if (!slug) return { notFound: true };

  // Tìm bài viết dựa trên slug
  const post = postList.find((x) => x.slug === slug);

  if (!post) return { notFound: true };

  // Sử dụng remark-prism với remark
  const file = await unified()
    .use(remarkParse)
    .use(remarkToc, { heading: 'angeda.*' })
    .use(remarkPrism, {plugins: ['line-numbers']})
    .use(remarkRehype)
    .use(rehypeDocument, { title: "Blog detail Page" })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(post.mdContent || "");
  console.log(file.toString());
  post.htmlContent = file.toString();
  return {
    props: {
      post,
      
    },
  };
};


export const getStaticPaths: GetStaticPaths = async () => {
  const postList = await getPostList();

  // Map slug thành params
  const paths = postList.map((post: Post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false, // Sử dụng fallback blocking nếu muốn hỗ trợ thêm slug
  };
};
