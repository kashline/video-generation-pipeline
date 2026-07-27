"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Shuffle,
  Braces,
  Search,
  ClipboardCheck,
  PiggyBank,
  Radio,
  Boxes,
  ShieldAlert,
} from "lucide-react";
import { Container } from "./Container";
import { Section } from "./Section";
import { SCALE_STATS } from "@/lib/stats";

const pillars = [
  {
    icon: Shuffle,
    color: "#6366f1",
    title: "Provider-agnostic LLM layer",
    body:
      "One call site routes to Gemini, Anthropic, or OpenAI by model name, with lazily constructed clients and per-provider structured output. The highest-volume stage runs on a discounted, sheddable service tier at roughly half the per-token cost, retrying with exponential backoff when the provider is at capacity.",
  },
  {
    icon: Braces,
    color: "#f59e0b",
    title: "Constrained generation",
    body:
      "A single Zod schema is compiled into whichever mechanism the chosen provider speaks natively — response schemas, strict JSON-schema mode, or a tool-input contract. Malformed model output becomes a parse failure at a known boundary instead of a mystery three stages downstream.",
  },
  {
    icon: Search,
    color: "#ef4444",
    title: "Swappable vector retrieval",
    body:
      "Semantic search sits behind a narrow index interface with two implementations: pgvector for development and CI, Amazon S3 Vectors for production. An HNSW index was built and benchmarked, then deliberately dropped — at 1408 dimensions it measured indistinguishable from a sequential scan while costing memory the database did not have. The production cutover was gated on an offline parity benchmark run against real embeddings, and reverts with a single configuration line.",
  },
  {
    icon: ClipboardCheck,
    color: "#8b5cf6",
    title: "Deterministic evaluation",
    body:
      "Generated scripts are graded by real functions with real thresholds — readability, passive voice, repetition, spoken duration, structural completeness — rather than by another model asked for an opinion. Verdicts are reproducible and auditable, and cost nothing to run on every draft.",
  },
  {
    icon: Radio,
    color: "#0066ff",
    title: "Event-driven, idempotent stages",
    body:
      "Eight workers communicate only through queues, each with a dead-letter queue and a bounded receive count. A stage that dies mid-run is retried rather than resumed, which is what makes it safe to run the cheap, interruptible compute tier underneath half of them.",
  },
  {
    icon: PiggyBank,
    color: "#10b981",
    title: "Scales to zero between runs",
    body:
      "Workers idle at zero replicas and the database stops itself once every queue is drained. Interruptible spot capacity backs the stateless stages; on-demand backs the ones holding expensive external calls. The result is a production system that costs cents a day when it is not making anything.",
  },
  {
    icon: ShieldAlert,
    color: "#db2777",
    title: "Measured, not estimated",
    body:
      "An earlier cost tracker multiplied token counts by a hardcoded price table and drifted out of date. It was deleted in favour of reading actual billed spend from cloud billing exports — the only version that catches the database hours and compute minutes that genuinely dominate the bill.",
  },
  {
    icon: Boxes,
    color: "#64748b",
    title: "Eleven repos, one source of truth",
    body:
      "Eleven independently deployed TypeScript services, each in its own repository, share a published package holding the database schema, migrations, and every cross-service type. Changing a contract is a version bump that consuming builds either pick up or fail loudly on — never a silent drift between two services that disagree.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06 },
  }),
};

export function Engineering() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <Section id="engineering" className="bg-neutral-50 py-28 md:py-36">
      <Container ref={ref}>
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider"
        >
          Engineering
        </motion.div>

        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-4 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 leading-tight"
        >
          Built to run unattended, not to demo.
        </motion.h2>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 max-w-2xl text-lg text-neutral-500"
        >
          Anything can generate one good video with someone watching. The engineering
          problem is producing them every day, for years, at a cost that survives
          contact with a real bill — and noticing when something quietly breaks.
        </motion.p>

        {/* Scale figures */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 md:grid-cols-4"
        >
          {SCALE_STATS.map((stat) => (
            <div key={stat.label} className="bg-white px-5 py-5">
              <div className="text-2xl font-semibold tracking-tight text-neutral-950">
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-medium text-neutral-700">{stat.label}</div>
              <div className="mt-0.5 text-xs text-neutral-400">{stat.detail}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                custom={i + 4}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="rounded-2xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex items-center gap-2.5">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: pillar.color + "14" }}
                  >
                    <Icon className="h-4 w-4" style={{ color: pillar.color }} />
                  </div>
                  <h3 className="text-base font-semibold text-neutral-900">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-neutral-600">{pillar.body}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
