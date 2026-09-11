# Kainchi Dham Cabs — clean Cloudflare Workers package

Repository structure:
- worker.js
- wrangler.jsonc
- package.json
- public/
  - index.html
  - checkout.html
  - booking-core.js

Cloudflare build command:
npx wrangler deploy

The assets directory is intentionally `./public`.
Do not change it to `.` because Cloudflare will then scan node_modules and may reject
large Wrangler binaries such as workerd.

Worker name is set to `kcabs` to match the Cloudflare Workers Build connection.

Routes:
- /
- /checkout
- /checkout/
