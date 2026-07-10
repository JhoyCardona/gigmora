import { useEffect, useState } from "react";
import api from "../api/client";
import type { Service, Category } from "../types";
import { useAuth } from "../context/AuthContext";

export default function MyServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();

  function load() {
    api.get("/services").then((res) => setServices(res.data));
    api.get("/categories").then((res) => setCategories(res.data));
  }

  useEffect(load, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await api.post("/services", {
        title,
        description,
        categoryId,
        price: Number(price),
        deliveryDays: Number(deliveryDays),
      });
      setShowForm(false);
      setTitle("");
      setDescription("");
      setCategoryId("");
      setPrice("");
      setDeliveryDays("");
      load();
    } catch (err: any) {
      setError(err.response?.data?.error || "No se pudo crear el servicio");
    }
  }

  async function handleDelete(id: string) {
    await api.delete(`/services/${id}`);
    load();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Mis servicios</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
        >
          {showForm ? "Cancelar" : "+ Nuevo servicio"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white border rounded-xl p-6 mb-6 space-y-3">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <input
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="">Elegí una categoría</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Precio"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            <input
              type="number"
              placeholder="Días de entrega"
              value={deliveryDays}
              onChange={(e) => setDeliveryDays(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700">
            Publicar
          </button>
        </form>
      )}

      <div className="space-y-3">
        {services.filter((s) => s.provider.id === user?.id).map((s) => (
          <div key={s.id} className="bg-white border rounded-xl p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-slate-800">{s.title}</h3>
              <p className="text-sm text-slate-500">${s.price} · {s.category.name}</p>
            </div>
            <button
              onClick={() => handleDelete(s.id)}
              className="text-sm text-red-500 hover:text-red-600"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}