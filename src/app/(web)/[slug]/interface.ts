export type Params = Promise<{
  slug: string;
}>;

export interface PageMetadata {
  title: string;
  status: string;
  description: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
}
