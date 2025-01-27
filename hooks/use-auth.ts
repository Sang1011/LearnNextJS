import useSWR from "swr";
import { SWRConfiguration } from 'swr/_internal'
import { authApi } from "@/api/index";
import { LoginPayload, UserProfile } from "@/models";
import { StorageKeys } from "@/constants";

function getUserInfo(): UserProfile | null {
  try{
    return JSON.parse(localStorage.getItem(StorageKeys.USER_INFO) || "")
  }catch(error){
    // console.log("failed to parse user info from local storage", error);
    return null
  }
}

export function useAuth(options?: Partial<SWRConfiguration>) {
  // profile
  //
  const {
    data: profile,
    error,
    mutate,
  } = useSWR<UserProfile| null>("/profile", {
    dedupingInterval: 60*60*1000,
    revalidateOnFocus: false,
    ...options,
    fallbackData: getUserInfo(),
    onSuccess(data) {
      localStorage.setItem(StorageKeys.USER_INFO, JSON.stringify(data))  
    },
    onError(err) {
      console.log(err);
      logout()
    }
  });
const firstLoading = profile === undefined && !error;

  async function login(payload: LoginPayload) {
    await authApi.login(payload);
    await mutate()
  }
  async function logout() {
    await authApi.logout()
    mutate(null, false)
    localStorage.removeItem(StorageKeys.USER_INFO)
  }

  return {
    profile,
    error,
    login,
    logout,
    firstLoading,
    isLoggedIn: Boolean(profile)
  };
}
