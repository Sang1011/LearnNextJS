import { Work } from '@/models';
import { Box, Chip, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

export interface WorkCardProps {
    work: Work
}

export default function WorkCard ({work}: WorkCardProps) {
  return (
    <Stack direction={{xs: "column", md: 'row'}} spacing={2}>
        <Box width={{xs: "100%", md: "246px"}} flexShrink={0} display="flex" justifyContent="center" sx={{
                    '& img': {
                        mt: { xs: 5, md: 0 }, 
                    },
                }}>
            <Image src={work.thumbnailUrl || ""} width={246} height={180} sizes="(max-width: 600px) 100vw, 600px" alt="work thumbnail"/>
        </Box>
        <Box>
            <Typography variant="h4" fontWeight="bold">{work.title}</Typography>
            <Stack direction="row" my={2}>
                <Chip color="secondary" label={new Date(Number.parseInt(work.createdAt)).getFullYear()} size="small"/>
                <Typography ml={3} color="GrayText">{work.tagList.join(", ")}</Typography>
            </Stack>
            <Typography>{work.shortDescription}</Typography>

        </Box>
    </Stack>
  );
}
