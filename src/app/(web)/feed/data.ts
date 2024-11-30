import { XMLParser } from "fast-xml-parser";
import { FeedItem, RSSChannel } from "./interface";

const CHANNELS = [
  "https://www.lesswrong.com/feed.xml?view=frontpage-rss&karmaThreshold=75",
  "https://www.joshwcomeau.com/rss.xml",
  "hackernews", // Special identifier for HN
];

const parser = new XMLParser();

const fetchHackerNews = async () => {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  );
  const storyIds = await response.json();
  const stories = await Promise.all(
    storyIds.slice(0, 3).map(async (id: number) => {
      const storyResponse = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      return storyResponse.json();
    })
  );
  return {
    title: "Hacker News",
    link: "https://news.ycombinator.com",
    description: "Top stories from Hacker News",
    item: stories.map((story) => ({
      title: story.title,
      link: story.url,
      pubDate: new Date(story.time * 1000).toISOString(),
      description: `Points: ${story.score} | Comments: ${story.descendants}`,
      guid: story.id.toString(),
      "dc:creator": story.by,
    })),
  } as RSSChannel;
};

export const getFeeds = async () => {
  const feedPromises = CHANNELS.map(async (channel) => {
    if (channel === "hackernews") return fetchHackerNews();
    const response = await fetch(channel);
    const xml = await response.text();
    const data = parser.parse(xml);
    return data.rss.channel as RSSChannel;
  });
  const feeds = await Promise.all(feedPromises);
  const channels = feeds.map((channel) => ({
    title: channel.title,
    link: channel.link,
    description: channel.description,
  }));
  const items = feeds
    .reduce((acc, feed) => {
      return [
        ...acc,
        ...feed.item.map((item) => ({
          ...item,
          channel: feed.title,
          channelLink: feed.link,
        })),
      ];
    }, [] as FeedItem[])
    .sort((a, b) => {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
    });
  return {
    lastUpdated: new Date(),
    channels,
    items: items.slice(0, 10),
  };
};
