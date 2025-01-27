import { Post } from '@/models';
import { Card, CardContent} from '@mui/material';
import  React from 'react';
import PostItem from '../blog/post-item';

export interface PostCardProps {
  post: Post
}

export default function PostCard ({post}: PostCardProps) {
  return (
    <Card>
      <CardContent>
        <PostItem post={post}/>
      </CardContent>
    </Card>
  );
}
