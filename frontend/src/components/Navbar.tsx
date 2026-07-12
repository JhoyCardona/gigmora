import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function handleLogout() {
    logout();
    setOpen(false);
    navigate("/");
  }

  function go(path: string) {
    setOpen(false);
    navigate(path);
  }

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-amber-600">
          Gigmora
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-4">
          {user ? (
            <>
              <Link to="/orders" className="text-sm text-slate-600 hover:text-amber-600">
                Mis órdenes
              </Link>
              {user.isProvider && (
                <Link to="/my-services" className="text-sm text-slate-600 hover:text-amber-600">
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
              <Link to="/login" className="text-sm text-slate-600 hover:text-amber-600">
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="text-sm bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger button */}
        <button
          className="sm:hidden text-slate-600 text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {open && (
        <div className="sm:hidden border-t border-slate-100 px-4 py-3 flex flex-col gap-3">
          {user ? (
            <>
              <span className="text-sm text-slate-400">Hola, {user.name}</span>
              <button onClick={() => go("/orders")} className="text-sm text-slate-600 text-left">
                Mis órdenes
              </button>
              {user.isProvider && (
                <button onClick={() => go("/my-services")} className="text-sm text-slate-600 text-left">
                  Mis servicios
                </button>
              )}
              <button onClick={handleLogout} className="text-sm text-red-500 text-left">
                Salir
              </button>
            </>
          ) : (
            <>
              <button onClick={() => go("/login")} className="text-sm text-slate-600 text-left">
                Iniciar sesión
              </button>
              <button
                onClick={() => go("/register")}
                className="text-sm bg-amber-600 text-white px-4 py-2 rounded-lg text-left"
              >
                Registrarse
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}