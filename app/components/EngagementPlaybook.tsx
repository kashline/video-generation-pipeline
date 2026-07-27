"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { BarChart2, Tag, Scissors } from "lucide-react";
import { Container } from "./Container";
import { Section } from "./Section";

const steps = [
  {
    number: "01",
    icon: Tag,
    title: "Tag at generation",
    color: "#6366f1",
    items: [
      "Every script picks its opening hook from a menu of proven techniques, and its closing line from a menu of comment and share drivers",
      "The chosen template is written onto the video as a tag before it is ever rendered",
      "Months later, any published video can still be traced to the exact template that produced it",
    ],
  },
  {
    number: "02",
    icon: BarChart2,
    title: "Grade against reality",
    color: "#f59e0b",
    items: [
      "A daily job pulls per-video analytics and groups them by hook and by closer",
      "Every derived verdict carries a denominator guard — the report refuses to call a channel underserved off five views",
      "If a comparison gets made twice by hand, it becomes code in the report generator instead",
    ],
  },
  {
    number: "03",
    icon: Scissors,
    title: "Retire what loses",
    color: "#10b981",
    items: [
      "Templates that underperform are deleted from the menu, so the generator cannot pick them again",
      "The slug stays valid in historical metadata — old videos remain readable, new ones can't regress",
      "New templates ship alongside the metric that will grade them, never ahead of it",
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
          The Feedback Loop
        </motion.div>

        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-4 max-w-3xl text-4xl font-semibold tracking-tight text-white leading-tight"
        >
          The pipeline learns which words worked.
        </motion.h2>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 max-w-2xl text-lg text-neutral-400"
        >
          Generating video is the easy half. The harder half is knowing whether a
          creative choice actually worked — and being able to prove it well enough to
          change the generator. Every published video is instrumented back to the
          template that wrote it.
        </motion.p>

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

                {i < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 md:flex h-6 w-6 items-center justify-center rounded-full bg-neutral-800 text-neutral-500">
                    →
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Worked example — the loop actually firing */}
        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-10 grid gap-6 md:grid-cols-2"
        >
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 md:p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-red-400">
              Worked example · a closer got cut
            </p>
            <p className="text-base leading-relaxed text-neutral-300">
              One closing line — a rhetorical &ldquo;what&rsquo;s your verdict?&rdquo;
              question — became the model&rsquo;s runaway favourite, chosen for{" "}
              <span className="font-semibold text-white">34 of 58</span> measured videos,
              more than every other closer combined. It looked like the system had found
              a winner.
            </p>
            <p className="mt-4 text-base leading-relaxed text-neutral-300">
              It had produced{" "}
              <span className="font-semibold text-white">0.00 comments per video</span>{" "}
              across all 34 — against 0.44 and 0.40 for the two closers it had been
              crowding out. It was deleted from the menu. The generator can no longer
              choose it.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 md:p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Worked example · a metric came first
            </p>
            <p className="text-base leading-relaxed text-neutral-300">
              Shares were the portfolio&rsquo;s weakest signal —{" "}
              <span className="font-semibold text-white">0.11 per 1,000 views</span>,
              against 13.7 likes — while being a stronger distribution lever than
              comments, because a share reaches an audience the feed never served.
            </p>
            <p className="mt-4 text-base leading-relaxed text-neutral-300">
              So share-driving closers were added to the menu. The report gained a{" "}
              <span className="font-semibold text-white">shares-per-video column the
              same day</span> — a closer graded only on comments would have been
              unfalsifiable by construction, which is its own kind of bug.
            </p>
          </div>
        </motion.div>

        <motion.p
          custom={7}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-8 max-w-3xl text-sm leading-relaxed text-neutral-500"
        >
          This is the part that compounds. Rendering a video is a fixed cost; knowing
          which of two openings earns another three seconds of attention is an asset that
          keeps paying, and it only exists because every creative decision was made
          attributable at the moment it was made.
        </motion.p>
      </Container>
    </Section>
  );
}
