/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/router";
import React, {useEffect} from "react";

export interface AuthProps {
  children: any;
}

export default function Auth({ children }: AuthProps) {
    const router = useRouter();
    
    const {profile, firstLoading} = useAuth();
    console.log("profile", profile?.data?.data.username)

    useEffect(() => {
        if(!firstLoading && !profile?.data?.data.username) router.push('/login')
    }, [router, profile, firstLoading])

    if(!profile?.data?.data.username) return <p>Loading...</p>

  return <div>{children}</div>;
}
