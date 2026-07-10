import type { Service } from "../types";
import { Link } from "react-router-dom";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      to={`/services/${service.id}`}
      className="block bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 border border-slate-100"
    >
      <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
        {service.category.name}
      </span>
      <h3 className="text-lg font-semibold text-slate-800 mt-3">{service.title}</h3>
      <p className="text-sm text-slate-500 mt-1 line-clamp-2">{service.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-slate-400">Por {service.provider.name}</span>
        <span className="text-lg font-bold text-slate-800">${service.price}</span>
      </div>
    </Link>
  );
}