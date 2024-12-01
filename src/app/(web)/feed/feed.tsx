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
      item.channel.toLowerCase().includes(search.toLowerCase())
  );
  const channelMap = channels.reduce((acc, channel) => {
    acc[channel.title] = channel.description;
    return acc;
  }, {} as Record<string, string>);
  return (
    <>
      <Input
        type="text"
        placeholder="Search"
        className="mt-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 gap-4 mt-4 divide-y border-y pb-4">
        {filteredItems.map((item) => (
          <div key={item.guid ?? item.link} className="pt-2">
            <Tooltip placement="bottom">
              <TooltipTrigger asChild>
                <a
                  className="text-lg font-sans font-medium hover:underline"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.title}
                </a>
              </TooltipTrigger>
              <TooltipContent
                className="bg-white border border-black shadow-lg p-2 rounded max-w-sm max-h-96 overflow-hidden prose prose-sm opacity-0 animation-delay-200 animate-fade-in"
                dangerouslySetInnerHTML={{
                  __html: item.description ?? item.title,
                }}
              />
            </Tooltip>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              <span>by</span>{" "}
              <span className="font-sans font-medium">{item.creator}</span>{" "}
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
                  <TooltipContent className="bg-white border border-black shadow-lg p-2 rounded max-w-sm text-sm opacity-0 animation-delay-200 animate-fade-in">
                    {channelMap[item.channel]}
                  </TooltipContent>
                </Tooltip>
              </span>{" "}
              <span>
                ({item.pubDate ? formatRelativeDate(item.pubDate) : "no date"})
              </span>
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
