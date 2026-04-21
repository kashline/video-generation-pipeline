"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  BarChart2,
  Activity,
  Play,
  Search,
  DollarSign,
  Layers,
  LayoutDashboard,
  ListOrdered,
} from "lucide-react";
import { Container } from "./Container";
import { Section } from "./Section";

const features = [
  {
    icon: Layers,
    title: "Channel Management",
    description:
      "View and edit every channel's configuration: topic tags, subreddit map, anchor, cadence, tone, and data-point metadata. Changes take effect on the next pipeline run.",
    engagement:
      "Tune topic tags and categories in response to what's trending — no redeploy needed.",
  },
  {
    icon: Activity,
    title: "Pipeline Run History",
    description:
      "Per-channel timeline of every run: which topics were selected, how the script was structured, and whether each service completed or failed.",
    engagement:
      "Spot which topic clusters consistently produce the highest-quality scripts.",
  },
  {
    icon: LayoutDashboard,
    title: "Queue & Worker Status",
    description:
      "Live view of SQS queue depths and service worker health across all five stages. Instantly see if a service is backlogged or idle.",
    engagement:
      "Diagnose pipeline stalls in seconds and re-enqueue stuck messages without touching AWS console.",
  },
  {
    icon: DollarSign,
    title: "Spend Pie Chart",
    description:
      "Per-run Gemini cost breakdown surfaced as a pie chart. Tracks token spend per service so you know exactly where money goes.",
    engagement:
      "Identify which services drive the most cost and adjust model tiers or retry limits accordingly.",
  },
  {
    icon: BarChart2,
    title: "Grafana Dashboard",
    description:
      "Embedded Grafana panel for latency, error rates, and throughput across every service — linked directly inside the admin UI.",
    engagement:
      "Correlate video production speed with peak publishing windows to maximise platform algorithm reach.",
  },
  {
    icon: Search,
    title: "Clip Library & Search",
    description:
      "Browse, search, and preview every generated video clip stored in S3. Filter by channel, date, or segment type.",
    engagement:
      "Repurpose high-performing clips as Shorts covers or thumbnail frames without re-rendering.",
  },
  {
    icon: Play,
    title: "Run Pipeline / Enqueue",
    description:
      "Trigger a full or partial pipeline run for any channel directly from the UI. Seed custom topics or re-run from a specific service stage.",
    engagement:
      "React to a breaking story instantly — enqueue a custom topic mid-day outside the normal schedule.",
  },
  {
    icon: ListOrdered,
    title: "Recent Topics Table",
    description:
      "Table of the last N topics selected per channel with their enrichment data: dataPoints, scriptBits, trend sources, convergence score.",
    engagement:
      "Review which stories were covered and how they were framed before scheduling the next run.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07 },
  }),
};

export function AdminShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <Section id="admin" className="bg-white py-28 md:py-36">
      <Container ref={ref}>
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider"
        >
          Admin Frontend
        </motion.div>

        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-4 max-w-2xl text-4xl font-semibold tracking-tight text-neutral-950 leading-tight"
        >
          Full visibility. Instant control.
        </motion.h2>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 max-w-xl text-lg text-neutral-500"
        >
          The admin panel surfaces real-time pipeline health, cost analytics, clip
          management, and channel configuration — everything needed to run and
          optimise the production machine.
        </motion.p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                custom={i + 3}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="flex flex-col rounded-2xl border border-neutral-200 bg-neutral-50 p-5 transition-shadow hover:shadow-md"
              >
                {/* Placeholder screenshot area */}
                <div className="mb-4 flex h-32 w-full items-center justify-center rounded-xl border border-neutral-200 bg-white">
                  <Icon className="h-8 w-8 text-neutral-300" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4 text-neutral-500 shrink-0" />
                  <h3 className="text-sm font-semibold text-neutral-900">{feature.title}</h3>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed mb-3 flex-1">
                  {feature.description}
                </p>
                <div className="rounded-lg bg-white border border-neutral-200 px-2.5 py-2">
                  <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-0.5">
                    Engagement angle
                  </p>
                  <p className="text-[11px] text-neutral-600">{feature.engagement}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
