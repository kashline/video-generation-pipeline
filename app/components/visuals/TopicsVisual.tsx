"use client";

import { motion } from "framer-motion";

const cards = [
  { text: "Ace pitcher trade deadline deal", src: "Reddit", x: 0, y: 0, delay: 0 },
  { text: "Record high closes month strong", src: "NewsAPI", x: 60, y: -30, delay: 0.15 },
  { text: "New product launch goes viral", src: "Google Trends", x: -50, y: 30, delay: 0.3 },
  { text: "Championship race tightens", src: "Reddit", x: 30, y: 50, delay: 0.45 },
  { text: "Legislation passes Senate floor", src: "NewsAPI", x: -70, y: -20, delay: 0.6 },
];

export function TopicsVisual() {
  return (
    <div className="relative flex h-72 w-full max-w-sm items-center justify-center">
      {/* Center cluster bubble */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-indigo-300 bg-indigo-50 text-center shadow-lg"
      >
        <span className="text-xs font-bold text-indigo-700">Top Topic</span>
        <span className="text-[10px] text-indigo-400">clustered</span>
      </motion.div>

      {/* Floating news cards */}
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: card.x * 2, y: card.y * 2 }}
          animate={{ opacity: 1, x: card.x, y: card.y }}
          transition={{ duration: 0.7, delay: card.delay }}
          className="absolute rounded-lg border border-indigo-200 bg-white px-2.5 py-1.5 shadow-sm"
          style={{ fontSize: 10 }}
        >
          <div className="font-medium text-neutral-800 truncate max-w-[120px]">{card.text}</div>
          <div className="text-indigo-400">{card.src}</div>
        </motion.div>
      ))}

      {/* Lines from cards to center */}
      <svg className="absolute inset-0 h-full w-full pointer-events-none" style={{ overflow: "visible" }}>
        {cards.map((card, i) => (
          <motion.line
            key={i}
            x1="50%"
            y1="50%"
            x2={`calc(50% + ${card.x}px)`}
            y2={`calc(50% + ${card.y}px)`}
            stroke="#a5b4fc"
            strokeWidth={1}
            strokeDasharray="4 3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: card.delay + 0.3 }}
          />
        ))}
      </svg>
    </div>
  );
}
