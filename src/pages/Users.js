import * as React from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import {
  Paper, Stack, Typography, IconButton, Tooltip, Alert,
  Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Users() {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [target, setTarget] = React.useState(null);

  const loadUsers = React.useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await UserService.list(); // GET /users
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Falha ao carregar usuários");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { loadUsers(); }, [loadUsers]);

  const askDelete = (row) => {
    setTarget(row);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!target) return;
    setDeleting(true);
    try {
      await UserService.delete(target.id); // DELETE /users/:id
      await loadUsers();
      setConfirmOpen(false);
      setTarget(null);
    } catch (e) {
      setError(e.message || "Falha ao excluir usuário");
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    { field: "name", headerName: "Nome", flex: 1, minWidth: 160 },
    { field: "email", headerName: "E-mail", flex: 1, minWidth: 200 },
    { field: "type", headerName: "Tipo", width: 120 },
    {
      field: "actions",
      headerName: "Ações",
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Editar">
            <IconButton size="small" onClick={(e) => { e.stopPropagation(); navigate(`/users/${params.row.id}`); }}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir">
            <IconButton size="small" color="error" onClick={(e) => { e.stopPropagation(); askDelete(params.row); }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5">Usuários</Typography>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Novo usuário">
            <IconButton color="primary" onClick={() => navigate("/users/new")}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Recarregar">
            <IconButton onClick={loadUsers}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <div style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(r) => r.id}
          loading={loading}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          disableRowSelectionOnClick
        />
      </div>

      <Dialog
        open={confirmOpen}
        onClose={() => (!deleting && setConfirmOpen(false))}
        aria-labelledby="confirm-delete-title">
        <DialogTitle id="confirm-delete-title">Excluir usuário</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir
            {" "}
            <strong>{target?.name || target?.email}</strong>?
            Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={deleting} onClick={() => setConfirmOpen(false)}>Cancelar</Button>
          <Button
            variant="contained"
            color="error"
            disabled={deleting}
            onClick={handleDelete}
          >
            {deleting ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
