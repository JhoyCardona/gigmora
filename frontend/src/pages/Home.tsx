import { useEffect, useState } from "react";
import api from "../api/client";
import type { Service } from "../types";
import ServiceCard from "../components/ServiceCard";

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/services")
      .then((res) => setServices(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Encontrá el servicio ideal</h1>
      <p className="text-slate-500 mb-8">Freelancers verificados, listos para tu próximo proyecto.</p>

      {loading ? (
        <p className="text-slate-400">Cargando...</p>
      ) : services.length === 0 ? (
        <p className="text-slate-400">Todavía no hay servicios publicados.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      )}
    </div>
  );
}