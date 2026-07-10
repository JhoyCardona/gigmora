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
    <div className="fixed bottom-6 right-6 z-20">
      {open ? (
        <div className="w-80 h-96 bg-white rounded-2xl shadow-xl flex flex-col border">
          <div className="bg-indigo-600 text-white px-4 py-3 rounded-t-2xl flex justify-between items-center">
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
                  m.role === "user" ? "bg-indigo-100 ml-auto" : "bg-slate-100"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && <p className="text-xs text-slate-400">Escribiendo...</p>}
          </div>
          <div className="p-2 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Escribí tu mensaje..."
              className="flex-1 text-sm px-3 py-2 border rounded-lg focus:outline-none"
            />
            <button onClick={send} className="bg-indigo-600 text-white px-3 rounded-lg text-sm">
              Enviar
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 text-white w-14 h-14 rounded-full shadow-lg text-2xl"
        >
          💬
        </button>
      )}
    </div>
  );
}