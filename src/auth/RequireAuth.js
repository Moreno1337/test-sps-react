import { Navigate, useLocation } from "react-router-dom";
import AuthService from "../services/AuthService"

function decodeJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function isTokenExpired(token, margin = 30) {
  const payload = decodeJwt(token);
  if (!payload || typeof payload.exp !== 'number') return true;
  const now = Math.floor(Date.now() / 1000);
  return now >= (payload.exp - margin);
}

export default function RequireAuth({ children }) {
  const token = AuthService.getToken();
  const location = useLocation();
  if (!token || isTokenExpired(token)) {
    AuthService.logout();
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}