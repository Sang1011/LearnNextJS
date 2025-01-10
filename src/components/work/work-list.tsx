import { Work } from '@/models';
import { Box, Divider } from '@mui/material';
import React, {Fragment} from 'react';
import WorkCard from './work-card';

export interface WorkListProps {
    workList: Work[]
}

export default function WorkList ({workList}: WorkListProps) {
    if(workList.length === 0) return null
  return (
    <Box pt={5}>
        {workList.map(work => (
            <Fragment key={work.id}>
                <WorkCard work={work}>
                </WorkCard>
                <Divider sx={{mt: 3}}/>
            </Fragment>
        ))}
    </Box>
  );
}
