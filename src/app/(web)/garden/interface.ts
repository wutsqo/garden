export interface Notes {
  id: string;
  title: string;
  tags: string[];
  created: string;
  updated: string;
  content: string;
  backlinks: string[];
  isCollection?: boolean;
}
