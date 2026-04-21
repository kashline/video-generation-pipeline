"use client";

import { motion } from "framer-motion";

const brollTiles = [
  { label: "Crowd at stadium", match: "98%" },
  { label: "City skyline dusk", match: "91%" },
  { label: "Press conference", match: "87%" },
  { label: "Data visualization", match: "82%" },
];

export function VideoVisual() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      {/* A-ROLL block */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-4"
      >
        <div className="relative h-20 w-12 shrink-0 overflow-hidden rounded-lg border border-red-200 bg-neutral-900">
          {/* Avatar placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-red-300/40 border border-red-300/60" />
          </div>
          <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div>
          <div className="text-xs font-bold text-red-700 mb-1">A-ROLL — HeyGen Avatar</div>
          <div className="text-[11px] text-neutral-600">Presigned audio URL sent to HeyGen API. Polls until render completes. Downloaded → S3.</div>
        </div>
      </motion.div>

      {/* B-ROLL block */}
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-2 text-xs font-bold text-neutral-500 uppercase tracking-wider px-1"
        >
          B-ROLL — Pexels · embedding-ranked
        </motion.div>
        <div className="grid grid-cols-2 gap-2">
          {brollTiles.map((tile, i) => (
            <motion.div
              key={tile.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="rounded-xl border border-neutral-200 bg-white p-3 shadow-sm"
            >
              <div className="mb-1.5 h-12 w-full rounded-lg bg-neutral-100 flex items-center justify-center">
                <div className="h-5 w-5 rounded bg-neutral-300" />
              </div>
              <div className="text-[10px] font-medium text-neutral-700">{tile.label}</div>
              <div className="mt-0.5 flex items-center gap-1">
                <div className="h-1 flex-1 rounded-full bg-neutral-100 overflow-hidden">
                  <div className="h-full rounded-full bg-red-400" style={{ width: tile.match }} />
                </div>
                <span className="text-[9px] text-neutral-400">{tile.match}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
