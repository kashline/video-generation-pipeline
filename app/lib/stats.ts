/**
 * Real production numbers, taken from the pipeline's own automated rollup
 * (`s3://ainews-reports/reports/pipeline.md`, generated 2026-07-25).
 *
 * Cost figures are ACTUAL BILLED SPEND (AWS Cost Explorer + GCP billing export),
 * not token estimates. ElevenLabs is excluded — it exposes no billing API — so the
 * cost figures understate true spend and are labelled accordingly on the page.
 *
 * ⚠️ Do not add a derived "audience" metric here. Views are plays, not people: a short
 * video gets replayed and YouTube counts each replay again. Watch hours and subscribers
 * are the honest attention measures; see `docs/feedback/daily-report-review.md`.
 */
export const REPORT_DATE = "2026-07-25";

export interface Stat {
  label: string;
  value: string;
  detail: string;
}

/** Headline figures for the hero strip. */
export const HEADLINE_STATS: Stat[] = [
  { label: "Cost per video", value: "$0.074", detail: "actual billed spend, 30-day window" },
  { label: "Lifetime views", value: "309,675", detail: "all channels" },
  { label: "Videos published", value: "181", detail: "in the last 30 days" },
  { label: "Channels", value: "15", detail: "one pipeline, config-only" },
];

/** Secondary figures used in the engineering section. */
export const SCALE_STATS: Stat[] = [
  { label: "Watch hours", value: "538", detail: "delivered attention, all channels" },
  { label: "Net subscribers", value: "+449", detail: "cumulative, all channels" },
  { label: "Media library", value: "10,647", detail: "vectors in the production index" },
  { label: "Services", value: "11", detail: "separate repos, one shared schema package" },
];

/**
 * Live channels and their formats, from the rollup's per-channel table.
 * `videos` is the count inside the report window, not lifetime.
 */
export interface ChannelData {
  name: string;
  subject: string;
  format: string;
  videos: number;
  views: string;
  accentColor: string;
}

export const CHANNELS: ChannelData[] = [
  {
    name: "Curious Threads",
    subject: "Debate and controversy in news, history, and geopolitics",
    format: "mini-documentary",
    videos: 25,
    views: "26,561",
    accentColor: "#6366f1",
  },
  {
    name: "Weird War",
    subject: "Military oddities and the strange edges of wartime history",
    format: "mini-documentary",
    videos: 22,
    views: "15,917",
    accentColor: "#ef4444",
  },
  {
    name: "Natural Selection",
    subject: "Evolutionary strangeness and the biology behind it",
    format: "mini-documentary",
    videos: 10,
    views: "5,337",
    accentColor: "#10b981",
  },
  {
    name: "Origin Story",
    subject: "How familiar things came to exist",
    format: "mini-documentary",
    videos: 9,
    views: "5,382",
    accentColor: "#f59e0b",
  },
  {
    name: "Space Oddities",
    subject: "Anomalies, missions, and the physics that made them",
    format: "mini-documentary",
    videos: 9,
    views: "3,488",
    accentColor: "#0066ff",
  },
  {
    name: "Table Scraps",
    subject: "The history hiding inside everyday food",
    format: "mini-documentary",
    videos: 9,
    views: "4,276",
    accentColor: "#db2777",
  },
  {
    name: "Ghost Map",
    subject: "Abandoned places and the reasons they emptied",
    format: "mini-documentary",
    videos: 9,
    views: "2,278",
    accentColor: "#8b5cf6",
  },
  {
    name: "Cold Vault",
    subject: "Cold War secrecy and declassified strangeness",
    format: "mini-documentary",
    videos: 8,
    views: "777",
    accentColor: "#64748b",
  },
];
