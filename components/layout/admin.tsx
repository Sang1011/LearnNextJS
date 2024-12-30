import { LayoutProps } from "@/models";
import Link from "next/link";

export function AdminLayout({children}: LayoutProps){
    return (
        <>
        <div>
            <h1>Admin Layout</h1>
            <div>Sidebar</div>

            <Link href="/">
            <h5>Home</h5>
            </Link>
            <Link href="/about"><h5>About</h5></Link>
            <div>{children}</div>
        </div>
        </>
    );
}