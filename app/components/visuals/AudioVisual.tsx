"use client";

import { motion } from "framer-motion";

const bars = [3, 6, 9, 7, 5, 8, 11, 9, 6, 8, 10, 7, 5, 8, 9, 6, 4, 7, 10, 8, 6, 9, 7, 5, 8];

export function AudioVisual() {
  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-6">
      {/* Waveform */}
      <div className="w-full rounded-2xl border border-green-200 bg-green-50 p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-green-700">ElevenLabs Turbo v2.5</span>
          <span className="rounded-full border border-green-300 bg-white px-2 py-0.5 text-[10px] font-bold text-green-600">
            1.25× speed
          </span>
        </div>
        <div className="flex h-14 items-center justify-center gap-0.5">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="w-1.5 rounded-full bg-green-400"
              initial={{ scaleY: 0.2 }}
              animate={{ scaleY: [0.2, 1, 0.5, 0.8, 0.3, 1, 0.6] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: i * 0.04,
                ease: "easeInOut",
              }}
              style={{ height: h * 4, transformOrigin: "center" }}
            />
          ))}
        </div>
        <div className="mt-3 flex justify-between text-[10px] text-green-500">
          <span>0:00</span>
          <span className="font-medium text-green-700">▶ playing</span>
          <span>0:12</span>
        </div>
      </div>

      {/* Pipeline steps */}
      <div className="w-full space-y-2">
        {[
          { label: "TTS generation", detail: "ElevenLabs API → MP3" },
          { label: "Speed adjustment", detail: "ffmpeg 1.25× · setpts filter" },
          { label: "Upload", detail: "S3 → ainews-audio bucket" },
        ].map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.12 }}
            className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-3 py-2"
          >
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-[10px] font-bold text-green-700">
              {i + 1}
            </div>
            <div>
              <div className="text-xs font-medium text-neutral-800">{step.label}</div>
              <div className="text-[10px] text-neutral-400">{step.detail}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
