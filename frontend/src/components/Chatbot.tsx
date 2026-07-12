import { useState } from "react";
import api from "../api/client";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;
    const userMsg: Msg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await api.post("/chat", {
        message: input,
        history: messages,
      });
      setMessages([...newMessages, { role: "assistant", content: res.data.reply }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Hubo un error, intentá de nuevo." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-20">
      {open ? (
        <div className="w-[calc(100vw-2rem)] max-w-[280px] sm:max-w-none sm:w-96 h-[70vh] max-h-[420px] sm:h-[500px] bg-white rounded-2xl shadow-xl flex flex-col border">
          <div className="bg-amber-600 text-white px-4 py-3 rounded-t-2xl flex justify-between items-center shrink-0">
            <span className="font-medium text-sm">Asistente Gigmora</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.length === 0 && (
              <p className="text-xs text-slate-400">Contame qué necesitás y te recomiendo servicios.</p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm px-3 py-2 rounded-lg max-w-[85%] ${
                  m.role === "user" ? "bg-amber-100 ml-auto" : "bg-slate-100"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && <p className="text-xs text-slate-400">Escribiendo...</p>}
          </div>
          <div className="p-2 border-t flex gap-2 shrink-0">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Escribí tu mensaje..."
              className="flex-1 text-sm px-3 py-2 border rounded-lg focus:outline-none min-w-0"
            />
            <button onClick={send} className="bg-amber-600 text-white px-3 rounded-lg text-sm shrink-0">
              Enviar
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-amber-600 text-white w-14 h-14 rounded-full shadow-lg text-2xl"
        >
          💬
        </button>
      )}
    </div>
  );
}