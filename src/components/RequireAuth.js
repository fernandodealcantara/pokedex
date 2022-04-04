import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'

export default function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user && user !== false) {
    return <h4>Carregando...</h4>
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
