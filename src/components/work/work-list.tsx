import { Work } from "@/models";
import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { Fragment } from "react";
import WorkCard from "./work-card";
import Image from "next/image";
import WorkSkeleton from "./work-skeleton";

export interface WorkListProps {
  workList: Work[];
  loading?: boolean;
}

export default function WorkList({ workList, loading }: WorkListProps) {
  if (loading)
    return (
      <Box pt={5}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Fragment key={index}>
            <WorkSkeleton />
            <Divider sx={{ mt: 3 }} />
          </Fragment>
        ))}
      </Box>
    );

  if (workList.length === 0)
    return (
      <Stack
        direction="column"
        alignItems="center"
      >
        <Box ml={3}>
          <Image
            src="https://res.cloudinary.com/dfrn7ujle/image/upload/v1737464147/no-result-document-file-data-600nw-2293706569_npviqq.webp"
            width={170}
            height={170}
            layout="fixed"
            alt="work thumbnail"
          />
        </Box>
        <Box>
          <Typography fontWeight="light">No data</Typography>
        </Box>
      </Stack>
    );
  return (
    <Box pt={5}>
      {workList.map((work) => (
        <Fragment key={work.id}>
          <WorkCard work={work}></WorkCard>
          <Divider sx={{ my: 4 }} />
        </Fragment>
      ))}
    </Box>
  );
}
