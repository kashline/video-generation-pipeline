import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container({ className, children }, ref) {
    return (
      <div ref={ref} className={cn("mx-auto w-full max-w-6xl px-6 md:px-10", className)}>
        {children}
      </div>
    );
  }
);

