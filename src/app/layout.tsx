import "@/styles/globals.css";

import { type Metadata } from "next";
import {
  texGyreHeros,
  texGyreHerosCondensed,
  glowSansSCCompressed,
  redaction50,
} from "./fonts";
import { cn } from "@/lib/utils";
import { baseUrl } from "./sitemap";
import { Suspense } from "react";
import BackgroundElement from "@/components/three/background-element";

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
  metadataBase: new URL(baseUrl),
  openGraph: {
    siteName: "How to Make Almost Anything with Yufeng Zhao",
    url: baseUrl,
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
        {/* <Suspense fallback={<div></div>}>
          <BackgroundElement />
        </Suspense> */}
      </body>
    </html>
  );
}
