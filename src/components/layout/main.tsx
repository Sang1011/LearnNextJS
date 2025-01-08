import { LayoutProps } from "@/models";
import { Box, Stack } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { Footer, Header } from "../common";

export function MainLayout({ children }: LayoutProps) {
  useEffect(() => {
    console.log("Mainlayout Mounting");

    return () => console.log("Mainlayout UnMounting");
  }, []);
  return (
    <Stack minHeight="100vh">
      <Header />

      <Box component="main" flexGrow="1">
        <Link href="/">
          <h4>Home</h4>
        </Link>
        <Link href="/blog">
          <h4>Blog</h4>
        </Link>

        <Link href="/works">
          <h4>Works</h4>
        </Link>

        {children}
      </Box>

      <Footer />
    </Stack>
  );
}
