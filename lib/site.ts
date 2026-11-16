import type { EnquiryIntent } from "@/lib/types";

export const site = {
  name: "Akan Imoh",
  title: "Akan Imoh — A Documentary Practice",
  description:
    "I go behind the scenes to document the people, ideas and decisions shaping Africa’s business, political and cultural landscape.",
  courseVideoId: "ME5arjlSTGQ",
  email: process.env.NEXT_PUBLIC_EMAIL || "theakanimoh@gmail.com",
  emails: ["theakanimoh@gmail.com", "hello@theakanimoh.com"],
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/[^\d]/g, ""),
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
  substackUrl: process.env.NEXT_PUBLIC_SUBSTACK_URL || "https://theakanimoh.substack.com",
  youtubeUrl: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://www.youtube.com/@theakanimoh",
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/akan-imoh",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://the-akan-imoh.vercel.app",
};

export const nav = [
  { href: "#about", id: "about", label: "About" },
  { href: "#work", id: "work", label: "Work" },
  { href: "#stories", id: "stories", label: "Stories" },
  { href: "#writing", id: "writing", label: "Course" },
] as const;

export const practice = [
  {
    index: "01",
    title: "Industry and Enterprise",
    body: "Conversations with the founders, CEOs, entrepreneurs and industry operators building businesses, transforming industries and creating new possibilities across Africa.",
  },
  {
    index: "02",
    title: "Governance and Institutions",
    body: "Exploring the people, policies and institutions influencing how Africa is governed, how decisions are made and how societies evolve.",
  },
  {
    index: "03",
    title: "Culture and Society",
    body: "Documenting the creatives, thinkers, cultural architects and change agents shaping African identity, influencing conversations and redefining how the continent is experienced by the world.",
  },
] as const;

export const courseOutline = [
  {
    index: "01",
    title: "The Executive Mindset",
    body: "Understanding the transition from individual contributor to organisational leader. Developing strategic thinking, sound judgement, ownership and the ability to see beyond immediate responsibilities.",
  },
  {
    index: "02",
    title: "Communicating with Authority",
    body: "Mastering executive communication, business writing, high-stakes conversations, presentation skills and the ability to articulate ideas with clarity, confidence and conviction.",
  },
  {
    index: "03",
    title: "Influence and Organisational Politics",
    body: "Understanding power, relationships and organisational dynamics. Learning how to manage stakeholders, build alliances, influence decisions and navigate complex workplace environments.",
  },
  {
    index: "04",
    title: "Executive Presence and Personal Stature",
    body: "Building professional credibility, cultivating a distinctive leadership identity and developing the confidence, composure and visibility expected of senior executives.",
  },
  {
    index: "05",
    title: "Strategic Leadership and Decision-Making",
    body: "Learning to think in systems, make decisions under uncertainty, solve organisational problems and communicate a compelling vision that gets people moving.",
  },
] as const;

export const pathways: { intent: EnquiryIntent; label: string }[] = [
  { intent: "Request a feature", label: "Request a feature" },
  { intent: "Book a training session", label: "Book a training session" },
  { intent: "Partner with me", label: "Partner with me" },
];

export function whatsappHref(text?: string) {
  if (!site.whatsapp) return "";
  const base = `https://wa.me/${site.whatsapp}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}
