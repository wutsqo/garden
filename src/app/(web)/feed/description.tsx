"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@components/tooltip";
import { FC } from "react";

interface Props {
  updatedAt: string;
  channels: { title: string; link: string; description: string }[];
}

const PageDescription: FC<Props> = ({ channels, updatedAt }) => {
  return (
    <div>
      Feed from my favorite
      <Tooltip placement="bottom">
        <TooltipTrigger asChild>
          <span> blogs and forums. </span>
        </TooltipTrigger>
        <TooltipContent className="bg-white max-w-md border border-black shadow-lg p-2 rounded text-sm">
          <ul>
            {channels.map((channel) => (
              <li key={channel.title}>{channel.title}</li>
            ))}
          </ul>
        </TooltipContent>
      </Tooltip>
      Auto-updated on {updatedAt}.
    </div>
  );
};

export default PageDescription;
