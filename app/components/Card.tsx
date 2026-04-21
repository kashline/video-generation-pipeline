import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Card({ className, children, style }: CardProps) {
  return (
    <div
      style={style}
      className={cn(
        "rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
