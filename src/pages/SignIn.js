import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Collapse, Alert, Box, Button, TextField, Paper, Typography } from "@mui/material";
import AuthService from "../services/AuthService";

const schema = z.object({
  email: z.email(),
  password: z.string().min(5)
});

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [submitError, setSubmitError] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: zodResolver(schema), mode: "onTouched" });

  const onSubmit = async ({ email, password }) => {
    setSubmitError("");
    try {
      await AuthService.login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setSubmitError(err.message || "Erro ao autenticar");
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 360, mx: "auto", mt: 8 }}>
      <Typography variant="h6" mb={2}>Entrar</Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="E-mail"
          fullWidth
          sx={{ mb: 2 }}
          autoComplete="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          sx={{ mb: 2 }}
          autoComplete="current-password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button variant="contained" type="submit" fullWidth disabled={isSubmitting}>
          Entrar
        </Button>
        <Collapse in={!!submitError}>
          <Alert severity="error" sx={{ mt: 2 }} onClose={() => setSubmitError("")}>
            {submitError}
          </Alert>
        </Collapse>
      </Box>
    </Paper>
  );
}
