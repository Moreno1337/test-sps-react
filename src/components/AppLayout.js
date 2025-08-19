import React from "react";
import { Outlet, Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import AuthService from "../services/AuthService";

export default function AppLayout() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>SPS Test</Typography>
          <Button color="inherit" component={RouterLink} to="/">Home</Button>
          <Button color="inherit" component={RouterLink} to="/users">Usuários</Button>
          <Button color="inherit" onClick={AuthService.logout}>Sair</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}
