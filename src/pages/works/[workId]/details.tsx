/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/hooks";
import { Work } from "@/models";
import { MainLayout } from "@/src/components/layout";
import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import sanitize from "sanitize-html";

import { useEffect, useState } from "react";
import { encodeUrl } from "@/utils";


export interface WorkDetailPageProps {
  work: Work;
}
export default function WorkDetailPage({ work }: WorkDetailPageProps) {
  const router = useRouter();
  const {isLoggedIn} = useAuth();

  const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

  if (router.isFallback) {
    return (
      <div style={{ fontSize: "2rem", textAlign: "center" }}>Loading...</div>
    );
  }

  if (!work) return null;

  return (
    <Box>
      <Container>
        <Stack mb={4} mt={8} direction="row" alignItems="center" justifyContent="space-between">
          <Typography component="h1" variant="h3" fontWeight="bold">
            {work.title}
          </Typography>

          {isMounted && isLoggedIn && (
            <Button variant="contained" onClick={() => router.push(`/works/${work.id}`)}>Edit</Button>
          )}

        </Stack>

        <Stack direction="row" my={2}>
            <Chip
              color="primary"
              label={new Date(Number.parseInt(work.createdAt)).getFullYear()}
              size="small"
            />
            <Typography ml={3} color="GrayText">
              {work.tagList.join(", ")}
            </Typography>
          </Stack>
          <Typography>{work.shortDescription}</Typography>
          <Box component="div" sx={{
            img: {
              width: '100%'
            }
          }} dangerouslySetInnerHTML={{__html: work.fullDescription}}></Box>
      </Container>
    </Box>
  );
}

WorkDetailPage.Layout = MainLayout;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await fetch(
      `${process.env.API_URL}api/works?_page=1&_limit=3`
    );
    const data = await response.json();
    
    return {
      paths: data.data.map((work: any) => ({ params: { workId: work.id } })),
      fallback: true,
    };
  } catch (error) {
    console.error("Error fetching works:", error);
    return { paths: [], fallback: true };
  }
};

export const getStaticProps: GetStaticProps<WorkDetailPageProps> = async (
  context: GetStaticPropsContext
) => {
  
  try {
    const  workId  = context.params?.workId
    if (!workId) {
      return { notFound: true };
    }
    const response = await fetch(`${process.env.API_URL}api/works/${workId}`);
    const data = await response.json();

    data.fullDescription = sanitize(data.fullDescription, {
      allowedTags: sanitize.defaults.allowedTags.concat(["img"])
    })
    return {
      props: {
        work: data,
      },
      revalidate: 300,
    };
  } catch (error) {
    console.error("Error fetching work details:", error);
    return { notFound: true };
  }
};

