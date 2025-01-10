import { Post } from '@/models';
import { Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import  React, { useEffect, useState} from 'react';
import { format } from "date-fns"

export interface PostCardProps {
  post: Post
}

export default function PostCard ({post}: PostCardProps) {
  const [formattedDate, setFormattedDate] = useState("")
  const [formattedTags, setFormattedTags] = useState("")
  useEffect(() => {
    if (post?.publishedDate) {
      setFormattedDate(format(Number(post.publishedDate), "dd MMM yyyy"));
    }
    if (post?.tagList) {
      const tags = post.tagList.length > 3 
        ? `${post.tagList[0]}, ${post.tagList[1]},...` 
        : post.tagList.join(", ");
      
      setFormattedTags(tags);
    }
  }, [post]);
  if(!post) return null
  return (
    <Card>
      <CardContent>
        <Typography variant='h5' fontWeight="bold">{post.title}</Typography>
        
        <Stack my={2} direction="row">
        <Typography variant='body1'>
          {formattedDate}
        </Typography>
        <Divider orientation='vertical' flexItem sx={{ mx: 2}}/>
        <Typography variant='body1'>
          {formattedTags}
        </Typography>
        </Stack>
        
        <Typography>{post.description}</Typography>
      </CardContent>
    </Card>
  );
}
