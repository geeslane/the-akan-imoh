import "server-only";

import type { Essay } from "@/lib/types";

function decode(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCharCode(parseInt(code, 16)));
}

function readTag(block: string, name: string) {
  const pattern = new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i");
  const match = block.match(pattern);
  return match ? decode(match[1]).trim() : "";
}

function excerptFrom(html: string) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .trim();

  if (text.length <= 180) return text;
  return `${text.slice(0, 177).replace(/\s+\S*$/, "")}…`;
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function parseFeed(xml: string): Essay[] {
  return xml
    .split(/<item\b[^>]*>/i)
    .slice(1)
    .flatMap((chunk) => {
      const block = chunk.split(/<\/item>/i)[0] ?? "";
      const title = readTag(block, "title").replace(/<[^>]+>/g, "").trim();
      const url = (readTag(block, "link") || readTag(block, "guid")).replace(/\s+/g, "");
      const body = readTag(block, "content:encoded") || readTag(block, "description");
      const rawDate = readTag(block, "pubDate");
      const parsedDate = new Date(rawDate);
      if (!title || !url.startsWith("http")) return [];

      const essay: Essay = {
        title,
        url,
        excerpt: excerptFrom(body),
        date: formatDate(rawDate),
        published: Number.isNaN(parsedDate.getTime()) ? "" : parsedDate.toISOString(),
      };
      return [essay];
    });
}

export async function getEssays(): Promise<Essay[]> {
  const feedUrl = process.env.SUBSTACK_FEED_URL?.trim() || "https://theakanimoh.substack.com/feed";

  try {
    const response = await fetch(feedUrl, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml",
        "User-Agent": "AkanImohWebsite/1.0",
      },
    });

    if (!response.ok) return [];
    return parseFeed(await response.text()).slice(0, 3);
  } catch {
    return [];
  }
}
