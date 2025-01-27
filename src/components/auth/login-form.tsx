/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginPayload } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, CircularProgress, IconButton, InputAdornment } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { InputField } from "../form";
export interface LoginFormProps {
  onSubmit?: (payload: LoginPayload) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
    const schema = yup.object().shape({
        username: yup.string().required("Please enter username").min(4, "Username is required to hava at least 4 characters"),
        password: yup.string().required("Please enter password")
        .min(4, "Password is required to hava at least 4 characters"),
    })
    const { control, handleSubmit, formState: {isSubmitting} } = useForm<LoginPayload>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema)
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  async function handleLoginSubmit(payload: LoginPayload) {
    await onSubmit?.(payload);
  }

  return (
    <Box component="form" onSubmit={(e) => {
      e.preventDefault(); 
      handleSubmit(handleLoginSubmit)(e);
    }}>
    
      <InputField label="Username" name="username" control={control} />
      <InputField
        type={showPassword ? "text" : "password"}
        label="Password"
        name="password"
        control={control}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? "hide password" : "show password"}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <br />
      <Button
        disabled={isSubmitting} startIcon={isSubmitting ? <CircularProgress color="inherit" size="1rem" /> : null}
      fullWidth sx={{mt: 3}}
        variant="contained"
        type="submit"
      >
        Login
      </Button>
    </Box>
  );
}
