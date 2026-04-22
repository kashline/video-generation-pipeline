import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceChapter } from "@/components/ServiceChapter";
import { SERVICES } from "@/lib/pipeline";

// Use the first and last service to cover both ends of the pipeline
const topics = SERVICES[0];
const stitcher = SERVICES[4];

describe("ServiceChapter", () => {
  it("renders the service name as a heading", () => {
    render(<ServiceChapter service={topics} visual={<div />} />);
    expect(screen.getByText(topics.name)).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    render(<ServiceChapter service={topics} visual={<div />} />);
    expect(screen.getByText(topics.tagline)).toBeInTheDocument();
  });

  it("renders the step number", () => {
    render(<ServiceChapter service={topics} visual={<div />} />);
    // The step badge and "Step N" label both reference the step number
    expect(screen.getAllByText(String(topics.step)).length).toBeGreaterThan(0);
  });

  it("renders all tech badges", () => {
    render(<ServiceChapter service={topics} visual={<div />} />);
    for (const badge of topics.techBadges) {
      expect(screen.getByText(badge)).toBeInTheDocument();
    }
  });

  it("renders all input labels", () => {
    render(<ServiceChapter service={topics} visual={<div />} />);
    for (const input of topics.inputs) {
      expect(screen.getByText(input)).toBeInTheDocument();
    }
  });

  it("renders all output labels", () => {
    render(<ServiceChapter service={topics} visual={<div />} />);
    for (const output of topics.outputs) {
      expect(screen.getByText(output)).toBeInTheDocument();
    }
  });

  it("renders the visual slot", () => {
    render(
      <ServiceChapter
        service={topics}
        visual={<div data-testid="visual-slot" />}
      />
    );
    expect(screen.getByTestId("visual-slot")).toBeInTheDocument();
  });

  it("sets the correct section id", () => {
    const { container } = render(
      <ServiceChapter service={topics} visual={<div />} />
    );
    expect(
      container.querySelector(`#service-${topics.id}`)
    ).not.toBeNull();
  });

  it("links to the correct GitHub repo", () => {
    render(<ServiceChapter service={topics} visual={<div />} />);
    const link = screen.getByRole("link", {
      name: new RegExp(topics.githubSlug),
    });
    expect(link).toHaveAttribute(
      "href",
      `https://github.com/kashline/${topics.githubSlug}`
    );
  });

  it("renders correctly for the stitcher service too", () => {
    render(<ServiceChapter service={stitcher} visual={<div />} />);
    expect(screen.getByText(stitcher.name)).toBeInTheDocument();
    expect(screen.getByText(stitcher.tagline)).toBeInTheDocument();
  });
});
