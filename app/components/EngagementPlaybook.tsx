"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { BarChart2, Lightbulb, Settings2 } from "lucide-react";
import { Container } from "./Container";
import { Section } from "./Section";

const steps = [
  {
    number: "01",
    icon: BarChart2,
    title: "Observe",
    color: "#0066ff",
    bg: "#e8f0ff",
    items: [
      "Each run logs Gemini token usage, ElevenLabs spend, and per-segment timing",
      "Topic convergence scores are stored alongside final video metadata",
      "Source attribution is tracked — see which adapter surfaced the winning story",
      "Queue depth and worker status visible in the admin dashboard",
    ],
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Learn",
    color: "#f59e0b",
    bg: "#fffbeb",
    items: [
      "See which topic clusters consistently produce the tightest scripts",
      "Find which source adapters surface stories earliest for a given niche",
      "Compare how anchor tone and style land across different content categories",
      "Review which visual prompts earn the strongest B-roll similarity scores",
    ],
  },
  {
    number: "03",
    icon: Settings2,
    title: "Adjust",
    color: "#10b981",
    bg: "#ecfdf5",
    items: [
      "Plug in a new source adapter to pull from any API or platform",
      "Tune topicsPerRun, target duration, and anchor tone per channel in the DB",
      "Redirect the pipeline to a new niche by updating channel config",
      "Tweak structural rules — segment count, A-roll density, transition style",
    ],
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.12 },
  }),
};

export function EngagementPlaybook() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <Section id="playbook" className="bg-neutral-950 py-28 md:py-36">
      <Container ref={ref}>
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-700 px-3 py-1.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider"
        >
          Feedback Loop
        </motion.div>

        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-4 max-w-2xl text-4xl font-semibold tracking-tight text-white leading-tight"
        >
          Built to be dialled in.
        </motion.h2>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 max-w-xl text-lg text-neutral-400"
        >
          Every run stores structured metadata alongside the video — cost, topic scores,
          segment timing. That data makes the system progressively easier to understand
          and tune.
        </motion.p>

        {/* Loop connector line (desktop) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                custom={i + 3}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="relative rounded-2xl border border-neutral-800 bg-neutral-900 p-6"
              >
                {/* Step number */}
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.number}
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" style={{ color: step.color }} />
                    <h3 className="text-base font-semibold text-white">{step.title}</h3>
                  </div>
                </div>

                <ul className="space-y-2.5">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-neutral-400">
                      <div
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: step.color }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Arrow connector — only on non-last */}
                {i < steps.length - 1 && (
                  <div
                    className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 md:flex h-6 w-6 items-center justify-center rounded-full bg-neutral-800 text-neutral-500"
                  >
                    →
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Loop back note */}
        <motion.p
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-10 text-center text-sm text-neutral-500"
        >
          Each completed run feeds back into{" "}
          <span className="text-neutral-300">Step 01 — Measure</span>, creating a
          continuous improvement loop that compounds over time.
        </motion.p>
      </Container>
    </Section>
  );
}
