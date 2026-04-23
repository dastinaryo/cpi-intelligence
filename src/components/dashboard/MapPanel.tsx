import { useState } from "react";
import { Bot, Send, Sparkles, Trash2, X } from "lucide-react";
import MapDashboard from "@/components/MapDashboard";
import { cn } from "@/lib/utils";

const TABS = ["Mitra", "Pelanggan"] as const;
type Tab = (typeof TABS)[number];

const MapPanel = () => {
  const [tab, setTab] = useState<Tab>("Mitra");
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hi! Saya AI Assistant. Tanyakan apa saja tentang data pada peta." },
  ]);

  const initialMessages = [
    { role: "ai" as const, text: "Hi! Saya AI Assistant. Tanyakan apa saja tentang data pada peta." },
  ];

  const clearChat = () => setMessages(initialMessages);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [
      ...m,
      { role: "user", text },
      { role: "ai", text: "Terima kasih, saya sedang memproses pertanyaan Anda…" },
    ]);
    setInput("");
  };

  return (
    <div className="relative h-full min-h-[360px] w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <MapDashboard />

      {/* Top-left tabs (offset to clear the map navigation control) */}
      <div className="pointer-events-none absolute left-24 top-4 z-10 flex gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "pointer-events-auto rounded-md border px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur transition-colors",
              tab === t
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card/95 text-foreground hover:bg-accent",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Top-right AI Assistant */}
      <div className="pointer-events-none absolute right-4 top-4 z-30">
        <button
          type="button"
          onClick={() => setChatOpen((v) => !v)}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-md border border-border bg-card/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur hover:bg-accent"
        >
          <Bot className="h-3.5 w-3.5 text-primary" />
          AI Assistant
        </button>
      </div>

      {/* Floating AI Assistant chat */}
      {chatOpen && (
        <div className="pointer-events-auto absolute right-4 top-16 bottom-4 z-30 flex w-[340px] max-w-[calc(100%-2rem)] flex-col overflow-hidden rounded-xl border border-border bg-card/95 shadow-xl backdrop-blur">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm font-semibold text-foreground">AI Assistant</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={clearChat}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
                aria-label="Clear chat"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear
              </button>
              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto p-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground",
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2 border-t border-border p-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanyakan sesuatu…"
              className="flex-1 rounded-md border border-border bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground hover:opacity-90"
              aria-label="Send"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MapPanel;