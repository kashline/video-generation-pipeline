import { Container } from "./Container";
import { SERVICES } from "@/lib/pipeline";
import { REPORT_DATE } from "@/lib/stats";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-12">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-start">
          {/* Brand */}
          <div className="max-w-xs">
            <p className="text-sm font-semibold text-neutral-900">
              Autonomous video pipeline
            </p>
            <p className="mt-1 text-xs text-neutral-400">
              Eight services · event-driven · running unattended in production
            </p>
            <p className="mt-3 text-xs text-neutral-400">
              Source is private. Figures on this page come from the pipeline&rsquo;s own
              automated rollup ({REPORT_DATE}).
            </p>
          </div>

          {/* Stage index */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 md:max-w-md md:justify-end">
            {SERVICES.map((s) => (
              <a
                key={s.id}
                href={`#service-${s.id}`}
                className="flex items-center gap-1.5 text-xs text-neutral-500 transition-colors hover:text-neutral-900"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: s.accentColor }}
                />
                {s.name}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-100 pt-6 text-xs text-neutral-400">
          © {new Date().getFullYear()} Kevin Ashline. Built with Next.js, Tailwind CSS,
          and Framer Motion.
        </div>
      </Container>
    </footer>
  );
}
