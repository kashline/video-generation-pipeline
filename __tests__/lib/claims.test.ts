import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Guards against specific false claims that have appeared on this site before.
 *
 * The site is the only public artifact standing in for private repos, so a wrong
 * statement here is worse than a stale one. These are not style rules — each
 * entry below was live on the page and had to be corrected.
 *
 * Add a case here whenever a factual error is found and fixed, so it cannot
 * silently return.
 */

const SOURCE_DIR = join(__dirname, "..", "..", "app");

function collectSources(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectSources(full));
    else if (/\.tsx?$/.test(entry.name)) out.push(full);
  }
  return out;
}

const sources = collectSources(SOURCE_DIR).map((path) => ({
  path,
  text: readFileSync(path, "utf8"),
}));

describe("no retracted claims", () => {
  // The workspace is 11 separately versioned git repositories that integrate
  // through the published @kashline/video-pipeline-types package. Calling it a
  // monorepo is both wrong and undersells the contract boundary.
  it("never calls the workspace a monorepo", () => {
    const offenders = sources
      .filter((s) => /mono-?repo/i.test(s.text))
      .map((s) => s.path);
    expect(offenders).toEqual([]);
  });

  // An HNSW index was built, benchmarked against the real library, and removed
  // before anything reached prod — at 1408-d it measured indistinguishable from
  // a sequential scan (42.6 ms vs 42.9 ms) and cost ~99 MB the t4g.micro did not
  // have. See migrations/20260719000000_add_media_asset/migration.sql, which
  // carries the measurement as a comment. Production runs S3 Vectors; the
  // pgvector fallback has no ANN index.
  //
  // Mentioning HNSW is allowed only where the text says it was rejected.
  it("never claims an HNSW index is in use", () => {
    const offenders = sources
      .filter((s) => /hnsw/i.test(s.text))
      .filter((s) => !/(dropped|removed|rejected|deliberately|indistinguishable)/i.test(s.text))
      .map((s) => s.path);
    expect(offenders).toEqual([]);
  });

  // The repos are private, so any GitHub link on this site 404s for a visitor.
  it("links to no GitHub repositories", () => {
    const offenders = sources
      .filter((s) => /github\.com\//i.test(s.text))
      .map((s) => s.path);
    expect(offenders).toEqual([]);
  });
});
