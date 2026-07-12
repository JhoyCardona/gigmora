export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
        <div className="col-span-2 sm:col-span-1">
          <span className="text-lg font-bold text-white">Gigmora</span>
          <p className="text-sm text-slate-400 mt-2">Conectamos freelancers con clientes en toda la región.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Plataforma</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Explorar servicios</li>
            <li>Ser proveedor</li>
            <li>Cómo funciona</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Soporte</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Centro de ayuda</li>
            <li>Contacto</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Términos</li>
            <li>Privacidad</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © 2026 Gigmora. Proyecto de portfolio.
      </div>
    </footer>
  );
}