"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Container } from "./Container";
import { Section } from "./Section";
import { REPORT_DATE } from "@/lib/stats";

const techGroups = [
  {
    label: "Models & Retrieval",
    color: "#6366f1",
    items: [
      { name: "Gemini 2.5 Pro / Flash", role: "Direction, outlines, segment writing" },
      { name: "Anthropic + OpenAI SDKs", role: "Same call site, routed by model name" },
      { name: "Zod → JSON Schema", role: "Structured output on every provider" },
      { name: "Vertex multimodal embeddings", role: "1408-d asset and query vectors" },
      { name: "Amazon S3 Vectors", role: "Production semantic index" },
      { name: "pgvector", role: "Development, CI, and rollback backend" },
    ],
  },
  {
    label: "Media & Render",
    color: "#ef4444",
    items: [
      { name: "ElevenLabs", role: "Narration with character timestamps" },
      { name: "Remotion Lambda", role: "Video composed in React, rendered serverless" },
      { name: "Pexels + Pixabay", role: "Licensed stock footage and stills" },
      { name: "ffmpeg", role: "Audio conditioning and probing" },
      { name: "YouTube Data API", role: "Upload and scheduled publishing" },
    ],
  },
  {
    label: "Platform",
    color: "#10b981",
    items: [
      { name: "ECS Fargate", role: "Eight workers, scaled to zero at idle" },
      { name: "SQS + EventBridge", role: "Stage handoff, dead-letter queues, scheduling" },
      { name: "Step Functions", role: "Run orchestration and idle shutdown" },
      { name: "Postgres + Prisma", role: "Config, run history, migrations" },
      { name: "Terraform", role: "All infrastructure as code" },
      { name: "Grafana Loki", role: "Log shipping via FireLens sidecars" },
    ],
  },
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
    <Section id="tech-stack" className="bg-white py-28 md:py-36">
      <Container ref={ref}>
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider"
        >
          Stack &amp; Cost
        </motion.div>

        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-4 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 leading-tight"
        >
          Seven cents a video.
        </motion.h2>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 max-w-2xl text-lg text-neutral-500"
        >
          That number is divided out of a real cloud bill, not modelled from token
          prices — an earlier estimator was deleted precisely because it could never see
          an invoice, and drifted.
        </motion.p>

        {/* Cost panel */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 overflow-hidden rounded-2xl border border-neutral-200"
        >
          <div className="grid gap-px bg-neutral-200 sm:grid-cols-3">
            {[
              { value: "$0.074", label: "per published video", note: "30-day window" },
              { value: "$13.35", label: "total cloud spend", note: "same 30-day window" },
              { value: "181", label: "videos published", note: "same 30-day window" },
            ].map((item) => (
              <div key={item.label} className="bg-white px-6 py-6">
                <div className="text-3xl font-semibold tracking-tight text-neutral-950">
                  {item.value}
                </div>
                <div className="mt-1 text-sm font-medium text-neutral-700">{item.label}</div>
                <div className="mt-0.5 text-xs text-neutral-400">{item.note}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-neutral-200 bg-neutral-50 px-6 py-4">
            <p className="text-xs leading-relaxed text-neutral-500">
              Actual billed spend, read from cloud billing exports at report time
              ({REPORT_DATE}). Narration is excluded — the provider exposes no billing
              API — so the true figure is somewhat higher. Cost is reported
              pipeline-wide only: billing carries no per-channel dimension, and inventing
              an apportionment key would turn a guess into something that reads like a
              measurement.
            </p>
          </div>
        </motion.div>

        {/* Tech groups */}
        <div className="grid gap-6 md:grid-cols-3">
          {techGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              custom={gi + 4}
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
      </Container>
    </Section>
  );
}
