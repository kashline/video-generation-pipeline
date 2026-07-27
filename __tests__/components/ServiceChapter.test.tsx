import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceChapter } from "@/components/ServiceChapter";
import { SERVICES } from "@/lib/pipeline";

// Use the first and last service to cover both ends of the pipeline
const scheduler = SERVICES[0];
const publish = SERVICES[SERVICES.length - 1];

describe("ServiceChapter", () => {
  it("renders the service name as a heading", () => {
    render(<ServiceChapter service={scheduler} visual={<div />} />);
    expect(screen.getByText(scheduler.name)).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    render(<ServiceChapter service={scheduler} visual={<div />} />);
    expect(screen.getByText(scheduler.tagline)).toBeInTheDocument();
  });

  it("renders the step number", () => {
    render(<ServiceChapter service={scheduler} visual={<div />} />);
    // The step badge and "Step N" label both reference the step number
    expect(screen.getAllByText(String(scheduler.step)).length).toBeGreaterThan(0);
  });

  it("renders all tech badges", () => {
    render(<ServiceChapter service={scheduler} visual={<div />} />);
    for (const badge of scheduler.techBadges) {
      expect(screen.getByText(badge)).toBeInTheDocument();
    }
  });

  it("renders all input labels", () => {
    render(<ServiceChapter service={scheduler} visual={<div />} />);
    for (const input of scheduler.inputs) {
      expect(screen.getByText(input)).toBeInTheDocument();
    }
  });

  it("renders all output labels", () => {
    render(<ServiceChapter service={scheduler} visual={<div />} />);
    for (const output of scheduler.outputs) {
      expect(screen.getByText(output)).toBeInTheDocument();
    }
  });

  it("renders the visual slot", () => {
    render(
      <ServiceChapter
        service={scheduler}
        visual={<div data-testid="visual-slot" />}
      />
    );
    expect(screen.getByTestId("visual-slot")).toBeInTheDocument();
  });

  it("sets the correct section id", () => {
    const { container } = render(
      <ServiceChapter service={scheduler} visual={<div />} />
    );
    expect(container.querySelector(`#service-${scheduler.id}`)).not.toBeNull();
  });

  it("renders no outbound links — the source repositories are private", () => {
    const { container } = render(
      <ServiceChapter service={scheduler} visual={<div />} />
    );
    expect(container.querySelectorAll("a")).toHaveLength(0);
  });

  it("renders correctly for the publish service too", () => {
    render(<ServiceChapter service={publish} visual={<div />} />);
    expect(screen.getByText(publish.name)).toBeInTheDocument();
    expect(screen.getByText(publish.tagline)).toBeInTheDocument();
  });
});
