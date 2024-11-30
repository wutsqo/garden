export interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: string;
  "dc:creator"?: string;
  comments?: string;
  "content:encoded"?: string;
}
export interface RSSChannel {
  title: string;
  link: string;
  description: string;
  lastBuildDate: string;
  item: RSSItem[];
}
export interface FeedItem extends RSSItem {
  channel: string;
  channelLink: string;
  creator: string;
  description: string;
}
export interface FeedSource {
  title: string;
  link: string;
  description: string;
}
