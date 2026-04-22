import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Gemini 2.5 Pro</Badge>);
    expect(screen.getByText("Gemini 2.5 Pro")).toBeInTheDocument();
  });

  it("renders as a span element", () => {
    render(<Badge>label</Badge>);
    expect(screen.getByText("label").tagName).toBe("SPAN");
  });

  it("applies additional className", () => {
    render(<Badge className="extra-class">label</Badge>);
    expect(screen.getByText("label").className).toContain("extra-class");
  });

  it("applies inline style", () => {
    render(<Badge style={{ color: "rgb(255, 0, 0)" }}>styled</Badge>);
    expect(screen.getByText("styled")).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });
});
