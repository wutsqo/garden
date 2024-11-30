import { XMLParser } from "fast-xml-parser";
import { FeedItem, RSSChannel } from "./interface";

const CHANNELS = [
  "https://www.lesswrong.com/feed.xml?view=frontpage-rss&karmaThreshold=75",
  "https://www.joshwcomeau.com/rss.xml",
  "https://hnrss.org/frontpage",
];

const parser = new XMLParser();

export const getFeeds = async () => {
  const feedPromises = CHANNELS.map(async (channel) => {
    const response = await fetch(channel);
    const xml = await response.text();
    const data = parser.parse(xml);
    return {
      ...data.rss.channel,
      item: data.rss.channel.item.slice(0, 3),
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
        })),
      ];
    }, [] as FeedItem[])
    .sort((a, b) => {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    })
    .filter((item) => {
      const publishedDate = new Date(item.pubDate);
      const now = new Date();
      const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
      return publishedDate > oneWeekAgo;
    });
  return {
    lastUpdated: new Date(),
    channels,
    items: items.slice(0, 20),
  };
};
