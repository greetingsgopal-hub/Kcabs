# Kainchi Dham Cabs — Cloudflare Git root-assets package

This package intentionally keeps `index.html`, `checkout.html`, and `booking-core.js`
at the repository ROOT.

Cloudflare Git deploy command:
`npx wrangler deploy`

The Wrangler configuration uses:
`assets.directory = "."`

This matches the repository layout and avoids the previous
`/opt/buildhome/repo/public does not exist` failure.

Routes:
- `/` -> index.html
- `/checkout` -> checkout.html
- `/checkout/` -> checkout.html

Do not add a `public/` directory when using this package.
Do not use the static-file uploader.
