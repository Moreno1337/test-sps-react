import React from "react";
import {
  Typography, Button,
  Container, Stack, Grid, Card, CardContent, CardActions
} from "@mui/material";

export default function Home() {
  const apiBase = process.env.REACT_APP_SERVER_URL || "http://localhost:3000";

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Typography variant="h4">Bem-vindo!</Typography>
        </Stack>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Documentação da API</Typography>
                <Typography variant="body2" color="text.secondary">
                  Consulte endpoints e schemas no Swagger.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  component="a"
                  href={`${apiBase}/docs`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir Swagger
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
