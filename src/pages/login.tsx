import * as React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
export default function LoginPage () {
  const router = useRouter();
  const {profile, login, logout} = useAuth({
    revalidateOnMount: false
  });
    async function handleLoginClick() {
      try{
        await login()
        console.log('redirect to dashboard');
        router.push("/about")
      }catch(error){
        console.log('failed to login', error);
      }
    }
    // async function handleGetProfileClick() {
    //   try{
    //     await profile
    //   }catch(error){
    //     console.log('failed to get profile', error);
    //   }
    // }
    async function handleLogoutClick() {
      try{
        await logout()
        console.log('redirect to login page')

      }catch(error){
        console.log('failed to logout', error);
      }
    }
        
    
  return (
    <div>
        <h1>Login Page</h1>
      <button onClick={handleLoginClick}>Login</button>
      {/* <button onClick={handleGetProfileClick}>Get Profile</button> */}
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}
