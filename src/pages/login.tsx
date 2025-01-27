import {useAuth} from "@/hooks";
import { LoginPayload } from "@/models";
import { decodeUrl, getErrorMessage } from "@/utils";
import { Box, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { LoginForm } from "../components/auth";
export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth({
    revalidateOnMount: false,
  });

  async function handleLoginSubmit(
    payload: LoginPayload,
    event?: React.BaseSyntheticEvent
  ) {
    try {
      event?.preventDefault();
      const backTo = router.query?.back_to ? decodeUrl(router.query?.back_to as string) : "/";
      await login(payload);
      router.push(backTo);
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      toast.error(message);
    }
  }

  return (
    <Box>
      <Paper
        elevation={4}
        sx={{ mt: 8, p: 4, maxWidth: "480px", mx: "auto", textAlign: "center" }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <LoginForm onSubmit={handleLoginSubmit} />
      </Paper>
    </Box>
  );
}
