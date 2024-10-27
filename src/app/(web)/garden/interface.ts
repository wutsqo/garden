const ContentTypes = [
  "Project",
  "Image",
  "Dev Log",
  "Notes",
  "Quotes",
] as const;
export type ContentType = (typeof ContentTypes)[number];

export interface GardenContent {
  title: string;
  description: string;
  isPublished: string;
  createdAt: number;
  updatedAt: number;
  type: ContentType;
  image: string;
  imageHover?: string;
}
