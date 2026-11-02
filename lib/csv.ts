export function parseCsv(input: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];

    if (inQuotes) {
      if (char === '"') {
        if (input[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        cell += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") {
      cell += char;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  const filled = rows.filter((entry) => entry.some((value) => value.trim().length > 0));
  const header = filled[0];
  if (!header) return [];

  return filled.slice(1).map((entry) => {
    const record: Record<string, string> = {};
    header.forEach((key, index) => {
      record[key.trim()] = (entry[index] ?? "").trim();
    });
    return record;
  });
}

export function pick(row: Record<string, string>, ...keys: string[]) {
  const entries = Object.entries(row);
  for (const key of keys) {
    const found = entries.find(([name]) => name.toLowerCase() === key.toLowerCase());
    if (found?.[1].trim()) return found[1].trim();
  }
  return "";
}

export function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return slug || "item";
}

export function youtubeIdFrom(value: string) {
  const trimmed = value.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.split("/").filter(Boolean)[0] ?? "";
      return /^[\w-]{11}$/.test(id) ? id : "";
    }

    const watchId = url.searchParams.get("v") ?? "";
    if (/^[\w-]{11}$/.test(watchId)) return watchId;

    const parts = url.pathname.split("/");
    const marker = parts.findIndex((part) => part === "embed" || part === "shorts" || part === "live");
    const id = marker >= 0 ? (parts[marker + 1] ?? "") : "";
    return /^[\w-]{11}$/.test(id) ? id : "";
  } catch {
    return "";
  }
}
