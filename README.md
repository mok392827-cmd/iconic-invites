# Wedding Invitation Template

A static wedding invitation website built with:
- HTML
- CSS
- JavaScript

## Run locally

Open `index.html` in your browser.

For the best experience, use a simple local server (for example VS Code Live Server), especially if you later add local assets or more features.

## Change a client's data

Open:

`script.js`

At the top you will find:

```js
const weddingData = {
  groomName: "Adam",
  brideName: "Layan",
  weddingDate: "2026-12-19T19:00:00",
  venue: "The Gardenia Palace",
  city: "Cairo, Egypt",
  address: "New Cairo, Cairo, Egypt",
  mapsUrl: "..."
};
```

Change these values for every client.

## Notes

- The demo uses remote Unsplash images, so an internet connection is needed for those photos and Google Fonts.
- The Guestbook is currently a front-end demo only. It does NOT permanently save messages.
- The Calendar button generates an `.ics` calendar file.
- The Countdown is generated automatically from `weddingDate`.
- Google Maps is opened through the client's `mapsUrl`.

## Future upgrades

Possible next steps:
1. Local client image uploads.
2. Real Guestbook using Supabase.
3. Music/audio control.
4. Admin/client data configuration.
5. Multiple themes.
6. Faster image optimization.
7. Deploying many client websites efficiently.
8. Custom domains/subdomains.
