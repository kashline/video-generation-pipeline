import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StageVisual } from "@/components/visuals/StageVisual";
import { SERVICES } from "@/lib/pipeline";

const scheduler = SERVICES[0];
const script = SERVICES[2];
const publish = SERVICES[SERVICES.length - 1];

describe("StageVisual", () => {
  it("renders the stage name and step for every service", () => {
    for (const service of SERVICES) {
      const { unmount } = render(<StageVisual service={service} />);
      expect(screen.getByText(service.name)).toBeInTheDocument();
      unmount();
    }
  });

  it("shows the inbound and outbound queue names", () => {
    render(<StageVisual service={script} />);
    expect(screen.getByText(script.queueIn)).toBeInTheDocument();
    expect(screen.getByText(script.queueOut!)).toBeInTheDocument();
  });

  it("labels the scheduler as cron-triggered rather than queue-fed", () => {
    render(<StageVisual service={scheduler} />);
    expect(screen.getByText("Scheduled trigger")).toBeInTheDocument();
    expect(screen.getByText("EventBridge cron")).toBeInTheDocument();
  });

  it("renders a terminal outcome for the final stage", () => {
    render(<StageVisual service={publish} />);
    expect(screen.getByText("Published to YouTube")).toBeInTheDocument();
  });

  it("renders every tech badge for the stage", () => {
    render(<StageVisual service={script} />);
    for (const badge of script.techBadges) {
      expect(screen.getByText(badge)).toBeInTheDocument();
    }
  });
});
