"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselProps,
  type CarouselApi,
} from "@/components/ui/carousel";

interface CarouselSectionProps extends CarouselProps {
  children: React.ReactNode;
}

const CarouselSection = ({ children, ...props }: CarouselSectionProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const length = React.Children.toArray(children).length;

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // const { md } = useBreakPoint();
  const wrappedChildren = React.Children.map(children, (child) => (
    <CarouselItem className="my-auto">{child}</CarouselItem>
  ));

  const dottedIndicators = Array.from({ length }, (_, i) => (
    <div
      key={i}
      className={cn(
        "h-2 w-2 rounded-full",
        "bg-foreground/50",
        "concave",
        current === i + 1 && "white-glow-lg bg-foreground",
        "transition-all duration-500",
      )}
    />
  ));

  return (
    <Carousel {...props} className="mx-4" setApi={(api) => setApi(api)}>
      <CarouselContent>{wrappedChildren}</CarouselContent>
      <CarouselPrevious
        variant={"secondary"}
        className="hidden md:inline-flex"
      />
      <CarouselNext variant={"secondary"} className="hidden md:inline-flex" />
      <div className="flex items-center justify-center gap-2 md:hidden">
        {dottedIndicators}
      </div>
    </Carousel>
  );
};

// export default dynamic(() => Promise.resolve(CarouselSection), { ssr: false });
export default CarouselSection;
