import { GitFork } from "lucide-react";
import { Container } from "./Container";
import { GITHUB_ORG, SERVICES } from "@/lib/pipeline";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-12">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Brand */}
          <div>
            <p className="text-sm font-semibold text-neutral-900">AI News Video Pipeline</p>
            <p className="mt-1 text-xs text-neutral-400">
              Fully automated · end-to-end · open-source
            </p>
          </div>

          {/* Service links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {SERVICES.map((s) => (
              <a
                key={s.id}
                href={`${GITHUB_ORG}/${s.githubSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-neutral-500 transition-colors hover:text-neutral-900"
              >
                <GitFork className="h-3 w-3" />
                {s.name}
              </a>
            ))}
          </div>

          {/* GitHub org */}
          <a
            href={GITHUB_ORG}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            <GitFork className="h-3.5 w-3.5" />
            kashline on GitHub
          </a>
        </div>

        <div className="mt-8 border-t border-neutral-100 pt-6 text-xs text-neutral-400">
          © {new Date().getFullYear()} kashline. Built with Next.js, Tailwind CSS, and Framer Motion.
        </div>
      </Container>
    </footer>
  );
}
