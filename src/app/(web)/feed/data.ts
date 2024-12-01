import { XMLParser } from "fast-xml-parser";
import { FeedItem, RSSChannel } from "./interface";

const CHANNELS = [
  "https://www.lesswrong.com/feed.xml?view=frontpage-rss&karmaThreshold=75",
  "https://www.joshwcomeau.com/rss.xml",
  // "https://hnrss.org/frontpage",
  "https://samsarigged.substack.com/feed",
  "https://medium.com/@a.hamardikan/feed",
  // "https://www.astralcodexten.com/feed",
  "https://maggieappleton.com/rss.xml",
  "http://www.aaronsw.com/2002/feeds/pgessays.rss",
];

const parser = new XMLParser();

export const getFeeds = async () => {
  const feedPromises = CHANNELS.map(async (channel) => {
    const response = await fetch(channel);
    const xml = await response.text();
    const data = parser.parse(xml);
    return {
      ...data.rss.channel,
      item: data.rss.channel.item.slice(0, 10),
    } as RSSChannel;
  });
  const res = await Promise.all(feedPromises);
  const channels = res.map((channel) => ({
    title: channel.title,
    link: channel.link,
    description: channel.description,
  }));
  const items = res
    .reduce((acc, feed) => {
      return [
        ...acc,
        ...feed.item.map((item) => ({
          ...item,
          channel: feed.title,
          channelLink: item.comments ?? feed.link,
          creator: item["dc:creator"] ?? feed.title,
          description: item.description ?? item["content:encoded"],
        })),
      ];
    }, [] as FeedItem[])
    .sort((a, b) => {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    });
  return {
    lastUpdated: new Date(),
    channels,
    items: items,
  };
};
