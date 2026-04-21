"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowRight, GitFork } from "lucide-react";
import type { ServiceData } from "@/lib/pipeline";
import { Container } from "./Container";
import { Badge } from "./Badge";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1 },
  }),
};

interface ServiceChapterProps {
  service: ServiceData;
  visual: React.ReactNode;
}

export function ServiceChapter({ service, visual }: ServiceChapterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section
      id={`service-${service.id}`}
      ref={ref}
      className="relative w-full py-28 md:py-36"
      style={{ backgroundColor: service.bgColor }}
    >
      {/* Step indicator stripe */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
        style={{ backgroundColor: service.accentColor }}
      />

      <Container>
        <div className="grid gap-14 md:grid-cols-2 md:gap-20 items-center">
          {/* Left — copy */}
          <div className="flex flex-col gap-6">
            {/* Step + name */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex items-center gap-3"
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: service.accentColor }}
              >
                {service.step}
              </div>
              <span className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">
                Step {service.step}
              </span>
            </motion.div>

            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-4xl font-semibold tracking-tight text-neutral-950 leading-tight"
            >
              {service.name}
            </motion.h2>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-lg font-medium"
              style={{ color: service.accentColor }}
            >
              {service.tagline}
            </motion.p>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-base leading-relaxed text-neutral-600"
            >
              {service.purpose}
            </motion.p>

            {/* Inputs / Outputs */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid grid-cols-2 gap-4"
            >
              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <p className="mb-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">Inputs</p>
                <ul className="space-y-1">
                  {service.inputs.map((input) => (
                    <li key={input} className="flex items-start gap-1.5 text-xs text-neutral-600">
                      <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-neutral-400" />
                      {input}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <p className="mb-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">Outputs</p>
                <ul className="space-y-1">
                  {service.outputs.map((output) => (
                    <li key={output} className="flex items-start gap-1.5 text-xs text-neutral-600">
                      <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-neutral-400" />
                      {output}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Tech badges */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex flex-wrap gap-2"
            >
              {service.techBadges.map((badge) => (
                <Badge
                  key={badge}
                  style={{ borderColor: service.accentColor + "33", backgroundColor: service.accentColor + "0d", color: service.accentColor }}
                >
                  {badge}
                </Badge>
              ))}
            </motion.div>

            {/* GitHub link */}
            <motion.div
              custom={6}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <a
                href={`https://github.com/kashline/${service.githubSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                <GitFork className="h-4 w-4" />
                kashline/{service.githubSlug}
              </a>
            </motion.div>
          </div>

          {/* Right — visual */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex items-center justify-center"
          >
            {visual}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
