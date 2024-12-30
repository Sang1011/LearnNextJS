import { LayoutProps } from "@/models";
import Link from "next/link";
import { useEffect } from "react";

export function MainLayout({children}: LayoutProps){
    useEffect(() => {
        console.log("Mainlayout Mounting");

        return () => console.log("Mainlayout UnMounting");
    }, [])
    return (
        <>
        <div>
            <h1>Main Layout</h1>

            <Link href="/">
            <h5>Home</h5>
            </Link>
            <Link href="/about"><h5>About</h5></Link>
            <div>{children}</div>
        </div>
        </>
    );
}