
import { Box, Container, Link as MuiLink, Stack } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { ROUTE_LIST } from "./routes";
import React from "react";
import {useAuth} from "@/hooks";

export interface HeaderDesktopProps {}

export default function HeaderDesktop(props: HeaderDesktopProps) {
  const router = useRouter();
  const { profile, logout } = useAuth();
  const isLoggedIn = Boolean(profile);
  // const [routeList, setRouteList] = useState(() => ROUTE_LIST.filter(
  //   (route) => !route.requireLogin))
  const routeList = ROUTE_LIST.filter(
    (route) => !route.requireLogin || isLoggedIn
  );

  // server render menu not require login (A)
  // client - first render menu not require login (B)
  // client - useEffect render second time menu render

  // useEffect(() => {
  //   setRouteList(ROUTE_LIST.filter(
  //     (route) => !route.requireLogin || isLoggedIn))
  // }, [isLoggedIn])

  return (
    <Box display={{ xs: "none", md: "block" }} py={2}>
      <Container>
        <Stack direction="row" justifyContent="flex-end">
          {routeList.map((route) => (
            <Link
              key={route.path}
              style={{ textDecoration: "none" }}
              href={route.path}
              passHref
            >
              <MuiLink
                sx={{ ml: 3, fontWeight: "medium" }}
                component="p"
                className={clsx({ active: router.pathname === route.path })}
              >
                {route.label}
              </MuiLink>
            </Link>
          ))}
          {!isLoggedIn && (
            <Link href="/login" style={{ textDecoration: "none" }} passHref>
              <MuiLink component="p" sx={{ ml: 3, fontWeight: "medium" }}>
                Login
              </MuiLink>
            </Link>
          )}

          {isLoggedIn && (
            <MuiLink sx={{ ml: 3, fontWeight: "medium" }} onClick={logout}>
              Logout
            </MuiLink>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
