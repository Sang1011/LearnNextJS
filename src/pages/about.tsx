import { MainLayout } from "@/components/layout";
import axios from "axios";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface AboutProps {
  // serverTime: string;
  data: Post[];
}

export default function AboutPage({ data }: AboutProps) {
  const router = useRouter();
  console.log(router.query);
  return (
    <>
      <div>
        <div>
          <h1>About Page</h1>
          {data.map((item, i) => (
            <div key={item.id}>
              <h2>
                {i}. {item.title}
              </h2>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

AboutPage.Layout = MainLayout;

export const getStaticProps: GetStaticProps = async () => {
  const fetch = await axios.get("https://dummyjson.com/posts?limit=10");
  console.log("fetch ", fetch.data.posts);
  const data = fetch.data.posts;
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
    revalidate: 10, // Optional: Làm mới trang sau mỗi 10 giây, nếu cần
  };
};

// export function getServerSideProps(){
//   const serverTime = new Date().toISOString();
//     return{
//         props: {
//           serverTime
//         }, // truyền qua page component như là 1 props
//     }
// }

// trang này nên dùng static hơn vì nó ít thay đổi
