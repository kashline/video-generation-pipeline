import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "@/components/Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card><p>Card content</p></Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders as a div", () => {
    const { container } = render(<Card>x</Card>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("applies additional className", () => {
    const { container } = render(<Card className="custom-class">x</Card>);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("applies inline style", () => {
    const { container } = render(
      <Card style={{ backgroundColor: "#eef2ff" }}>x</Card>
    );
    expect(container.firstChild).toHaveStyle({ backgroundColor: "#eef2ff" });
  });

  it("includes base rounded and border classes", () => {
    const { container } = render(<Card>x</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("rounded-2xl");
    expect(el.className).toContain("border");
  });
});
