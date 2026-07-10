import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/client";
import type { Service } from "../types";
import { useAuth } from "../context/AuthContext";

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/services/${id}`).then((res) => setService(res.data)).finally(() => setLoading(false));
  }, [id]);

  async function handleOrder() {
    if (!user) {
      navigate("/login");
      return;
    }
    setOrdering(true);
    setMessage("");
    try {
      await api.post("/orders", { serviceId: id });
      setMessage("¡Orden creada! Podés verla en 'Mis órdenes'.");
    } catch (err: any) {
      setMessage(err.response?.data?.error || "No se pudo crear la orden");
    } finally {
      setOrdering(false);
    }
  }

  if (loading) return <p className="text-center mt-10 text-slate-400">Cargando...</p>;
  if (!service) return <p className="text-center mt-10 text-slate-400">Servicio no encontrado.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
        {service.category.name}
      </span>
      <h1 className="text-3xl font-bold text-slate-800 mt-4">{service.title}</h1>
      <p className="text-slate-500 mt-2">Por {service.provider.name}</p>
      <p className="text-slate-700 mt-6 leading-relaxed">{service.description}</p>

      <div className="mt-8 bg-white border rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-slate-800">${service.price}</p>
          <p className="text-sm text-slate-400">Entrega en {service.deliveryDays} días</p>
        </div>
        <button
          onClick={handleOrder}
          disabled={ordering}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          {ordering ? "Procesando..." : "Contratar"}
        </button>
      </div>
      {message && <p className="mt-4 text-sm text-slate-600">{message}</p>}
    </div>
  );
}