import { useEffect, useState } from "react";
import api from "../api/client";
import type { Service, Category } from "../types";
import ServiceCard from "../components/ServiceCard";
import Hero from "../components/Hero";
import CategoryFilter from "../components/CategoryFilter";
import About from "../components/About";

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = selected ? { category: selected } : {};
    api
      .get("/services", { params })
      .then((res) => setServices(res.data))
      .finally(() => setLoading(false));
  }, [selected]);

  return (
    <div>
      <Hero />
      <About />
      <div className="mt-8" id="services">
        <CategoryFilter categories={categories} selected={selected} onSelect={setSelected} />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {loading ? (
          <p className="text-slate-400">Cargando...</p>
        ) : services.length === 0 ? (
          <p className="text-slate-400">No hay servicios en esta categoría.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}