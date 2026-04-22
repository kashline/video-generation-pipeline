import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("returns an empty string when called with no arguments", () => {
    expect(cn()).toBe("");
  });

  it("joins multiple class strings with spaces", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("filters out falsy values", () => {
    expect(cn("a", false && "b", undefined, null, "c")).toBe("a c");
  });

  it("handles conditional object syntax from clsx", () => {
    expect(cn({ active: true, inactive: false })).toBe("active");
  });

  it("merges conflicting Tailwind classes — last one wins", () => {
    expect(cn("p-4", "p-8")).toBe("p-8");
  });

  it("merges conflicting bg-* classes — last one wins", () => {
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });

  it("preserves non-conflicting classes alongside merged ones", () => {
    const result = cn("flex", "items-center", "p-4", "p-8");
    expect(result).toContain("flex");
    expect(result).toContain("items-center");
    expect(result).toContain("p-8");
    expect(result).not.toContain("p-4");
  });

  it("handles array inputs", () => {
    expect(cn(["px-2", "py-1"])).toBe("px-2 py-1");
  });
});
