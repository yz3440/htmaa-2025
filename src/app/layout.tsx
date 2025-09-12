import "@/styles/globals.css";

import { type Metadata } from "next";
import {
  texGyreHeros,
  texGyreHerosCondensed,
  glowSansSCCompressed,
  redaction50,
} from "./fonts";
import { cn } from "@/lib/utils";
import PlausibleProvider from "next-plausible";
import { baseUrl } from "./sitemap";

export const metadata: Metadata = {
  title: {
    default: "Yufeng Zhao",
    template: "%s - Yufeng Zhao",
  },
  description: `Yufeng Zhao is a media artist and technologist based in Brooklyn.`,
  keywords: [
    "Yufeng",
    "Zhao",
    "Yufeng Zhao",
    "media artist",
    "creative technologist",
    "technologist",
    "Brooklyn",
  ],
  metadataBase: new URL(baseUrl),
  openGraph: {
    siteName: "Yufeng Zhao",
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
      <head>
        <PlausibleProvider
          domain="yufengzhao.com"
          customDomain="https://plausible.yufeng.place"
          enabled={true}
          selfHosted={true}
          trackFileDownloads={true}
          trackOutboundLinks={true}
          trackLocalhost={true}
          taggedEvents={true}
        />
      </head>
      <body className="">
        {children}
        {/* <Suspense fallback={<div></div>}>
          <BackgroundElement />
        </Suspense> */}
      </body>
    </html>
  );
}
