"use client";

import { useWindowSize } from "@uidotdev/usehooks";
import { useMemo } from "react";
import Zoom, { type UncontrolledProps } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export function ZoomableContainer({
  children,
  zoomMargin,
  ...props
}: UncontrolledProps) {
  const { width } = useWindowSize();

  const zoomMargin_ = useMemo(() => {
    if (!width) return 0;
    if (width < 768) {
      return 0;
    }
    return 100;
  }, [width]);

  return (
    <Zoom
      zoomMargin={zoomMargin_}
      classDialog="custom-zoom"
      wrapElement="span"
      // IconUnzoom={null}
      // IconZoom={null}
      {...props}
    >
      {children}
    </Zoom>
  );
}

// Add styles using CSS-in-JS
const styles = `
  .custom-zoom [data-rmiz-modal-overlay],
  .custom-zoom [data-rmiz-modal-img] {
    transition-duration: 0.3s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  .custom-zoom [data-rmiz-modal-overlay="hidden"] {
    background-color: rgba(10, 10, 10, 0);
  }
  .custom-zoom [data-rmiz-modal-overlay="visible"] {
    background-color: rgba(10, 10, 10, 0.5);
    backdrop-filter: blur(4px);
  }
  .custom-zoom img {
    border-radius: 0.5rem;
  }
  .custom-zoom [data-rmiz-btn-unzoom] {
    display: none;
  }
  .custom-zoom [data-rmiz-btn-unzoom]:focus-visible {
    display: none;
  }
  .custom-zoom:focus-visible {
    display: none;
  }
`;

// Insert styles into document head
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
