import "server-only";

import { access } from "node:fs/promises";
import path from "node:path";

export async function hasPortrait() {
  try {
    await access(path.join(process.cwd(), "public", "images", "akan-imoh.jpg"));
    return true;
  } catch {
    return false;
  }
}
