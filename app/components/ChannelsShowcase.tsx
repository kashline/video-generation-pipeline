"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Container } from "./Container";
import { Section } from "./Section";
import { Badge } from "./Badge";

const channels = [
  {
    name: "Financial News Daily",
    anchor: "Scribus Mungus",
    tone: "Professional · measured",
    cadence: "Daily",
    accentColor: "#0066ff",
    bgColor: "#e8f0ff",
    borderColor: "#bfdbfe",
    topics: [
      "Fed raises rates 25bps — impact on mortgage markets",
      "NVDA earnings beat estimates by 18% — AI infrastructure demand",
      "Bitcoin breaks $90k as ETF inflows surge",
      "S&P 500 closes at record high amid cooling inflation data",
    ],
    sources: ["r/investing", "r/stocks", "r/business", "Google Trends", "NewsAPI finance"],
    tickers: ["SPY", "NVDA", "BTC", "QQQ", "AAPL", "TSLA"],
  },
  {
    name: "MLB Daily",
    anchor: "Scribus Mungus",
    tone: "Energetic · fan-first",
    cadence: "Daily (season)",
    accentColor: "#ef4444",
    bgColor: "#fef2f2",
    borderColor: "#fecaca",
    topics: [
      "Yankees acquire ace pitcher in blockbuster trade deadline deal",
      "Ohtani goes 3-for-4 with two HRs in Dodgers win",
      "Cubs call up top prospect ahead of pennant race",
      "Playoff picture: who clinches first with 10 games left",
    ],
    sources: ["r/baseball", "r/mlb", "r/sabermetrics", "Google Trends", "NewsAPI sports"],
    tickers: [],
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.12 },
  }),
};

export function ChannelsShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <Section id="channels" className="bg-white py-28 md:py-36">
      <Container ref={ref}>
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider"
        >
          Live Channels
        </motion.div>

        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-4 max-w-2xl text-4xl font-semibold tracking-tight text-neutral-950 leading-tight"
        >
          Two channels. One pipeline.
        </motion.h2>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 max-w-xl text-lg text-neutral-500"
        >
          The same five services power entirely different audiences. Channel config in
          Postgres is all that changes — topic tags, sources, anchor voice, and tone.
        </motion.p>

        <div className="grid gap-8 md:grid-cols-2">
          {channels.map((channel, i) => (
            <motion.div
              key={channel.name}
              custom={i + 3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="rounded-2xl border p-6 md:p-8"
              style={{ borderColor: channel.borderColor, backgroundColor: channel.bgColor }}
            >
              {/* Header */}
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-950">{channel.name}</h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    Anchor: <span className="font-medium text-neutral-700">{channel.anchor}</span>
                    {" · "}{channel.cadence}
                  </p>
                </div>
                <Badge
                  style={{ borderColor: channel.accentColor + "33", backgroundColor: channel.accentColor + "15", color: channel.accentColor }}
                >
                  {channel.tone}
                </Badge>
              </div>

              {/* Sample video preview */}
              <div
                className="mb-5 relative overflow-hidden rounded-xl border"
                style={{ borderColor: channel.borderColor }}
              >
                <div className="flex items-center gap-3 bg-white p-3">
                  {/* Portrait placeholder */}
                  <div
                    className="shrink-0 overflow-hidden rounded-lg bg-neutral-900 flex flex-col items-center justify-center"
                    style={{ width: 54, height: 96 }}
                  >
                    <div className="h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-white/70 ml-0.5" />
                    <span className="mt-1 text-[7px] text-white/30">preview</span>
                  </div>
                  {/* Topic snippet */}
                  <div>
                    <p
                      className="mb-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{ color: channel.accentColor }}
                    >
                      Sample topic
                    </p>
                    <p className="text-sm font-medium text-neutral-800 leading-snug">{channel.topics[0]}</p>
                  </div>
                </div>
              </div>

              {/* Recent topics */}
              <div className="mb-5">
                <p className="mb-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">Recent topics</p>
                <ul className="space-y-1.5">
                  {channel.topics.slice(1).map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm text-neutral-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: channel.accentColor }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sources */}
              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">Data sources</p>
                <div className="flex flex-wrap gap-1.5">
                  {channel.sources.map((src) => (
                    <Badge key={src} style={{ borderColor: channel.accentColor + "22", backgroundColor: "white", color: "#737373" }}>
                      {src}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tickers */}
              {channel.tickers.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">Tracked tickers</p>
                  <div className="flex flex-wrap gap-1.5">
                    {channel.tickers.map((t) => (
                      <Badge key={t} style={{ borderColor: channel.accentColor + "33", backgroundColor: channel.accentColor + "10", color: channel.accentColor, fontFamily: "var(--font-geist-mono)" }}>
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
