"use client";

import { FC, useState } from "react";
import { FeedItem, FeedSource } from "./interface";
import { formatRelativeDate } from "@utils/dates";

interface Props {
  items: FeedItem[];
  channels: FeedSource[];
}

const Feed: FC<Props> = ({ items, channels }) => {
  const [search, setSearch] = useState("");
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 border border-gray-300 rounded-md mt-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 gap-4 mt-4 divide-y border-y pb-4">
        {filteredItems.map((item) => (
          <div key={item.guid} className="pt-2">
            <a
              className="text-lg font-sans font-medium hover:underline"
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.title}
            </a>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              <span>by</span>{" "}
              <span className="font-sans font-medium">
                {item["dc:creator"]}
              </span>{" "}
              <span>
                on{" "}
                <a
                  href={item.channelLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans font-medium hover:underline"
                >
                  {item.channel}
                </a>
              </span>{" "}
              <span>({formatRelativeDate(item.pubDate)})</span>
            </p>
          </div>
        ))}
        {filteredItems.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No results found</p>
        )}
      </div>
    </>
  );
};

export default Feed;
