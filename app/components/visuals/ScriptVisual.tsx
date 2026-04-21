"use client";

import { motion } from "framer-motion";

const segments = [
  { type: "INTRO", text: "This week's story is moving fast, and here's why…", source: "A-ROLL", color: "#f59e0b" },
  { type: "B-ROLL", text: "Aerial crowd shot, stadium exterior at dusk…", source: "PEXELS", color: "#6366f1" },
  { type: "CONTENT", text: "The decision shifts the entire landscape heading into Q3…", source: "A-ROLL", color: "#f59e0b" },
  { type: "B-ROLL", text: "Close-up of data visualization, city skyline…", source: "PEXELS", color: "#6366f1" },
  { type: "OUTRO", text: "Stay tuned — more on this story as it develops.", source: "A-ROLL", color: "#f59e0b" },
];

export function ScriptVisual() {
  return (
    <div className="w-full max-w-sm space-y-2">
      {/* Outline header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700"
      >
        Phase 1 — Outline (Gemini 2.5 Pro)
      </motion.div>

      <div className="space-y-1.5">
        {segments.map((seg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.1 }}
            className="flex items-start gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-sm"
          >
            <span
              className="mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold text-white"
              style={{ backgroundColor: seg.color }}
            >
              {seg.type}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[11px] text-neutral-700">{seg.text}</p>
              <p className="text-[9px] text-neutral-400">{seg.source}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="rounded-lg border border-amber-100 bg-amber-50 px-3 py-1.5 text-[10px] text-amber-600"
      >
        Phase 2 — Segments (Gemini 2.5 Flash) · ~60s target
      </motion.div>
    </div>
  );
}
