import { Hero } from "./components/Hero";
import { PipelineMiniMap } from "./components/PipelineMiniMap";
import { ServiceChapter } from "./components/ServiceChapter";
import { AdminShowcase } from "./components/AdminShowcase";
import { EngagementPlaybook } from "./components/EngagementPlaybook";
import { ChannelsShowcase } from "./components/ChannelsShowcase";
import { TechStack } from "./components/TechStack";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";
import { SERVICES } from "./lib/pipeline";
import { TopicsVisual } from "./components/visuals/TopicsVisual";
import { ScriptVisual } from "./components/visuals/ScriptVisual";
import { AudioVisual } from "./components/visuals/AudioVisual";
import { VideoVisual } from "./components/visuals/VideoVisual";
import { StitcherVisual } from "./components/visuals/StitcherVisual";

const visuals: Record<string, React.ReactNode> = {
  topics: <TopicsVisual />,
  script: <ScriptVisual />,
  audio: <AudioVisual />,
  video: <VideoVisual />,
  stitcher: <StitcherVisual />,
};

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <PipelineMiniMap />

      <main>
        <Hero />

        {/* Pipeline anchor — mini-map visibility sentinel */}
        <div id="pipeline-map" />

        {/* Pipeline intro strip */}
        <div className="border-y border-neutral-200 bg-white py-10">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-4 px-6 text-center md:px-10">
            {SERVICES.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3">
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: s.accentColor }}
                >
                  {s.step}
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-neutral-900">{s.name}</div>
                  <div className="text-xs text-neutral-400">{s.tagline}</div>
                </div>
                {i < SERVICES.length - 1 && (
                  <span className="ml-2 text-neutral-300 hidden md:inline">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Service chapters */}
        {SERVICES.map((service) => (
          <ServiceChapter
            key={service.id}
            service={service}
            visual={visuals[service.id]}
          />
        ))}

        <AdminShowcase />
        <EngagementPlaybook />
        <ChannelsShowcase />
        <TechStack />
      </main>

      <Footer />
    </>
  );
}

