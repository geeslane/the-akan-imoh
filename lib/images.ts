const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const images = {
  portrait: { src: (w = 1000) => u("1659093728055-45f8275166d9", w), alt: "Portrait of Akan Imoh", credit: "150 Billi / Unsplash" },
  hero: { src: (w = 2000) => u("1559833064-6f4573ec1ac9", w), alt: "Lagos skyline at daytime", credit: "Stephen Olatunde / Unsplash" },
  gallery: {
    leadership: { src: (w = 900) => u("1554283433-fc31a4818432", w), alt: "Executive in a black suit", credit: "Sven Mieke / Unsplash" },
    management: { src: (w = 900) => u("1677078610072-7f11ebc4d4d7", w), alt: "Team working together around a table", credit: "Paymo / Unsplash" },
    communication: { src: (w = 900) => u("1478737270239-2f02b77fc618", w), alt: "Studio condenser microphone", credit: "Jonathan Velasquez / Unsplash" },
  },
  essays: [
    { src: (w = 1000) => u("1618828665011-0abd973f7bb8", w), alt: "Civic Towers, Lekki, Lagos", credit: "Nupo Deyon Daniel / Unsplash" },
    { src: (w = 1000) => u("1659083725992-9d88c12e719c", w), alt: "Podcast microphone on a boom arm", credit: "Ritupon Baishya / Unsplash" },
    { src: (w = 1000) => u("1580239808463-daf9766788a7", w), alt: "Aerial view of Lagos neighbourhood", credit: "Omotayo Kofoworola / Unsplash" },
  ],
};
