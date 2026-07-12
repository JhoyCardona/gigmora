export default function TrustBar() {
  return (
    <div className="bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-slate-800">150+</p>
          <p className="text-xs text-slate-500">Freelancers</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-800">300+</p>
          <p className="text-xs text-slate-500">Servicios activos</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-800">4.8 ★</p>
          <p className="text-xs text-slate-500">Calificación promedio</p>
        </div>
      </div>
    </div>
  );
}