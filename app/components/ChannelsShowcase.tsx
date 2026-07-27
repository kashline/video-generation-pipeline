"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Container } from "./Container";
import { Section } from "./Section";
import { Badge } from "./Badge";
import { CHANNELS } from "@/lib/stats";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.06 },
  }),
};

export function ChannelsShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <Section id="channels" className="bg-white py-28 md:py-36">
      <Container ref={ref}>
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider"
        >
          The Portfolio
        </motion.div>

        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-4 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 leading-tight"
        >
          A new channel is configuration, not code.
        </motion.h2>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14 max-w-2xl text-lg text-neutral-500"
        >
          Every channel below runs on the same eight services. What differs is a row of
          configuration — subject matter and research pools, narration voice, pacing,
          visual guidelines, and its own publishing credentials. Launching another one
          means writing config and adding a token. No service is aware of any channel by
          name.
        </motion.p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((channel, i) => (
            <motion.div
              key={channel.name}
              custom={i + 3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div
                className="mb-3 h-1 w-10 rounded-full"
                style={{ backgroundColor: channel.accentColor }}
              />
              <h3 className="text-base font-semibold text-neutral-950">{channel.name}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-neutral-500">
                {channel.subject}
              </p>
              <div className="mt-4 flex items-baseline gap-3 border-t border-neutral-100 pt-3">
                <div>
                  <div className="text-lg font-semibold text-neutral-900">
                    {channel.views}
                  </div>
                  <div className="text-[11px] text-neutral-400">lifetime views</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-lg font-semibold text-neutral-900">
                    {channel.videos}
                  </div>
                  <div className="text-[11px] text-neutral-400">videos</div>
                </div>
              </div>
              <div className="mt-3">
                <Badge
                  style={{
                    borderColor: channel.accentColor + "33",
                    backgroundColor: channel.accentColor + "0d",
                    color: channel.accentColor,
                  }}
                >
                  {channel.format}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          custom={12}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-8 max-w-2xl text-sm leading-relaxed text-neutral-400"
        >
          Views are plays, not people — a short video is replayed rather than watched
          once, and each replay counts again. Channel counts cover the current reporting
          window; a second format built on a single still image and on-screen text runs on
          the same pipeline and is not shown here.
        </motion.p>
      </Container>
    </Section>
  );
}
