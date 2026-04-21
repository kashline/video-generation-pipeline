"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "./Container";
import { Button } from "./Button";

export function Hero() {
  const scrollToPipeline = () => {
    document.getElementById("pipeline-map")?.scrollIntoView({ behavior: "smooth" });
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
          5 microservices · TypeScript · open source
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="max-w-3xl text-5xl font-semibold tracking-tight text-neutral-950 md:text-6xl lg:text-7xl"
          style={{ lineHeight: 1.08 }}
        >
          Breaking news,{" "}
          <span className="text-neutral-400">delivered as video.</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-500"
        >
          Five AI microservices — topics, script, voice, video, render — chained
          together to go from trending signals to a publishable short-form video,
          fully unattended.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button size="lg" onClick={scrollToPipeline}>
            Explore the pipeline
          </Button>
          <Button
            size="lg"
            variant="secondary"
            href="https://github.com/kashline"
          >
            View on GitHub
          </Button>
        </motion.div>

        {/* Portrait video previews */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="mt-16 flex items-end justify-center gap-4"
        >
          {[
            { label: "Financial News", delay: 0, scale: 1, z: 10, rotate: "-3deg" },
            { label: "MLB Daily", delay: 0.06, scale: 1.06, z: 20, rotate: "0deg" },
            { label: "Breaking News", delay: 0.12, scale: 1, z: 10, rotate: "3deg" },
          ].map((v) => (
            <div
              key={v.label}
              className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-lg"
              style={{
                width: 140,
                height: 248,
                transform: `rotate(${v.rotate}) scale(${v.scale})`,
                zIndex: v.z,
              }}
            >
              {/* Placeholder video frame */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950 gap-2">
                <div className="h-10 w-10 rounded-full border-2 border-white/20 flex items-center justify-center">
                  <div className="h-0 w-0 border-y-[7px] border-l-[12px] border-y-transparent border-l-white ml-0.5" />
                </div>
                <span className="text-[10px] text-white/40 px-2 text-center">{v.label}</span>
              </div>
              {/* HUD overlay */}
              <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-black/50 to-transparent flex items-center px-2.5">
                <span className="text-[9px] font-bold text-white tracking-widest uppercase">FN</span>
              </div>
              <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-black/60 to-transparent flex items-center px-2">
                <span className="text-[8px] text-white/70 truncate">BREAKING NEWS</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 flex flex-col items-center gap-1 text-neutral-400"
        >
          <span className="text-xs tracking-wide">Scroll to explore</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </motion.div>
      </Container>
    </section>
  );
}
