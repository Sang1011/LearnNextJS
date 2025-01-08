import { LayoutProps } from "@/models";
import Link from "next/link";
import Auth from "../common/auth";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/router";

export function AdminLayout({ children }: LayoutProps) {
  const {logout, profile} = useAuth();
  const router = useRouter();
  async function handleLogoutClick() {
    try{
      await logout();
      console.log("redirect to login page");
      router.push("/login")
    }catch (error){
      console.log('failed to logout', error);
    }
  }
  return (
    <>
      <Auth>
          <h1>Admin Layout</h1>
          <div>Sidebar</div>

         <p>Profile: {JSON.stringify(profile)}</p>


          <button onClick={handleLogoutClick}>Logout</button>
          <Link href="/">
          </Link>
          <Link href="/about">
          </Link>
          <div>{children}</div>
      </Auth>
    </>
  );
}
