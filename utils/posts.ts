import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { Post } from "@/models";

const BLOG_FOLDER = path.join(process.cwd(), "blog");

export async function getPostList(): Promise<Post[]> {
    // read all markdown files
    const fileNameList = fs.readdirSync(BLOG_FOLDER);
    const postList: Post[] =[]

    for(const fileName of fileNameList){
        const filePath = path.join(BLOG_FOLDER, fileName);
        const fileContents = fs.readFileSync(filePath, 'utf-8')
        // console.log(fileName, '\n', fileContents)
        const {data, excerpt, content} = matter(fileContents, {excerpt_separator: '<!-- truncate-->'});
        const stats = fs.statSync(filePath);
        const fileCreateDate = stats.birthtime;
        postList.push({
            id: fileName,
            slug: data.slug,
            title: data.title,
            thumbnailUrl: data.image,
            author: {
                name: data.author,
                title: data.author_title,
                profileUrl: data.author_url,
                avatarUrl: data.author_image_url,
            },
            tagList: data.tags,
            publishedDate: fileCreateDate.toISOString(),
            description: excerpt || "",
            mdContent: content
        })
    }
    return postList
}