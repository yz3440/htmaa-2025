import React from "react";
import { cn } from "@/lib/utils";

const GridSection = ({
  children,
  columnCount,
}: {
  children: React.ReactNode;
  columnCount?: number;
}) => {
  const count = columnCount ?? React.Children.toArray(children).length;
  const template = count ? "1fr ".repeat(count) : undefined;

  return (
    <section
      className={cn(
        "mb-2 mt-2 gap-2 text-lg lg:gap-x-8 lg:gap-y-6",
        "pb-4",
        "flex flex-col",
        "grid-flow-row lg:grid",
        "[&>*]:mb-auto [&>*]:mt-0",
      )}
      style={{
        gridTemplateColumns: template,
      }}
    >
      {children}
    </section>
  );
};

export default GridSection;
