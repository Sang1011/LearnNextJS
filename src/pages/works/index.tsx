import { ListParams, WorkFiltersPayload } from "@/models";
import { WorkFilters } from "@/src/components/work/work-filters";
import WorkList from "@/src/components/work/work-list";
import {
  Box,
  Button,
  Container,
  Pagination,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MainLayout } from "../../components/layout";
import { useAuth, useWorkList } from "@/hooks";

export interface WorksPageProps {}

export default function WorksPage(props: WorksPageProps) {
  const router = useRouter();
  const {isLoggedIn} = useAuth();

  const filters: Partial<ListParams> = {
    _page: 1,
    _limit: 3,
    ...router.query,
  };

  const initialFiltersPayload: WorkFiltersPayload = {
    search: filters.title_like || "",
    selectedTagList: filters.tagList_like?.split("|") || [],
    tagList_like: filters.tagList_like || ""
  };

  const { data, isLoading } = useWorkList({
    params: filters,
    enabled: router.isReady,
  });

  const { _limit, _totalRows, _page } = data?.pagination || {};
  const totalPages = Boolean(_totalRows) ? Math.ceil(_totalRows / _limit) : 0;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...filters,
          _page: value,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  function handleFiltersChange(newFilters: WorkFiltersPayload) {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...filters,
          _page: 1,
          title_like: newFilters.search,
          tagList_like: newFilters.tagList_like
        },
      },
      undefined,
      { shallow: true }
    );
  }

  const handleClick = async () => {
    await router.push("/works/add");
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Box>
      <Container>
        <Stack mb={4} mt={8} direction="row" alignItems="center" justifyContent="space-between">
          <Typography component="h1" variant="h3" fontWeight="bold">
            Work
          </Typography>
          {isClient && isLoggedIn && (
          <Button variant="contained" onClick={handleClick}>Add new work</Button>
          )}
        </Stack>

        {router.isReady ? (
          <WorkFilters
            onSubmit={handleFiltersChange}
            initialValues={initialFiltersPayload}
          />
        ) : (
          <>
          <Skeleton variant="rectangular" 
          height={40} 
          sx={{ mt: 2, mb: 1, display: "inline-block", width: "100%" }} />

          <Skeleton variant="rectangular" 
          height={40} 
          sx={{ mt: 2, mb: 1, display: "inline-block", width: "100%" }} />
        </>
        )}

        <WorkList
          workList={data?.data || []}
          loading={!router.isReady || isLoading}
        />

        {totalPages > 0 && (
          <Stack alignItems="center" mt={2}>
            <Pagination
              count={totalPages}
              page={_page}
              onChange={handlePageChange}
            ></Pagination>
          </Stack>
        )}
      </Container>
    </Box>
  );
}

WorksPage.Layout = MainLayout;
WorksPage.requireLogin = true
