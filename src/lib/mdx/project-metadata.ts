export type ProjectMetadata = {
  // main metadata
  title: string;
  titleShort?: string;
  categories: ProjectCategory[];
  displayedCategory: string;

  // time
  date: string;
  year: number;
  displayedDate?: string;

  // additional metadata
  description: string;
  shortDescription?: string;
  tags?: string[];
  notes?: string;

  // links
  externalLink?: string;
  videoLink?: string;
  githubLink?: string;
  overrideLink?: string;
  socialMediaLink?: string;

  // ranking
  priority?: number; // the higher the number, the higher the priority

  // press
  pressLinks?: { title: string; url: string }[];
  featuredInLinks?: { title: string; url: string }[];
  publicationLinks?: { title: string; url: string }[];

  // collaboration
  collaborators?: string[];
  contributors?: string[];
  roles?: string[];

  // image
  image: string;
  video?: string;

  // visibility
  visible: boolean;
  featured: boolean;

  // layout
  tableOfContents?: boolean;
};

export enum ProjectCategory {
  Art = "art",
  Design = "design",
  Research = "research",
  Installation = "installation",
  Film = "film",
  Imagery = "imagery",
  WebBased = "web-based",
  Others = "others",
}
