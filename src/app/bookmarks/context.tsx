"use client";

import { createContextProvider } from "@utils/create-context-provider";
import {
  BookmarkContextProviderProps,
  BookmarkContextValue,
} from "./interface";
import { FC, useState } from "react";

const { useProvider, Provider } =
  createContextProvider<BookmarkContextValue>("CheckoutContext");

export const useBookmarkContext = useProvider;

export const BookmarkContextProvider: FC<BookmarkContextProviderProps> = ({
  children,
  ...props
}) => {
  const [search, setSearch] = useState("");
  const value: BookmarkContextValue = {
    search,
    setSearch,
  };

  return <Provider value={value}>{children}</Provider>;
};
