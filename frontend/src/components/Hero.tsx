import { useEffect, useState } from "react";

const words = ["diseño", "desarrollo", "marketing", "escritura", "pixelart"];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-b-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="relative flex flex-col-reverse sm:flex-row items-center max-w-6xl mx-auto px-4 py-12 sm:py-20 gap-8">
        {/* Text column */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
            Encontrá freelancers de
            <br />
            <span className="inline-block min-w-[180px] sm:min-w-[280px] text-yellow-200">
              {words[index]}
            </span>
          </h1>
          <p className="text-slate-300 mt-4 text-sm sm:text-base max-w-md mx-auto sm:mx-0">
            Proveedores verificados, listos para tu próximo proyecto.
          </p>
          <button
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-block mt-6 bg-amber-500 text-slate-900 font-medium px-6 py-3 rounded-lg hover:bg-amber-400 transition"
          >
            Explorar servicios
          </button>
        </div>

        {/* Video column */}
        <div className="flex-1 w-full">
          <video
            src="/hero-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="rounded-2xl w-full h-56 sm:h-80 object-cover shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}