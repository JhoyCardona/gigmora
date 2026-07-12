import type { Service } from "../types";
import { Link } from "react-router-dom";

const categoryColors: Record<string, string> = {
  "Diseño": "bg-stone-200 text-stone-700",
  "Desarrollo": "bg-slate-200 text-slate-700",
  "Marketing": "bg-amber-100 text-amber-800",
  "Escritura": "bg-orange-100 text-orange-800",
  "Video y Animación": "bg-neutral-200 text-neutral-700",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ServiceCard({ service }: { service: Service }) {
  const colorClass = categoryColors[service.category.name] || "bg-slate-100 text-slate-700";

  return (
    <Link
      to={`/services/${service.id}`}
      className="block bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-slate-100 overflow-hidden"
    >
      <div className={`h-24 flex items-center justify-center ${colorClass}`}>
        <span className="text-sm font-medium">{service.category.name}</span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-800">{service.title}</h3>
        <p className="text-sm text-slate-500 mt-1 line-clamp-2">{service.description}</p>

        {service.avgRating !== null ? (
          <div className="flex items-center gap-1 mt-2">
            <span className="text-amber-500 text-sm">★</span>
            <span className="text-sm font-medium text-slate-700">{service.avgRating.toFixed(1)}</span>
            <span className="text-xs text-slate-400">({service.reviewCount})</span>
          </div>
        ) : (
          <p className="text-xs text-slate-400 mt-2">Sin reseñas aún</p>
        )}

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-ambar-100 text-ambar-700 text-xs font-medium flex items-center justify-center">
              {initials(service.provider.name)}
            </div>
            <span className="text-sm text-slate-400">{service.provider.name}</span>
          </div>
          <span className="text-lg font-bold text-slate-800">${service.price}</span>
        </div>
      </div>
    </Link>
  );
}