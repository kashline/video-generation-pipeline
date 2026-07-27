"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Layers,
  Activity,
  Play,
  Search,
  FileText,
  KeyRound,
  ScrollText,
  ArrowUpFromLine,
} from "lucide-react";
import { Container } from "./Container";
import { Section } from "./Section";

const features = [
  {
    icon: Layers,
    title: "Channel authoring",
    description:
      "Define a channel and its video types: subject pools, narration voice, pacing, visual guidelines, publishing schedule, and the gold scripts that anchor tone. This is the surface where a new channel is created.",
  },
  {
    icon: ArrowUpFromLine,
    title: "Promotion to production",
    description:
      "Channels are built and exercised against a development database first, then promoted upward as a deliberate action. Nothing reaches the production fleet because someone edited a live row by hand.",
  },
  {
    icon: Play,
    title: "Run, requeue, restitch",
    description:
      "Trigger a full run or push a single stage back onto its queue. A video that rendered badly can be re-stitched without regenerating the script or paying for narration twice.",
  },
  {
    icon: Activity,
    title: "Run history",
    description:
      "Every run is inspectable end to end — the topic that was chosen, the outline the director produced, each segment, and where a failed run stopped.",
  },
  {
    icon: Search,
    title: "Media library search",
    description:
      "Browse and semantically search the asset library using the same embedding backend the pipeline queries at render time, so a retrieval problem can be reproduced by hand.",
  },
  {
    icon: FileText,
    title: "Document sets",
    description:
      "Upload source material — PDFs analysed by a model, video indexed for search — and bind it to a channel as a private research pool alongside the public one.",
  },
  {
    icon: KeyRound,
    title: "YouTube connect",
    description:
      "Walks the OAuth consent flow for a channel and surfaces the resulting refresh token for storage as an encrypted parameter. Credentials never live in the database or in code.",
  },
  {
    icon: ScrollText,
    title: "Logs and dashboards",
    description:
      "Proxies the log backend so a failing run can be traced without leaving the console or opening a cloud provider's UI.",
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
    <Section id="admin" className="bg-neutral-50 py-28 md:py-36">
      <Container ref={ref}>
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider"
        >
          Operator Console
        </motion.div>

        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-4 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 leading-tight"
        >
          The one place a human is allowed in.
        </motion.h2>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 max-w-2xl text-lg text-neutral-500"
        >
          A Next.js console for the work that genuinely needs judgement — defining a
          channel, curating source material, promoting configuration to production, and
          diagnosing a run that went wrong. It deliberately has no say in the creative
          output of any individual video.
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
                className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100">
                  <Icon className="h-4 w-4 text-neutral-600" />
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-neutral-900">
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed text-neutral-500">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
