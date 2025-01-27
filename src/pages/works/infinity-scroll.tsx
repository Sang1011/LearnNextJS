import { useWorkListInfinity } from "@/hooks/use-work-list-infinity";
import { ListParams, ListResponse, Work, WorkFiltersPayload } from "@/models";
import { WorkFilters } from "@/src/components/work/work-filters";
import WorkList from "@/src/components/work/work-list";
import {
  Box,
  CircularProgress,
  Container,
  Skeleton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MainLayout } from "../../components/layout";

export interface InfinityScrollProps {}

export default function InfinityScroll(props: InfinityScrollProps) {
  const router = useRouter();

  const filters: Partial<ListParams> = {
    ...router.query,
  };

  const initialFiltersPayload: WorkFiltersPayload = {
    search: filters.title_like || "",
    selectedTagList: filters.tagList_like?.split("|") || [],
    tagList_like: filters.tagList_like || "",
  };

  const { data, isLoading, isValidating, size, setSize } = useWorkListInfinity({
    params: filters,
    enabled: router.isReady,
  });
  console.log({ data, isValidating, size, isLoading });

  const workList: Array<Work> =
    data?.reduce((result: Array<Work>, currentPage: ListResponse<Work>) => {
      result.push(...currentPage.data);
      return result;
    }, []) || [];

  function handleFiltersChange(newFilters: WorkFiltersPayload) {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...filters,
          title_like: newFilters.search,
          tagList_like: newFilters.tagList_like,
        },
      },
      undefined,
      { shallow: true }
    );
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const threshold = document.documentElement.scrollHeight - 100;

      if (scrollPosition >= threshold && !isLoading && !isValidating) {
        setSize((prevSize) => prevSize + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, isValidating, setSize]);

  return (
    <Box>
      <Container>
        <Box mb={4} mt={8}>
          <Typography component="h1" variant="h3" fontWeight="bold">
            Work
          </Typography>
        </Box>

        {router.isReady ? (
          <WorkFilters
            onSubmit={handleFiltersChange}
            initialValues={initialFiltersPayload}
          />
        ) : (
          <>
            <Skeleton
              variant="rectangular"
              height={40}
              sx={{ mt: 2, mb: 1, display: "inline-block", width: "100%" }}
            />

            <Skeleton
              variant="rectangular"
              height={40}
              sx={{ mt: 2, mb: 1, display: "inline-block", width: "100%" }}
            />
          </>
        )}

        <WorkList workList={workList} loading={!router.isReady || isLoading} />

        {isValidating && (
          <Box display="flex" mt={3} justifyContent="center">
            <CircularProgress />
          </Box>
        )}
      </Container>
    </Box>
  );
}

InfinityScroll.Layout = MainLayout;

export async function getStaticProps() {
  console.log("get static props");

  return {
    props: {},
  };
}
