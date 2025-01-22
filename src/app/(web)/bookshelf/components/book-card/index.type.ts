import { Book } from "@/payload.types";

export interface BookCardProps {
  book: Partial<Book>;
  delay?: number;
}
