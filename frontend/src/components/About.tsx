export default function About() {
  return (
    <div className="bg-slate-50 px-4 py-12 text-center">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
        Conectamos talento con oportunidades
      </h2>
      <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Gigmora es el lugar donde freelancers de diseño, desarrollo, marketing, escritura y
        animación muestran su trabajo, y donde los clientes encuentran exactamente lo que
        necesitan sin vueltas ni intermediarios. Cada proveedor construye su reputación con
        reseñas reales de proyectos completados, así que siempre sabés con quién estás
        trabajando. Nuestro asistente con inteligencia artificial te ayuda a encontrar el
        servicio ideal con solo contarle qué necesitás, sin perder tiempo navegando categorías.
        Desde la búsqueda hasta la entrega final, todo el proceso queda registrado y accesible
        en un mismo lugar.
      </p>

      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mt-8">
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