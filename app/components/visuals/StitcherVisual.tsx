"use client";

import { motion } from "framer-motion";

const lanes = [
  { label: "Video", color: "#0066ff", segments: [1, 0, 1, 0, 1] },
  { label: "Audio", color: "#10b981", segments: [1, 1, 1, 1, 1] },
  { label: "Subtitles", color: "#f59e0b", segments: [1, 1, 1, 1, 1] },
  { label: "HUD", color: "#6366f1", segments: [1, 1, 1, 1, 1] },
];

export function StitcherVisual() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      {/* Phone frame */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-28 overflow-hidden rounded-[18px] border-2 border-neutral-800 bg-neutral-950 shadow-xl"
          style={{ height: 198 }}
        >
          {/* Screen content */}
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 to-neutral-950 flex flex-col justify-between p-2">
            {/* Top HUD */}
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-bold text-white tracking-widest">CH</span>
              <span className="text-[7px] text-white/40">LIVE</span>
            </div>
            {/* Subtitles */}
            <div className="rounded bg-black/60 px-1 py-0.5 text-center">
              <span className="text-[8px] font-medium text-white">Story breaks now</span>
            </div>
            {/* Ticker */}
            <div className="bg-blue-600/80 rounded px-1 py-0.5">
              <span className="text-[7px] text-white font-mono">BREAKING · LIVE UPDATE</span>
            </div>
          </div>
          {/* Notch */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 h-1.5 w-8 rounded-full bg-black" />
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-4">
        <div className="mb-3 text-xs font-semibold text-neutral-500">Remotion Lambda timeline</div>
        <div className="space-y-2">
          {lanes.map((lane, li) => (
            <div key={lane.label} className="flex items-center gap-2">
              <span className="w-14 shrink-0 text-[10px] text-neutral-400">{lane.label}</span>
              <div className="flex flex-1 gap-0.5">
                {lane.segments.map((active, si) => (
                  <motion.div
                    key={si}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: active ? 1 : 0.3, opacity: active ? 1 : 0.3 }}
                    transition={{ delay: 0.2 + li * 0.1 + si * 0.05, duration: 0.3 }}
                    className="flex-1 rounded-sm"
                    style={{
                      height: 10,
                      backgroundColor: active ? lane.color : "#e5e5e5",
                      transformOrigin: "left",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between text-[9px] text-neutral-400">
          <span>0s</span><span>15s</span><span>30s</span><span>45s</span><span>60s</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-700"
      >
        1080×1920 · 30fps · portrait · persisted to Postgres
      </motion.div>
    </div>
  );
}
