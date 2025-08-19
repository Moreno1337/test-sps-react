import * as React from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Paper, Stack, Typography, TextField, MenuItem,
  Button, Alert, Collapse
} from "@mui/material";
import UserService from "../services/UserService";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.email("E-mail inválido"),
  type: z.enum(["admin", "user"], { errorMap: () => ({ message: "Selecione um tipo" }) }),
  password: z.string().min(5, "Senha deve ter ao menos 6 caracteres"),
});

export default function UserCreate() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", type: "user", password: "" },
  });

  const onSubmit = async (values) => {
    try {
      await UserService.create(values); // POST /users
      navigate("/users", { replace: true });
    } catch (e) {
      setError("root", { type: "server", message: e.message || "Falha ao criar usuário" });
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Novo usuário</Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2} maxWidth={560}>
          <TextField
            label="Nome"
            fullWidth
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="E-mail"
            type="email"
            autoComplete="email"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            select
            label="Tipo"
            fullWidth
            {...register("type")}
            error={!!errors.type}
            helperText={errors.type?.message}
          >
            <MenuItem value="user">Usuário</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
          <TextField
            label="Senha"
            type="password"
            autoComplete="new-password"
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button variant="text" onClick={() => navigate("/users")}>Cancelar</Button>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              Salvar
            </Button>
          </Stack>

          <Collapse in={!!errors.root?.message}>
            <Alert severity="error" onClose={() => clearErrors("root")}>
              {errors.root?.message}
            </Alert>
          </Collapse>
        </Stack>
      </form>
    </Paper>
  );
}
