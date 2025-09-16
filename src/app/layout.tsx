import "@/styles/globals.css";

import { type Metadata } from "next";
import {
  texGyreHeros,
  texGyreHerosCondensed,
  glowSansSCCompressed,
  redaction50,
} from "./fonts";
import { cn } from "@/lib/utils";
import { env } from "@/env.js";
import BackgroundElement from "@/components/three/background-element";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    default: "How to Make Almost Anything with Yufeng Zhao",
    template: "%s - HTMAA w/ Yufeng Zhao",
  },
  description: `How to Make Almost Anything with Yufeng Zhao.`,
  keywords: [
    "Yufeng",
    "Zhao",
    "Yufeng Zhao",
    "How to Make Almost Anything",
    "MIT Media Lab",
    "Center for Bits and Atoms",
  ],
  metadataBase: env.NEXT_PUBLIC_BASE_URL
    ? new URL(env.NEXT_PUBLIC_BASE_URL)
    : undefined,
  openGraph: {
    siteName: "How to Make Almost Anything with Yufeng Zhao",
    url: env.NEXT_PUBLIC_DOMAIN ?? "",
  },
};

export const dynamic = "force-static";
export const revalidate = 3600;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        "font-sans",
        texGyreHeros.variable,
        texGyreHerosCondensed.variable,
        glowSansSCCompressed.variable,
        redaction50.variable,
      )}
    >
      <head></head>
      <body className="">
        {children}
        <Suspense fallback={<div></div>}>
          <BackgroundElement />
        </Suspense>
      </body>
    </html>
  );
}
