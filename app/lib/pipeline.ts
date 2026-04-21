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
  githubSlug: string;
}

export const SERVICES: ServiceData[] = [
  {
    id: "topics",
    slug: "topics",
    step: 1,
    name: "Generate Topics",
    tagline: "From noise to news.",
    purpose:
      "Pluggable source adapters pull trending signals from Reddit, Google Trends, NewsAPI, and more — for any niche or topic area. Gemini embeds each signal, clusters them by cosine similarity across sources, and surfaces the highest-convergence stories. Each topic is then enriched with structured data points, contextual quotes, and alternate angles.",
    inputs: ["Channel config (Postgres)", "Pluggable trend sources (Reddit, Google Trends, NewsAPI, …)"],
    outputs: ["Ranked Topic[] with scriptBits, dataPoints, altTopics → SQS"],
    techBadges: ["Gemini 2.5 Pro", "Gemini 2.5 Flash", "Gemini Embeddings", "NewsAPI", "Reddit API", "Google Trends"],
    accentColor: "#6366f1",
    bgColor: "#eef2ff",
    githubSlug: "ainews-generate-topics",
  },
  {
    id: "script",
    slug: "script",
    step: 2,
    name: "Generate Script",
    tagline: "A two-act writing room.",
    purpose:
      "Phase 1: Gemini 2.5 Pro plans the narrative structure shaped by the channel's configured tone, cadence, and target duration. Phase 2: Gemini 2.5 Flash writes each segment while using the narrative glue provided by the outline to ensure coherent storytelling and accurate sequencing of visual and audio elements.",
    inputs: ["Topic[] + channel config (SQS)"],
    outputs: ["Script with ordered Segment[] → SQS"],
    techBadges: ["Gemini 2.5 Pro (outline)", "Gemini 2.5 Flash (segments)", "60-second target"],
    accentColor: "#f59e0b",
    bgColor: "#fffbeb",
    githubSlug: "ainews-generate-script",
  },
  {
    id: "audio",
    slug: "audio",
    step: 3,
    name: "Generate Audio",
    tagline: "Text in, audio out.",
    purpose:
      "Feeds each script segment into ElevenLabs Turbo v2.5 to produce broadcast-quality MP3 audio. Each clip is then passed through ffmpeg to enforce configured audio settings, and uploaded to S3 ready for the video layer.",
    inputs: ["Script segments (SQS)"],
    outputs: ["AudioSegment[] with S3 URLs → SQS"],
    techBadges: ["ElevenLabs Turbo v2.5", "ffmpeg 1.25×", "S3"],
    accentColor: "#10b981",
    bgColor: "#ecfdf5",
    githubSlug: "ainews-generate-audio",
  },
  {
    id: "video",
    slug: "video",
    step: 4,
    name: "Generate Video",
    tagline: "Avatar + B-roll, automated.",
    purpose:
      "Routes each segment by videoSource. A-ROLL segments hit HeyGen, while B-ROLL segments query Pexels via embedding-ranked similarity to the visualPrompt, deduplicated across the run, downloaded, and uploaded to S3.",
    inputs: ["Script + Audio segments (SQS)"],
    outputs: ["VideoSegment[] with S3 URLs → SQS"],
    techBadges: ["HeyGen (avatar A-roll)", "Pexels (B-roll)", "Gemini Embeddings", "Cosine similarity ranking", "S3"],
    accentColor: "#ef4444",
    bgColor: "#fef2f2",
    githubSlug: "ainews-generate-video",
  },
  {
    id: "stitcher",
    slug: "stitcher",
    step: 5,
    name: "Video Stitcher",
    tagline: "All assets. One render.",
    purpose:
      "Downloads all audio and video assets from S3. Remotion Lambda composes the final video: sequenced clips on a timeline, configurable subtites per segment, a channel-branded HUD (logo + ticker), and the full audio track — rendered at 1080×1920 portrait. The complete run is persisted to Postgres.",
    inputs: ["Script + Audio + Video segments (SQS)"],
    outputs: ["Final 1080×1920 MP4 on S3 + full event persisted to Postgres"],
    techBadges: ["Remotion Lambda", "ffmpeg", "ffprobe", "Prisma/Postgres", "S3"],
    accentColor: "#0066ff",
    bgColor: "#e8f0ff",
    githubSlug: "ainews-video-stitcher",
  },
];

export const GITHUB_ORG = "https://github.com/kashline";
