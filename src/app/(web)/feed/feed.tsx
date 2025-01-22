"use client";

import { FC, useState } from "react";
import { FeedItem, FeedSource } from "./interface";
import { formatRelativeDate } from "@utils/dates";
import Input from "@components/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@components/tooltip";

interface Props {
  items: FeedItem[];
  channels: FeedSource[];
}

const Feed: FC<Props> = ({ items, channels }) => {
  const [search, setSearch] = useState("");
  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.creator.toLowerCase().includes(search.toLowerCase()) ||
      item.channel.toLowerCase().includes(search.toLowerCase()),
  );
  const channelMap = channels.reduce(
    (acc, channel) => {
      acc[channel.title] = channel.description;
      return acc;
    },
    {} as Record<string, string>,
  );
  return (
    <>
      <Input
        type="text"
        placeholder="Search"
        className="mt-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="mt-4 grid grid-cols-1 divide-y divide-gray-200 border-y border-gray-200 pb-4">
        {filteredItems.map((item) => (
          <div key={item.guid ?? item.link} className="pt-4">
            <Tooltip placement="bottom">
              <TooltipTrigger asChild>
                <a
                  className="font-sans text-lg font-medium hover:underline"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.title}
                </a>
              </TooltipTrigger>
              <TooltipContent
                className="prose prose-sm animation-delay-200 animate-fade-in max-h-96 max-w-sm overflow-hidden rounded border border-black bg-white p-2 opacity-0 shadow-lg"
                dangerouslySetInnerHTML={{
                  __html: item.description ?? item.title,
                }}
              />
            </Tooltip>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm pb-4">
              <span>by</span> <span className="font-sans font-medium">{item.creator}</span>{" "}
              <span>
                on{" "}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={item.channelLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans font-medium hover:underline"
                    >
                      {item.channel}
                    </a>
                  </TooltipTrigger>
                  <TooltipContent className="animation-delay-200 animate-fade-in max-w-sm rounded border border-black bg-white p-2 text-sm opacity-0 shadow-lg">
                    {channelMap[item.channel]}
                  </TooltipContent>
                </Tooltip>
              </span>{" "}
              <span>({item.pubDate ? formatRelativeDate(item.pubDate) : "no date"})</span>
            </p>
          </div>
        ))}
        {filteredItems.length === 0 && <p className="mt-4 text-center text-gray-500">No results found</p>}
      </div>
    </>
  );
};

export default Feed;
