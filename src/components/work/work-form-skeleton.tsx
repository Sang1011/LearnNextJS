import { Box, Skeleton, Stack, Typography } from "@mui/material";

export default function WorkFormSkeleton() {
  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
      <Box
        mt={2}
        width={{ xs: "100%", md: "246px" }}
        flexShrink={0}
        display="flex"
        justifyContent="center"
        sx={{
          "& img": {
            mt: { xs: 5, md: 0 },
          },
        }}
      >
        <Skeleton variant="rectangular" width={246} height={180} />
      </Box>
      <Box flexGrow={1}>
        <Typography variant="h4" fontWeight="bold">
          <Skeleton />
        </Typography>
        <Stack direction="row" my={2}>
          <Skeleton variant="rectangular" width={50} height={24} />
          <Typography ml={3} color="GrayText" flexGrow={1}>
            <Skeleton />
          </Typography>
        </Stack>
        <Typography>
          <Skeleton />
          <Skeleton />
          <Skeleton width="40%" />
        </Typography>
      </Box>
    </Stack>
  );
}
