import { useEffect, useState } from "react";
import api from "../api/client";
import type { Order } from "../types";

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    api.get("/orders").then((res) => setOrders(res.data)).finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function updateStatus(orderId: string, status: string) {
    await api.patch(`/orders/${orderId}/status`, { status });
    load();
  }

  const statusLabels: Record<string, string> = {
    PENDING: "Pendiente",
    ACCEPTED: "Aceptada",
    IN_PROGRESS: "En progreso",
    DELIVERED: "Entregada",
    COMPLETED: "Completada",
    CANCELLED: "Cancelada",
  };

  if (loading) return <p className="text-center mt-10 text-slate-400">Cargando...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Mis órdenes</h1>
      {orders.length === 0 ? (
        <p className="text-slate-400">Todavía no tenés órdenes.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="bg-white border rounded-xl p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-slate-800">{o.service.title}</h3>
                  <p className="text-sm text-slate-500">Cliente: {o.client.name}</p>
                  <p className="text-sm text-slate-500">Proveedor: {o.service.provider.name}</p>
                </div>
                <span className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                  {statusLabels[o.status] || o.status}
                </span>
              </div>
              <div className="flex gap-2 mt-4">
                {["ACCEPTED", "IN_PROGRESS", "DELIVERED", "COMPLETED", "CANCELLED"].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(o.id, s)}
                    className="text-xs px-3 py-1 border rounded-full text-slate-600 hover:bg-slate-50"
                  >
                    {statusLabels[s]}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}