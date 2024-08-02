export interface BookmarkTag {
  id: string;
  name: string;
}

export interface BookmarkItem {
  id: string;
  title: string;
  url: string;
  comment?: string;
  date: string;
  tags: BookmarkTag[];
}

export interface BookmarkContextProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export interface BookmarkContextValue {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}
