import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import * as React from "react";
import { Work } from "@/models";
import WorkList from "../work/work-list";

export function FeaturedWorks() {
  const workList: Work[] = [
    {
      id: "1",
      title: "Designing Dashboards",
      createdAt: "1736436121603",
      tagList: ["Dashboard"],
      updatedAt: "",
      fullDescription: "",
      shortDescription:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
        thumbnailUrl:
        "https://res.cloudinary.com/dfrn7ujle/image/upload/v1736440046/Designing_Dashboards_d9nj6j.jpg",
    },
    {
      id: "2",
      title: "Vibrant Portraits of 2020",
      createdAt: "1736436121603",
      tagList: ["Illustration"],
      updatedAt: "",
      fullDescription: "",
      shortDescription:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
      thumbnailUrl:
        "https://res.cloudinary.com/dfrn7ujle/image/upload/v1736440047/Vibrant_Portraits_of_2020_l6nmhu.jpg",
    },
    {
      id: "3",
      title: "36 Days of Malayalam type",
      createdAt: "1736436121603",
      tagList: ["Typography"],
      updatedAt: "",
      fullDescription: "",
      shortDescription:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
        thumbnailUrl:
        "https://res.cloudinary.com/dfrn7ujle/image/upload/v1736440047/Malam_mcpneh.jpg",
    },
  ];
  return (
    <Box component="section" pt={2} pb={4}>
      <Container>
        <Typography variant="h5">Featured Works</Typography>
        <WorkList workList={workList} />
      </Container>
    </Box>
  );
}
