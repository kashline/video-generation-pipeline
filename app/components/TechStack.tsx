"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Container } from "./Container";
import { Section } from "./Section";

const techGroups = [
  {
    label: "LLM & Embeddings",
    color: "#6366f1",
    items: [
      { name: "Gemini 2.5 Pro", role: "Outline generation, topic selection" },
      { name: "Gemini 2.5 Flash", role: "Script segments, enrichment" },
      { name: "Gemini 2.5 Flash Lite", role: "Trend clustering" },
      { name: "Gemini Embedding 001", role: "Trend/article similarity, B-roll ranking" },
    ],
  },
  {
    label: "Voice & Video",
    color: "#ef4444",
    items: [
      { name: "ElevenLabs Turbo v2.5", role: "TTS — broadcast-quality MP3" },
      { name: "HeyGen", role: "AI avatar A-roll video" },
      { name: "Pexels", role: "Stock B-roll footage" },
      { name: "Remotion Lambda", role: "Final 1080×1920 render" },
    ],
  },
  {
    label: "Infrastructure",
    color: "#10b981",
    items: [
      { name: "AWS SQS", role: "Service-to-service message queue" },
      { name: "AWS S3", role: "Audio, video, render asset storage" },
      { name: "AWS Lambda", role: "Remotion serverless render" },
      { name: "PostgreSQL + Prisma", role: "Channel config + run persistence" },
      { name: "Docker", role: "Each service containerised" },
    ],
  },
];

const costRows = [
  { service: "Generate Topics", model: "Gemini 2.5 Pro + Flash + Embedding", estimate: "~$0.04" },
  { service: "Generate Script", model: "Gemini 2.5 Pro (outline) + Flash (segments)", estimate: "~$0.06" },
  { service: "Generate Audio", model: "ElevenLabs Turbo v2.5 · ~800 chars/segment", estimate: "~$0.05" },
  { service: "Generate Video", model: "HeyGen (per min) + Pexels (free tier)", estimate: "~$0.30" },
  { service: "Video Stitcher", model: "Remotion Lambda render + ffmpeg", estimate: "~$0.02" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.09 },
  }),
};

export function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <Section id="tech-stack" className="bg-neutral-50 py-28 md:py-36">
      <Container ref={ref}>
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider"
        >
          Tech &amp; Cost
        </motion.div>

        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-4 max-w-2xl text-4xl font-semibold tracking-tight text-neutral-950 leading-tight"
        >
          Best-in-class stack. Pennies per video.
        </motion.h2>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 max-w-xl text-lg text-neutral-500"
        >
          Every component was chosen to maximise output quality while keeping
          marginal cost per video under $0.50.
        </motion.p>

        {/* Tech groups */}
        <div className="mb-14 grid gap-6 md:grid-cols-3">
          {techGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              custom={gi + 3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="rounded-2xl border border-neutral-200 bg-white p-5"
            >
              <div className="mb-4 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: group.color }} />
                <h3 className="text-sm font-semibold text-neutral-700">{group.label}</h3>
              </div>
              <div className="space-y-3">
                {group.items.map((item) => (
                  <div key={item.name} className="flex flex-col">
                    <span className="text-sm font-medium text-neutral-900">{item.name}</span>
                    <span className="text-xs text-neutral-400">{item.role}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cost table */}
        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="rounded-2xl border border-neutral-200 bg-white overflow-hidden"
        >
          <div className="border-b border-neutral-100 px-6 py-4">
            <h3 className="text-sm font-semibold text-neutral-700">Approximate cost per video run</h3>
            <p className="text-xs text-neutral-400 mt-0.5">Based on typical 60-second video with 5 segments</p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100">
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-400 uppercase tracking-wider hidden md:table-cell">Model / Provider</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-400 uppercase tracking-wider">Est. Cost</th>
              </tr>
            </thead>
            <tbody>
              {costRows.map((row, i) => (
                <tr key={row.service} className={i < costRows.length - 1 ? "border-b border-neutral-50" : ""}>
                  <td className="px-6 py-3.5 font-medium text-neutral-800">{row.service}</td>
                  <td className="px-6 py-3.5 text-neutral-500 hidden md:table-cell">{row.model}</td>
                  <td className="px-6 py-3.5 text-right font-mono text-neutral-700">{row.estimate}</td>
                </tr>
              ))}
              <tr className="bg-neutral-50">
                <td className="px-6 py-3.5 font-semibold text-neutral-900" colSpan={2}>Total per video</td>
                <td className="px-6 py-3.5 text-right font-mono font-semibold text-neutral-900">~$0.47</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </Container>
    </Section>
  );
}
