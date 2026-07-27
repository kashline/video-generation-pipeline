"use client";

import { motion } from "framer-motion";
import { Database, ArrowDown } from "lucide-react";
import type { ServiceData } from "@/lib/pipeline";

/**
 * One visual, driven entirely by SERVICES.
 *
 * Deliberately data-driven rather than hand-illustrated per stage: the previous
 * bespoke visuals each carried their own hardcoded copy, and every one of them
 * had drifted out of date with the pipeline it was describing.
 */
export function StageVisual({ service }: { service: ServiceData }) {
  const { accentColor, queueIn, queueOut, techBadges, step, name } = service;
  const isTerminal = queueOut === null;
  const isSelfTriggered = queueIn === queueOut;

  return (
    <div className="flex w-full max-w-sm flex-col items-center">
      {/* Inbound queue */}
      <QueueChip
        label={isSelfTriggered ? "Scheduled trigger" : queueIn}
        sublabel={isSelfTriggered ? "EventBridge cron" : "SQS queue"}
        accentColor={accentColor}
      />

      <Connector accentColor={accentColor} />

      {/* The worker */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="w-full rounded-2xl border-2 bg-white p-5 shadow-sm"
        style={{ borderColor: accentColor }}
      >
        <div className="mb-3 flex items-center gap-2.5">
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: accentColor }}
          >
            {step}
          </div>
          <div>
            <div className="text-sm font-semibold text-neutral-900">{name}</div>
            <div className="text-[10px] text-neutral-400">
              ECS Fargate worker · scales from zero
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {techBadges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border px-2 py-0.5 text-[10px] font-medium"
              style={{
                borderColor: accentColor + "33",
                backgroundColor: accentColor + "0d",
                color: accentColor,
              }}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Dead-letter note — true of every queue in the fleet */}
        <div className="mt-3 flex items-center gap-1.5 border-t border-neutral-100 pt-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
          <span className="text-[10px] text-neutral-400">
            Retries bounded, then dead-lettered
          </span>
        </div>
      </motion.div>

      <Connector accentColor={accentColor} />

      {/* Outbound */}
      {isTerminal ? (
        <QueueChip
          label="Published to YouTube"
          sublabel="run persisted to Postgres"
          accentColor={accentColor}
          terminal
        />
      ) : (
        <QueueChip label={queueOut} sublabel="SQS queue" accentColor={accentColor} />
      )}
    </div>
  );
}

function QueueChip({
  label,
  sublabel,
  accentColor,
  terminal = false,
}: {
  label: string;
  sublabel: string;
  accentColor: string;
  terminal?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex w-full items-center gap-2.5 rounded-xl border border-neutral-200 bg-white px-4 py-2.5"
    >
      <Database
        className="h-3.5 w-3.5 shrink-0"
        style={{ color: terminal ? accentColor : "#a3a3a3" }}
      />
      <div className="min-w-0">
        <div className="truncate font-mono text-xs text-neutral-700">{label}</div>
        <div className="text-[10px] text-neutral-400">{sublabel}</div>
      </div>
    </motion.div>
  );
}

function Connector({ accentColor }: { accentColor: string }) {
  return (
    <div className="relative flex h-8 w-full items-center justify-center">
      <div className="absolute h-full w-px bg-neutral-200" />
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: accentColor }}
        animate={{ y: [-14, 14], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
      />
      <ArrowDown className="relative h-3 w-3 bg-white text-neutral-300" />
    </div>
  );
}
