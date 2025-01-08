import useSWR from "swr";
import { PublicConfiguration } from "swr/_internal";
import { authApi } from "@/api/index";

export function useAuth(options?: Partial<PublicConfiguration>) {
  // profile
  //
  const {
    data: profile,
    error,
    mutate,
  } = useSWR("/profile", {
    dedupingInterval: 60*60*1000,
    revalidateOnFocus: false,
    ...options,
  });

const firstLoading = profile === undefined && !error;

  async function login() {
    await authApi.login({
      username: "emilys",
      password: "emilyspass",
    });
    await mutate()
  }
  async function logout() {
    await authApi.logout()
    mutate(null, false)
  }

  return {
    profile,
    error,
    login,
    logout,
    firstLoading
  };
}
