import { describe, it, expect } from "vitest";
import { SERVICES, GITHUB_ORG } from "@/lib/pipeline";

describe("SERVICES", () => {
  it("has exactly 5 services", () => {
    expect(SERVICES).toHaveLength(5);
  });

  it("steps run sequentially from 1 to 5", () => {
    expect(SERVICES.map((s) => s.step)).toEqual([1, 2, 3, 4, 5]);
  });

  it("every service has required non-empty string fields", () => {
    for (const s of SERVICES) {
      expect(s.id).toBeTruthy();
      expect(s.slug).toBeTruthy();
      expect(s.name).toBeTruthy();
      expect(s.tagline).toBeTruthy();
      expect(s.purpose).toBeTruthy();
      expect(s.githubSlug).toBeTruthy();
    }
  });

  it("slug matches id for every service", () => {
    for (const s of SERVICES) {
      expect(s.slug).toBe(s.id);
    }
  });

  it("ids and slugs are unique across the array", () => {
    expect(new Set(SERVICES.map((s) => s.id)).size).toBe(5);
    expect(new Set(SERVICES.map((s) => s.slug)).size).toBe(5);
  });

  it("every service has at least one input and one output", () => {
    for (const s of SERVICES) {
      expect(s.inputs.length).toBeGreaterThan(0);
      expect(s.outputs.length).toBeGreaterThan(0);
    }
  });

  it("every service has at least one tech badge", () => {
    for (const s of SERVICES) {
      expect(s.techBadges.length).toBeGreaterThan(0);
    }
  });

  it("accentColor and bgColor are valid hex strings", () => {
    const hex = /^#[0-9a-f]{3,6}$/i;
    for (const s of SERVICES) {
      expect(s.accentColor).toMatch(hex);
      expect(s.bgColor).toMatch(hex);
    }
  });

  it("first service is topics", () => {
    expect(SERVICES[0].id).toBe("topics");
    expect(SERVICES[0].step).toBe(1);
  });

  it("last service is stitcher", () => {
    expect(SERVICES[4].id).toBe("stitcher");
    expect(SERVICES[4].step).toBe(5);
  });

  it("pipeline order follows topics → script → audio → video → stitcher", () => {
    expect(SERVICES.map((s) => s.id)).toEqual([
      "topics",
      "script",
      "audio",
      "video",
      "stitcher",
    ]);
  });
});

describe("GITHUB_ORG", () => {
  it("is a string", () => {
    expect(typeof GITHUB_ORG).toBe("string");
  });

  it("points to the kashline org", () => {
    expect(GITHUB_ORG).toContain("kashline");
  });

  it("is a valid-looking URL", () => {
    expect(GITHUB_ORG).toMatch(/^https?:\/\//);
  });
});
