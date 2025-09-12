import { cn } from "@/lib/utils";

export function HoverEffectContainer({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        `overflow-hidden rounded-xl border border-foreground/50 transition-all hover:border-foreground/30 hover:brightness-[1.1] hover:saturate-[1.1]`,
        `white-glow-md hover:white-glow-xl`,
        props.className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
