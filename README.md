# Apple Pay domain association (Cloudflare Worker)

Serves `apple-developer-merchantid-domain-association.txt` at both:

- `/.well-known/apple-developer-merchantid-domain-association`
- `/.well-known/apple-developer-merchantid-domain-association.txt`

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

http://localhost:8787/.well-known/apple-developer-merchantid-domain-association

http://localhost:8787/.well-known/apple-developer-merchantid-domain-association.txt

## Deploy

```bash
npm run deploy
```

## Attach to your domain

In the Cloudflare dashboard (or via Wrangler routes), add **Worker routes** on the zone that serves your site. Add one route per path (or use a single pattern if your setup supports it):

- `www.victorymenshealth.com/.well-known/apple-developer-merchantid-domain-association`
- `www.victorymenshealth.com/.well-known/apple-developer-merchantid-domain-association.txt`

If your origin already handles other paths, use route patterns that match only these paths so the worker does not intercept the rest of the site.

Alternatively, add to `wrangler.toml` after deploy:

```toml
routes = [
  { pattern = "www.victorymenshealth.com/.well-known/apple-developer-merchantid-domain-association", zone_name = "victorymenshealth.com" },
  { pattern = "www.victorymenshealth.com/.well-known/apple-developer-merchantid-domain-association.txt", zone_name = "victorymenshealth.com" }
]
```

Replace the hostname and zone with yours. The `www` hostname must be **Proxied** (orange cloud) for routes to run.

## Updating the file

Replace `apple-developer-merchantid-domain-association.txt` in the project root (download a new copy from Apple / your payment provider), then redeploy:

```bash
npm run deploy
```

## Apple Pay

Apple’s documentation uses the extensionless path. This worker serves both URLs with the same file content.
