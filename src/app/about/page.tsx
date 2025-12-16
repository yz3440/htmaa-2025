import { cn } from "@/lib/utils";
import Layout from "@/components/layout";
import { AboutCard } from "./_components/about-card";
import { type Metadata } from "next";
import { CustomMDX } from "@/components/mdx";
import { readMDXFile } from "@/lib/mdx/parser";
import path from "path";

export const metadata: Metadata = {
  title: "About",
};

export default function Home() {
  const mdxPath = path.join(process.cwd(), "src", "app", "about", "about.mdx");
  const { content } = readMDXFile(mdxPath);

  return (
    <Layout layoutContext="project-detail">
      <div id="project-cards" className={cn(`flex flex-col px-2`)}>
        <div className="border-b border-dashed border-foreground/50">
          <AboutCard />
        </div>
      </div>
      <article className="mt-6">
        <CustomMDX source={content} />
      </article>
    </Layout>
  );
}
