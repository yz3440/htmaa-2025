import fs from "fs";
import path from "path";
import { type ProjectMetadata } from "./project-metadata";
import matter from "gray-matter";
import { slugify } from "../utils";

export type TableOfContents = {
  level: number;
  text: string;
  slug: string;
}[];

export type ProjectEntry = {
  metadata: ProjectMetadata;
  slug: string;
  content: string;
  tableOfContents: TableOfContents;
};

function parseFrontmatter(fileContent: string) {
  const parsedMatter = matter(fileContent);

  const content = parsedMatter.content;

  const metadata: Partial<ProjectMetadata> = parsedMatter.data;

  const tableOfContents = generateTableOfContents(content);

  return {
    metadata: metadata as ProjectMetadata,
    content,
    tableOfContents,
  };
}

function generateTableOfContents(content: string) {
  const headingRegex = /^(#{1,6})\s+(.*)$/gm;
  const toc = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1]?.length ?? 0;
    const text = match[2] ?? "";
    const slug = slugify(text);
    toc.push({ level, text, slug });
  }

  return toc;
}

function getMDXFilesRecursive(dir: string) {
  const files = fs.readdirSync(dir);
  const allFiles: string[] = files.flatMap((file) => {
    const filePath = path.join(dir, file);
    const isDirectory = fs.statSync(filePath).isDirectory();
    if (isDirectory) {
      return getMDXFilesRecursive(filePath);
    }
    return filePath;
  });
  return allFiles.flat().filter((file) => path.extname(file) === ".mdx");
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

export function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string): ProjectEntry[] {
  const mdxFiles = getMDXFilesRecursive(dir);
  return mdxFiles.map((file) => {
    const { metadata, content, tableOfContents } = readMDXFile(file);
    const slug = slugify(metadata.title);

    return {
      metadata,
      slug,
      content,
      tableOfContents,
    };
  });
}

function getAppDirectory() {
  return path.join(process.cwd(), "src", "app");
}

export function getAllProjects(): ProjectEntry[] {
  const dir = path.join(process.cwd());
  return getMDXData(path.join(dir, "projects"));
}
