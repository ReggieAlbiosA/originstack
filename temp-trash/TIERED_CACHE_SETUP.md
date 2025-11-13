# Tiered Cache Setup Guide for Cloudflare Workers

## DNS Requirements for Tiered Cache

### Quick Answer

**Tiered Cache requires a Cloudflare zone with a custom domain. It does NOT work with `.workers.dev` subdomains.**

---

## Development vs Production

### Development (`.workers.dev` subdomain)
- ✅ **No DNS setup needed** - Cloudflare automatically provides `your-worker.your-subdomain.workers.dev`
- ❌ **Tiered Cache NOT available** - Tiered Cache is a zone-level feature and doesn't apply to `.workers.dev` domains
- ✅ **Good for testing** - Perfect for development and testing your Worker

**Example:** `originstack.your-account.workers.dev`

### Production (Custom Domain)
- ✅ **DNS setup required** - You need to add your domain to Cloudflare and configure DNS
- ✅ **Tiered Cache available** - Can enable Tiered Cache on your zone
- ✅ **Recommended for production** - Better performance and caching options

**Example:** `app.yourdomain.com` or `yourdomain.com`

---

## Setup Steps for Production (Custom Domain)

### Step 1: Add Your Domain to Cloudflare

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Click **Add a Site**
3. Enter your domain (e.g., `yourdomain.com`)
4. Choose a plan (Free tier works!)
5. Follow the DNS setup instructions

### Step 2: Configure DNS for Your Worker

You have two options:

#### Option A: Custom Domain (Recommended)
This automatically creates DNS records for you:

1. In Cloudflare Dashboard → **Workers & Pages**
2. Select your Worker
3. Go to **Settings** → **Domains & Routes** → **Add** → **Custom Domain**
4. Enter your domain/subdomain (e.g., `app.yourdomain.com`)
5. Cloudflare will automatically create the DNS record

#### Option B: Manual DNS + Route
1. Create a DNS record in your zone:
   - **Type:** A or CNAME
   - **Name:** `app` (or your subdomain)
   - **IPv4 address:** `192.0.2.0` (or CNAME target)
   - **Proxy status:** Proxied (orange cloud) ✅
2. Add a route in your Worker:
   - **Settings** → **Domains & Routes** → **Add** → **Route**
   - Pattern: `app.yourdomain.com/*`

### Step 3: Enable Tiered Cache

Once you have a custom domain set up, you can enable Tiered Cache:

```bash
export CLOUDFLARE_API_TOKEN="your-api-token"
export CLOUDFLARE_ZONE_ID="your-zone-id"  # Get this from your zone's Overview page
./enable-regional-cache.sh
```

---

## Configuration in Wrangler

### For Custom Domain (Production)

Add to your `wrangler.jsonc`:

```jsonc
{
  "name": "originstack",
  // ... other config ...
  "routes": [
    {
      "pattern": "app.yourdomain.com/*",
      "custom_domain": true
    }
  ]
}
```

Or use routes:

```jsonc
{
  "name": "originstack",
  // ... other config ...
  "routes": [
    {
      "pattern": "app.yourdomain.com/*",
      "zone_name": "yourdomain.com"
    }
  ]
}
```

### For Development (`.workers.dev`)

No special configuration needed - just deploy:

```bash
npx wrangler deploy
```

Your Worker will be available at: `originstack.your-subdomain.workers.dev`

---

## Summary

| Scenario | DNS Needed? | Tiered Cache Available? | Use Case |
|----------|-------------|-------------------------|----------|
| `.workers.dev` | ❌ No | ❌ No | Development/Testing |
| Custom Domain | ✅ Yes | ✅ Yes | Production |

---

## Important Notes

1. **Tiered Cache is zone-level**: It only works when you have a Cloudflare zone with a custom domain
2. **Free tier works**: You can use Tiered Cache on the free tier, but Regional Tiered Cache requires Enterprise
3. **Smart Tiered Cache**: Automatically selects the best upper tier for your origin - works on all plans including free
4. **Development**: Use `.workers.dev` for quick testing without DNS setup
5. **Production**: Use custom domains for better performance and caching options

---

## Next Steps

1. If you're in development: Continue using `.workers.dev` (no DNS needed)
2. If you're ready for production:
   - Add your domain to Cloudflare
   - Configure DNS for your Worker
   - Run the `enable-regional-cache.sh` script to enable Tiered Cache

