# Akan Imoh

Single-page site for Akan Imoh’s documentary practice. Black editorial layout, gold accent, films and gallery managed from a Google Sheet, essays pulled from his Substack.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` before connecting the sheet, WhatsApp, or enquiry inbox.

## Page

One scroll, in this order:

1. Hero
2. About
3. What I Do
4. Featured Stories
5. Gallery
6. Writing, from Substack
7. Why This Matters
8. Request a Feature
9. Newsletter
10. Footer

The gallery sits in the same scroll as the films. It is not a separate site. Click a frame to open it. Arrow keys move through the set.

## Portrait

Place a photograph at `public/images/akan-imoh.jpg`. It is used in the hero, centred under the headline and faded at the edges so it does not meet the type, and again beside the about copy. Until that file is there, a dark plate holds the space.

## Stories and gallery

Share a Google Sheet as **Anyone with the link can view**. Put the sheet id in `GOOGLE_SHEET_ID`.

Tab `Videos`:

| title | guest | role | hook | youtubeId | thumbnail | featured |
| --- | --- | --- | --- | --- | --- | --- |
| The Long Game | Adaeze Obi | Chief Financial Officer | How a CFO became one of Africa’s most influential dealmakers. | VIDEO_ID | | yes |

`youtubeId` can be the 11-character id or a full YouTube URL. Leave `thumbnail` blank to use the YouTube image. `featured` accepts yes, true, or 1. A blank featured cell is treated as published.

Tab `Gallery`:

| title | caption | imageUrl | category |
| --- | --- | --- | --- |
| The room | Lagos. A conversation at the table. | https://… or /gallery/room.jpg | Leadership |

Files in `public/gallery` can be referenced as `/gallery/room.jpg`. Column templates are in `content/templates`.

A blank Videos tab leaves the stories section off the page. The gallery shows three archive themes until photographs are added.

Both feeds refresh about once an hour.

## Substack

Essays come from `https://theakanimoh.substack.com/feed`. The three latest posts are shown with a link back to the original. The subscribe button goes to his Substack subscribe page. Nothing is stored on this site.

## Enquiries

The form covers a feature, sponsorship, advertising, a partnership, or a conversation.

- With `ENQUIRY_WEBHOOK_URL` set, the enquiry is posted there. `content/templates/enquiry-webhook.js` is a Google Apps Script that appends a row to an Enquiries tab.
- Without a webhook, the visitor’s email app opens, addressed to `NEXT_PUBLIC_EMAIL`.

`NEXT_PUBLIC_WHATSAPP_NUMBER` is digits only, with the country code. Leave it blank and the WhatsApp button stays hidden. `NEXT_PUBLIC_BOOKING_URL` does the same for a calendar link.

## Stack

Next.js App Router, React, TypeScript. No component library. Copy lives in `lib/site.ts` and `content/stories.ts`. Sheet and Substack access stays on the server.
