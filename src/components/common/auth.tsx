/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/hooks/use-auth";
import { encodeUrl } from "@/utils";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export interface AuthProps {
  children: any;
  requireLogin?: boolean;
}

export default function Auth({ children, requireLogin = false }: AuthProps) {
  const router = useRouter();

  const { profile, firstLoading } = useAuth();

  useEffect(() => {
    if (!requireLogin) return;
  
    if (firstLoading) return; // Chờ cho đến khi dữ liệu được tải xong
  
    if (!profile?.username) {
      router.replace(`/login?back_to=${encodeUrl(router.asPath)}`);
    }
  }, [router, profile, firstLoading, requireLogin]);
  

  if (requireLogin && !profile?.username) return <p>Loading...</p>;

  return <div>{children}</div>;
}
