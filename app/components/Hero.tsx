"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "./Container";
import { Button } from "./Button";
import { HEADLINE_STATS, REPORT_DATE } from "@/lib/stats";

export function Hero() {
  const scrollToPipeline = () => {
    document.getElementById("pipeline-map")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToEngineering = () => {
    document.getElementById("engineering")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 py-24">
      {/* Subtle dot grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #e5e5e5 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      <Container className="relative flex flex-col items-center text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-medium text-neutral-500 shadow-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          Running in production · 8 services · TypeScript
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="max-w-4xl text-5xl font-semibold tracking-tight text-neutral-950 md:text-6xl lg:text-7xl"
          style={{ lineHeight: 1.08 }}
        >
          A video studio{" "}
          <span className="text-neutral-400">with nobody in it.</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-500"
        >
          An autonomous multi-agent pipeline that researches a subject, directs and
          writes a script, grades its own draft, narrates it, finds its own footage,
          renders it, and publishes it to YouTube — unattended, every day, across a
          portfolio of channels. No human touches the creative work.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button size="lg" onClick={scrollToPipeline}>
            Walk the pipeline
          </Button>
          <Button size="lg" variant="secondary" onClick={scrollToEngineering}>
            How it&rsquo;s engineered
          </Button>
        </motion.div>

        {/* Real production numbers */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="mt-16 w-full"
        >
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 md:grid-cols-4">
            {HEADLINE_STATS.map((stat) => (
              <div key={stat.label} className="bg-white px-5 py-6">
                <div className="text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1.5 text-sm font-medium text-neutral-700">
                  {stat.label}
                </div>
                <div className="mt-0.5 text-xs text-neutral-400">{stat.detail}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-neutral-400">
            From the pipeline&rsquo;s own automated rollup, {REPORT_DATE}. Cost is actual
            billed spend, not an estimate.
          </p>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-14 flex flex-col items-center gap-1 text-neutral-400"
        >
          <span className="text-xs tracking-wide">Scroll to explore</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </motion.div>
      </Container>
    </section>
  );
}
