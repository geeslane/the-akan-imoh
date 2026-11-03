import "server-only";

import { cleanText, parseCsv, pick, slugify, youtubeIdFrom } from "@/lib/csv";
import type { GalleryItem, Story } from "@/lib/types";

const SHEET_ID_PATTERN = /^[\w-]{20,}$/;

function sheetUrl(sheetId: string, sheetName: string) {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
}

async function readSheet(sheetName: string) {
  const sheetId = process.env.GOOGLE_SHEET_ID?.trim() ?? "";
  if (!SHEET_ID_PATTERN.test(sheetId)) return null;

  const response = await fetch(sheetUrl(sheetId, sheetName), {
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(8000),
    headers: { "User-Agent": "AkanImohWebsite/1.0" },
  });

  if (!response.ok) return null;
  const text = await response.text();
  const trimmed = text.trim();
  if (!trimmed || trimmed.startsWith("<") || trimmed.startsWith("{")) return null;
  return parseCsv(text);
}

function published(row: Record<string, string>) {
  const flag = pick(row, "featured", "published", "visible").toLowerCase();
  if (!flag) return true;
  return flag === "yes" || flag === "true" || flag === "1" || flag === "y";
}

async function youtubeDetails(youtubeId: string) {
  try {
    const watchUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
    const response = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`, {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as {
      title?: string;
      author_name?: string;
      thumbnail_url?: string;
    };
    return {
      title: data.title?.trim() ?? "",
      author: data.author_name?.trim() ?? "",
      thumbnail: data.thumbnail_url?.trim() ?? "",
    };
  } catch {
    return null;
  }
}

export async function getStories(): Promise<Story[]> {
  try {
    const rows = await readSheet(process.env.GOOGLE_SHEET_VIDEOS?.trim() || "Videos");
    if (!rows) return [];

    const drafts = rows.flatMap((row, index) => {
      if (!published(row)) return [];
      const youtubeId = youtubeIdFrom(pick(row, "youtubeId", "youtube", "video", "url"));
      if (!youtubeId) return [];
      return [{ row, index, youtubeId, title: pick(row, "title") }];
    });

    const stories = await Promise.all(
      drafts.map(async ({ row, index, youtubeId, title }) => {
        const details = title ? null : await youtubeDetails(youtubeId);
        const resolvedTitle = cleanText(title || details?.title || "Untitled film");
        const thumbnail =
          pick(row, "thumbnail", "image", "imageUrl") ||
          `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;

        const story: Story = {
          id: `${slugify(resolvedTitle)}-${index + 1}`,
          title: resolvedTitle,
          guest: pick(row, "guest", "name"),
          role: pick(row, "role"),
          hook: pick(row, "hook", "description", "summary"),
          youtubeId,
          thumbnail,
        };
        return story;
      }),
    );

    return stories.slice(0, 12);
  } catch {
    return [];
  }
}

export async function getGallery(): Promise<GalleryItem[]> {
  try {
    const rows = await readSheet(process.env.GOOGLE_SHEET_GALLERY?.trim() || "Gallery");
    if (!rows) return [];

    return rows.flatMap((row, index) => {
      const imageUrl = pick(row, "imageUrl", "image", "url");
      const title = pick(row, "title") || pick(row, "caption") || "Untitled";
      if (!imageUrl || imageUrl.includes("example.com") || imageUrl.endsWith("/example.jpg")) return [];

      const item: GalleryItem = {
        id: `${slugify(title)}-${index + 1}`,
        title,
        caption: pick(row, "caption", "description"),
        imageUrl,
        category: pick(row, "category"),
      };
      return [item];
    });
  } catch {
    return [];
  }
}
