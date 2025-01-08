import { Box, Container, Stack, Link as MuiLink } from '@mui/material';
import * as React from 'react';
import { ROUTE_LIST } from './routes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from "clsx";

export interface HeaderDesktopProps {}

export default function HeaderDesktop(props: HeaderDesktopProps) {
    const router = useRouter();

  return (
    <Box display={{ xs: 'none', md: 'block' }} py={2}>
      <Container>
        <Stack direction="row" justifyContent="flex-end">
          {ROUTE_LIST.map((route) => (
            <Link key={route.path} style={{textDecoration: 'none'}} href={route.path} passHref>
              <MuiLink sx={{ ml: 3 , fontWeight: 'medium'}} component="p" className=
              {clsx({active: router.pathname === route.path})}>
                {route.label}
              </MuiLink>
            </Link>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
