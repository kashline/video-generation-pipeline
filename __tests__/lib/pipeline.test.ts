import { describe, it, expect } from "vitest";
import { SERVICES } from "@/lib/pipeline";

describe("SERVICES", () => {
  it("has exactly 8 services", () => {
    expect(SERVICES).toHaveLength(8);
  });

  it("steps run sequentially from 1 to 8", () => {
    expect(SERVICES.map((s) => s.step)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("every service has required non-empty string fields", () => {
    for (const s of SERVICES) {
      expect(s.id).toBeTruthy();
      expect(s.slug).toBeTruthy();
      expect(s.name).toBeTruthy();
      expect(s.tagline).toBeTruthy();
      expect(s.purpose).toBeTruthy();
      expect(s.queueIn).toBeTruthy();
    }
  });

  it("slug matches id for every service", () => {
    for (const s of SERVICES) {
      expect(s.slug).toBe(s.id);
    }
  });

  it("ids and slugs are unique across the array", () => {
    expect(new Set(SERVICES.map((s) => s.id)).size).toBe(SERVICES.length);
    expect(new Set(SERVICES.map((s) => s.slug)).size).toBe(SERVICES.length);
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

  it("first service is the scheduler, last is publish", () => {
    expect(SERVICES[0].id).toBe("enqueue");
    expect(SERVICES[SERVICES.length - 1].id).toBe("publish");
  });

  it("matches the deployed worker order", () => {
    expect(SERVICES.map((s) => s.id)).toEqual([
      "enqueue",
      "topics",
      "script",
      "evaluation",
      "audio",
      "video",
      "stitcher",
      "publish",
    ]);
  });

  /**
   * The queue graph is the load-bearing claim on the page: each worker must
   * consume what the previous one produced. `enqueue` is the exception — it is
   * cron-triggered and writes to the queue it nominally reads.
   */
  it("forms a connected queue chain from topics onward", () => {
    const chain = SERVICES.filter((s) => s.id !== "enqueue");
    for (let i = 1; i < chain.length; i++) {
      expect(chain[i].queueIn).toBe(chain[i - 1].queueOut);
    }
  });

  it("only the terminal stage has no output queue", () => {
    const terminal = SERVICES.filter((s) => s.queueOut === null);
    expect(terminal).toHaveLength(1);
    expect(terminal[0].id).toBe("publish");
  });

  it("exposes no GitHub links — the source repositories are private", () => {
    expect(JSON.stringify(SERVICES)).not.toContain("github");
  });
});
