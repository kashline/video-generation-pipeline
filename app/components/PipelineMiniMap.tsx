"use client";

import { useEffect, useRef, useState } from "react";
import { SERVICES } from "@/lib/pipeline";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function PipelineMiniMap() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Show mini-map after the hero section passes
    const sentinel = document.getElementById("pipeline-map");
    if (!sentinel) return;

    const showObserver = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting || window.scrollY > 400),
      { threshold: 0 }
    );
    showObserver.observe(sentinel);

    // Highlight active chapter
    const observers: IntersectionObserver[] = SERVICES.map((s) => {
      const el = document.getElementById(`service-${s.id}`);
      if (!el) return null as unknown as IntersectionObserver;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(s.id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    }).filter(Boolean);

    return () => {
      showObserver.disconnect();
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  // Also show on scroll past hero
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 500) setVisible(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(`service-${id}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}
    >
      <div className="border-b border-neutral-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-2.5 md:px-10 no-scrollbar">
          <span className="mr-2 shrink-0 text-xs font-semibold text-neutral-400 uppercase tracking-wider hidden md:block">
            Pipeline
          </span>
          {SERVICES.map((s, i) => (
            <div key={s.id} className="flex shrink-0 items-center">
              <button
                onClick={() => scrollTo(s.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all",
                  activeId === s.id
                    ? "text-white shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
                )}
                style={
                  activeId === s.id
                    ? { backgroundColor: s.accentColor }
                    : {}
                }
              >
                <span className="hidden sm:inline-block h-4 w-4 rounded-full border-2 text-center leading-none text-[9px] font-bold"
                  style={activeId === s.id ? { borderColor: "rgba(255,255,255,0.5)", color: "rgba(255,255,255,0.8)" } : { borderColor: "currentColor" }}
                >
                  {s.step}
                </span>
                {s.name}
              </button>
              {i < SERVICES.length - 1 && (
                <ArrowRight className="mx-0.5 h-3 w-3 shrink-0 text-neutral-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
