import { Box, Typography } from "@mui/material";
import Header from "../components/common/header";
import { MainLayout } from "../components/layout";

export default function AboutPage() {
  return (
    <Box>
      <Typography variant="h3" color="primary.main">
        About Page
      </Typography>
      <Header />
    </Box>
  );
}

AboutPage.Layout = MainLayout;
