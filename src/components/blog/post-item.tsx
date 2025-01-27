import { Post } from '@/models';
import { Box, Divider, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { format } from "date-fns"

export interface PostItemProps {
    post: Post
}

export default function PostItem ({ post }: PostItemProps) {
    const [formattedDate, setFormattedDate] = useState("");
    const [formattedTags, setFormattedTags] = useState("");                               

    useEffect(() => {
        if (post?.publishedDate) {
            // Kiểm tra và chuyển đổi publishedDate thành đối tượng Date
            const date = typeof post.publishedDate === "string" 
                ? new Date(Number.parseInt((post.publishedDate)))  // nếu là chuỗi, chuyển sang đối tượng Date
                : post.publishedDate;  // nếu đã là Date, sử dụng trực tiếp
            setFormattedDate(format(date, "dd MMM yyyy"));
        }

        if (post?.tagList) {
            const tags = post.tagList.length > 3
                ? `${post.tagList[0]}, ${post.tagList[1]},...`
                : post.tagList.join(", ");
            setFormattedTags(tags);
        }
    }, [post]);

    if (!post) return null;

    return (
        <Box>
            <Typography variant="h5" fontWeight="bold">{post.title}</Typography>

            <Stack my={2} direction="row">
                <Typography variant="body1">
                    {formattedDate}
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                <Typography color='#8695A4' variant="body1">
                    {formattedTags}
                </Typography>
            </Stack>

            <Typography>{post.description}</Typography>

        </Box>
    );
}
