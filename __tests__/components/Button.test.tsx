import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/Button";

describe("Button", () => {
  it("renders as a <button> by default", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("renders as an <a> when href is provided", () => {
    render(<Button href="https://github.com/kashline">GitHub</Button>);
    const link = screen.getByRole("link", { name: "GitHub" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://github.com/kashline");
  });

  it("primary variant applies dark background class", () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole("button").className).toContain("bg-neutral-900");
  });

  it("secondary variant applies white background and border", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("bg-white");
    expect(btn.className).toContain("border");
  });

  it("ghost variant applies no filled background", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).not.toContain("bg-neutral-900");
    expect(btn.className).not.toContain("bg-white");
  });

  it("lg size applies larger padding class", () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button").className).toContain("px-7");
  });

  it("sm size applies smaller padding class", () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button").className).toContain("px-4");
  });

  it("forwards onClick to the button element", async () => {
    const { vi } = await import("vitest");
    const handler = vi.fn();
    render(<Button onClick={handler}>Clickable</Button>);
    screen.getByRole("button").click();
    expect(handler).toHaveBeenCalledOnce();
  });
});
