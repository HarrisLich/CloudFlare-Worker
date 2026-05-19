# Apple Pay domain association (Cloudflare Worker)

Serves `apple-developer-merchantid-domain-association.txt` at:

`/.well-known/apple-developer-merchantid-domain-association.txt`

## Setup

```bash
npm install
```

Log in to Cloudflare (once per machine):

```bash
npx wrangler login
```

## Local test

```bash
npm run dev
```

Then open:

http://localhost:8787/.well-known/apple-developer-merchantid-domain-association.txt

## Deploy

```bash
npm run deploy
```

## Attach to your domain

In the Cloudflare dashboard (or via Wrangler routes), add a **Worker route** on the zone that serves your site, for example:

- Route: `www.victorymenshealth.com/.well-known/apple-developer-merchantid-domain-association.txt`
- Worker: `apple-pay-domain-association`

If your origin already handles other paths, use a route pattern that matches only this path so the worker does not intercept the rest of the site.

Alternatively, add to `wrangler.toml` after deploy:

```toml
routes = [
  { pattern = "www.victorymenshealth.com/.well-known/apple-developer-merchantid-domain-association.txt", zone_name = "victorymenshealth.com" }
]
```

Replace the hostname and zone with yours.

## Updating the file

Replace `apple-developer-merchantid-domain-association.txt` in the project root (download a new copy from Apple / your payment provider), then redeploy:

```bash
npm run deploy
```

## Note on Apple’s default URL

Apple’s documentation expects the file **without** a `.txt` suffix:

`/.well-known/apple-developer-merchantid-domain-association`

This worker serves only the `.txt` path you requested. If a provider or checker still hits the extensionless URL, add a second route in `src/index.ts` or point that path at this worker as well.
