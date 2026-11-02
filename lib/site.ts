import type { EnquiryIntent } from "@/lib/types";

export const site = {
  name: "Akan Imoh",
  title: "Akan Imoh — A Documentary Practice",
  description:
    "Cinematic executive mini-documentaries and long-form interviews with Africa’s CEOs, founders, and business leaders.",
  email: process.env.NEXT_PUBLIC_EMAIL || "theakanimoh@gmail.com",
  emails: ["theakanimoh@gmail.com", "hello@theakanimoh.com"],
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/[^\d]/g, ""),
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
  substackUrl: process.env.NEXT_PUBLIC_SUBSTACK_URL || "https://theakanimoh.substack.com",
  youtubeUrl: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://www.youtube.com/@theakanimoh",
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/akan-imoh",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export const nav = [
  { href: "#about", id: "about", label: "About" },
  { href: "#work", id: "work", label: "Work" },
  { href: "#stories", id: "stories", label: "Stories" },
  { href: "#archive", id: "archive", label: "Archive" },
  { href: "#writing", id: "writing", label: "Writing" },
  { href: "#feature", id: "feature", label: "Feature" },
] as const;

export const practice = [
  {
    index: "01",
    title: "Executive Mini-Documentaries",
    body: "90-second cinematic leadership stories. Origin, struggle, breakthrough, philosophy. Fast, powerful, unforgettable.",
  },
  {
    index: "02",
    title: "Long-Form Documentary Interviews",
    body: "15 to 20-minute deep-dive conversations on strategy, leadership, and what it truly takes to build at scale in Africa.",
  },
  {
    index: "03",
    title: "The African Business Archive",
    body: "A growing library of leadership stories captured while founders and CEOs are still actively building. History in real time.",
  },
] as const;

export const pillars = [
  "Preserve leadership stories in real time",
  "Showcase African business excellence",
  "Humanise the people building the continent",
  "Build an archive that lasts",
] as const;

export const pathways: { intent: EnquiryIntent; label: string }[] = [
  { intent: "Request a feature", label: "Request a feature" },
  { intent: "Sponsorship", label: "Sponsorship and advertising" },
  { intent: "Partnership", label: "Partnerships" },
];

export function whatsappHref(text?: string) {
  if (!site.whatsapp) return "";
  const base = `https://wa.me/${site.whatsapp}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}
