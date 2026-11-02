export type Story = {
  id: string;
  title: string;
  guest: string;
  role: string;
  hook: string;
  youtubeId: string;
  thumbnail: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  category: string;
};

export type Essay = {
  title: string;
  url: string;
  excerpt: string;
  date: string;
  published: string;
};

export const ENQUIRY_INTENTS = [
  "Request a feature",
  "Sponsorship",
  "Advertising",
  "Partnership",
  "Book a conversation",
] as const;

export type EnquiryIntent = (typeof ENQUIRY_INTENTS)[number];

export type EnquiryPayload = {
  name: string;
  email: string;
  organisation: string;
  role: string;
  intent: EnquiryIntent;
  message: string;
};
