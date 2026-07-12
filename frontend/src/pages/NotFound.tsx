import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-6xl font-bold text-amber-600">404</p>
      <h1 className="text-xl font-semibold text-slate-800 mt-4">Página no encontrada</h1>
      <p className="text-slate-500 mt-2">La página que buscás no existe o fue movida.</p>
      <Link to="/" className="mt-6 bg-amber-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-amber-700">
        Volver al inicio
      </Link>
    </div>
  );
}