import { LayoutProps } from "@/models";
import { Box, Stack } from "@mui/material";
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

      <Box component="main" flexGrow={1}>

        {children}
      </Box>
 
      <Footer />
    </Stack>
  );
}