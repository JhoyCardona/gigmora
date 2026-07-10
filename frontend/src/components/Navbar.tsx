import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          Gigmora
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/orders" className="text-sm text-slate-600 hover:text-indigo-600">
                Mis órdenes
              </Link>
              {user.isProvider && (
                <Link to="/my-services" className="text-sm text-slate-600 hover:text-indigo-600">
                  Mis servicios
                </Link>
              )}
              <span className="text-sm text-slate-400">Hola, {user.name}</span>
              <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-600">
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-slate-600 hover:text-indigo-600">
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}