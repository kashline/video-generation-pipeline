export interface ServiceData {
  id: string;
  slug: string;
  step: number;
  name: string;
  tagline: string;
  purpose: string;
  inputs: string[];
  outputs: string[];
  techBadges: string[];
  accentColor: string;
  bgColor: string;
  /** SQS queue this worker consumes. */
  queueIn: string;
  /** SQS queue this worker writes to; null for the terminal stage. */
  queueOut: string | null;
}

/**
 * The eight production workers, in runtime order.
 *
 * Order and queue names mirror the deployed ECS worker definitions in
 * `ainews-infrastructure/terraform/environments/prod/ecs.tf`:
 *   enqueue → topics → script → evaluation → audio → video → stitcher → publish
 */
export const SERVICES: ServiceData[] = [
  {
    id: "enqueue",
    slug: "enqueue",
    step: 1,
    name: "Scheduler",
    tagline: "Wakes the factory up.",
    purpose:
      "A cron-driven scheduler checks every channel's publish window and enqueues the runs that are due. Because the fleet scales to zero between runs, this stage also brings the infrastructure back online — starting the database, then releasing work onto the queue. It is the only scheduled stage in the system: every later stage is woken by the message the stage before it wrote.",
    inputs: ["Channel schedules (Postgres)", "EventBridge cron trigger"],
    outputs: ["One run per due channel → ainews-channels"],
    techBadges: ["EventBridge", "Step Functions", "ECS Fargate", "Scale-to-zero"],
    accentColor: "#64748b",
    bgColor: "#f8fafc",
    queueIn: "ainews-channels",
    queueOut: "ainews-channels",
  },
  {
    id: "topics",
    slug: "topics",
    step: 2,
    name: "Topic Research",
    tagline: "Finding a story worth telling.",
    purpose:
      "Mini-documentary channels run a Wikipedia research pipeline rather than a news feed. Candidates are assembled from per-channel category seeds and curated article pools, then ranked on real Wikipedia pageview demand — a free and reliable stand-in for search interest, since the candidates are themselves the articles people search for. A cooldown keyed on the exact page title stops a channel re-covering a subject it has already published.",
    inputs: ["Channel + video-type config (Postgres)", "Wikipedia category seeds", "Wikipedia pageview demand"],
    outputs: ["Ranked topic with research payload → ainews-topics"],
    techBadges: ["Wikipedia API", "Pageview demand ranking", "Category seeding", "Per-title cooldown"],
    accentColor: "#6366f1",
    bgColor: "#eef2ff",
    queueIn: "ainews-channels",
    queueOut: "ainews-topics",
  },
  {
    id: "script",
    slug: "script",
    step: 3,
    name: "Script",
    tagline: "A director and a writers' room.",
    purpose:
      "A Creative Director model plans the video before a word is written: it picks the hook technique, nominates the cold-open fact, and lays out the segment sequence. Segment writers then fill that outline in. The outline is parsed against a Zod schema and a set of sequencing rules — per-kind adjacency constraints plus a structural-completeness check that rejects, for instance, a hook with no conclusion. A failed outline burns a retry and is regenerated with the violated rule fed back to the model.",
    inputs: ["Topic + channel config (ainews-topics)"],
    outputs: ["Ordered segments + discovery metadata → ainews-scripts"],
    techBadges: ["Gemini 2.5 Pro (outline)", "Gemini 2.5 Flash (segments)", "Zod schema gate", "Sequencing rules", "Hook & CTA menus"],
    accentColor: "#f59e0b",
    bgColor: "#fffbeb",
    queueIn: "ainews-topics",
    queueOut: "ainews-scripts",
  },
  {
    id: "evaluation",
    slug: "evaluation",
    step: 4,
    name: "Evaluation",
    tagline: "Nothing ships ungraded.",
    purpose:
      "Every script passes a battery of deterministic quality checks before it is allowed to cost money in the stages that follow: Flesch–Kincaid readability, passive-voice density, phrase repetition, sentences per segment, spoken-duration estimation, and structural completeness. These are real functions with real thresholds, not a model asked whether the writing is good — which makes the verdicts reproducible, auditable, and effectively free.",
    inputs: ["Draft script (ainews-scripts)"],
    outputs: ["Graded script → ainews-script-generated"],
    techBadges: ["Flesch–Kincaid", "Passive-voice detection", "Repetition analysis", "Duration estimation", "Deterministic thresholds"],
    accentColor: "#8b5cf6",
    bgColor: "#f5f3ff",
    queueIn: "ainews-scripts",
    queueOut: "ainews-script-generated",
  },
  {
    id: "audio",
    slug: "audio",
    step: 5,
    name: "Narration",
    tagline: "Text in, timed speech out.",
    purpose:
      "Each segment is synthesised individually through ElevenLabs, requested with character-level timestamps rather than plain audio. Those timestamps are what make the rest of the pipeline possible — subtitles land on the syllable and visuals cut on the beat, because the render stage knows exactly when every word is spoken.",
    inputs: ["Graded script (ainews-script-generated)"],
    outputs: ["Per-segment audio + word timings on S3 → ainews-audio"],
    techBadges: ["ElevenLabs", "eleven_multilingual_v2", "Character timestamps", "Per-channel voices", "S3"],
    accentColor: "#10b981",
    bgColor: "#ecfdf5",
    queueIn: "ainews-script-generated",
    queueOut: "ainews-audio",
  },
  {
    id: "video",
    slug: "video",
    step: 6,
    name: "Visual Retrieval",
    tagline: "Semantic search over a media library.",
    purpose:
      "Every segment carries a visual intent, which is embedded and matched against a library of licensed stock footage and stills using multimodal embeddings. Retrieval sits behind a swappable index interface: local development and CI run on pgvector, while production queries Amazon S3 Vectors — the same code path, a different backend, chosen by environment. Results are deduplicated across the run so no clip appears twice in one video.",
    inputs: ["Script + audio segments (ainews-audio)"],
    outputs: ["Selected assets on S3 → ainews-video"],
    techBadges: ["Amazon S3 Vectors", "pgvector", "1408-d multimodal embeddings", "Pexels", "Pixabay", "Run-level dedupe"],
    accentColor: "#ef4444",
    bgColor: "#fef2f2",
    queueIn: "ainews-audio",
    queueOut: "ainews-video",
  },
  {
    id: "stitcher",
    slug: "stitcher",
    step: 7,
    name: "Render",
    tagline: "All assets. One render.",
    purpose:
      "Remotion Lambda composes the finished video as React: sequenced clips on a timeline, per-segment subtitles driven by the narration timestamps, a channel-branded overlay, and the full audio bed — rendered at 1080×1920 portrait. Rendering serverlessly means the render tier costs nothing while no video is being made.",
    inputs: ["Script + audio + selected assets (ainews-video)"],
    outputs: ["Final 1080×1920 MP4 on S3 → ainews-publish"],
    techBadges: ["Remotion Lambda", "React video", "ffmpeg", "1080×1920", "Prisma/Postgres"],
    accentColor: "#0066ff",
    bgColor: "#e8f0ff",
    queueIn: "ainews-video",
    queueOut: "ainews-publish",
  },
  {
    id: "publish",
    slug: "publish",
    step: 8,
    name: "Publish",
    tagline: "Straight to the platform.",
    purpose:
      "The finished video is uploaded to its channel's YouTube account with the title, description, hashtags and tags the outline stage already produced — no extra model call at publish time. Each channel holds its own OAuth credentials as an encrypted parameter, so adding a channel to the fleet never means touching this service's code.",
    inputs: ["Rendered video + metadata (ainews-publish)"],
    outputs: ["Published YouTube Short", "Run persisted to Postgres"],
    techBadges: ["YouTube Data API", "Per-channel OAuth", "SSM SecureString", "Scheduled publishing"],
    accentColor: "#db2777",
    bgColor: "#fdf2f8",
    queueIn: "ainews-publish",
    queueOut: null,
  },
];
