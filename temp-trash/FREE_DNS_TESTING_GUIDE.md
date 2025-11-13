FREE_DNS_TESTING_GUIDE.md# Free DNS Testing Guide for Cloudflare Workers

## Yes! Cloudflare DNS is FREE

Cloudflare offers **completely free DNS hosting** on their free tier. You can add any domain you own to Cloudflare and use all DNS features for free.

---

## Option 1: Use a Domain You Already Own (Recommended)

If you already own a domain (from any registrar), you can use it with Cloudflare DNS for free:

### Steps:

1. **Add your domain to Cloudflare** (Free)
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Click **Add a Site**
   - Enter your domain (e.g., `yourdomain.com`)
   - Choose **Free plan** ✅
   - Cloudflare will scan your existing DNS records

2. **Update Nameservers** (Free)
   - Cloudflare will provide you with 2 nameservers
   - Go to your domain registrar (where you bought the domain)
   - Replace the current nameservers with Cloudflare's nameservers
   - Wait 24-48 hours for DNS propagation

3. **Configure DNS for Your Worker** (Free)
   - In Cloudflare Dashboard → **Workers & Pages**
   - Select your Worker
   - Go to **Settings** → **Domains & Routes** → **Add** → **Custom Domain**
   - Enter a subdomain (e.g., `app.yourdomain.com`)
   - Cloudflare automatically creates the DNS record ✅

4. **Enable Tiered Cache** (Free)
   ```bash
   export CLOUDFLARE_API_TOKEN="your-api-token"
   export CLOUDFLARE_ZONE_ID="your-zone-id"
   ./enable-regional-cache.sh
   ```

---

## Option 2: Get a Free Domain for Testing

If you don't have a domain, here are free options:

### Free Domain Providers:

1. **Freenom** (`.tk`, `.ml`, `.ga`, `.cf` domains)
   - Website: https://www.freenom.com/
   - Free domains: `.tk`, `.ml`, `.ga`, `.cf`
   - ⚠️ Note: Some registrars may have restrictions

2. **Dot TK** (`.tk` domains)
   - Website: https://www.dot.tk/
   - Free `.tk` domains available

3. **No-IP** (Free subdomains)
   - Website: https://www.noip.com/
   - Free subdomains (e.g., `yoursite.ddns.net`)

4. **DuckDNS** (Free subdomains)
   - Website: https://www.duckdns.org/
   - Free subdomains (e.g., `yoursite.duckdns.org`)

### Recommended: Use a Cheap Domain

For production testing, consider buying a cheap domain:
- **Namecheap**: ~$1-5/year for `.xyz`, `.site`, `.online` domains
- **Porkbun**: ~$1-3/year for various TLDs
- **Cloudflare Registrar**: Direct integration, no markup

---

## Option 3: Use a Subdomain of a Domain You Own

If you have any domain, you can create unlimited subdomains for free:

### Example Setup:

**Domain:** `yourdomain.com` (you own this)

**Free Subdomains:**
- `test.yourdomain.com` ✅
- `dev.yourdomain.com` ✅
- `staging.yourdomain.com` ✅
- `app.yourdomain.com` ✅

All subdomains are **completely free** and work with Cloudflare DNS!

---

## Complete Setup Example

### Step 1: Add Domain to Cloudflare (Free)

```bash
# 1. Go to https://dash.cloudflare.com/
# 2. Click "Add a Site"
# 3. Enter: yourdomain.com
# 4. Choose: Free plan
# 5. Follow the setup wizard
```

### Step 2: Update Nameservers at Your Registrar

Cloudflare will give you nameservers like:
```
dante.ns.cloudflare.com
donna.ns.cloudflare.com
```

Update these at your domain registrar.

### Step 3: Configure Worker Custom Domain

In `wrangler.jsonc`:

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

Or via Dashboard:
1. **Workers & Pages** → Your Worker
2. **Settings** → **Domains & Routes** → **Add** → **Custom Domain**
3. Enter: `app.yourdomain.com`

### Step 4: Enable Tiered Cache

```bash
# Get your Zone ID from Cloudflare Dashboard → Your Domain → Overview
export CLOUDFLARE_ZONE_ID="your-zone-id-here"

# Get API token from: https://dash.cloudflare.com/profile/api-tokens
export CLOUDFLARE_API_TOKEN="your-api-token-here"

# Run the script
./enable-regional-cache.sh
```

---

## What's Free on Cloudflare?

✅ **DNS hosting** - Unlimited DNS records
✅ **SSL/TLS certificates** - Automatic HTTPS
✅ **CDN** - Global content delivery
✅ **DDoS protection** - Basic protection
✅ **Workers** - 100,000 requests/day
✅ **Tiered Cache** - Available on free tier
✅ **Smart Tiered Cache** - Available on free tier
✅ **Custom domains** - Unlimited subdomains

---

## Quick Test Setup (5 minutes)

If you want to test **right now** without buying a domain:

1. **Use `.workers.dev`** (No DNS needed)
   - Deploy: `npx wrangler deploy`
   - Access: `originstack.your-subdomain.workers.dev`
   - ⚠️ Tiered Cache NOT available (zone-level feature)

2. **Get a free subdomain** from DuckDNS or No-IP
   - Sign up for free subdomain
   - Add to Cloudflare as a zone
   - Configure Worker custom domain
   - Enable Tiered Cache ✅

---

## Cost Breakdown

| Service | Cost |
|---------|------|
| Cloudflare DNS | **FREE** ✅ |
| Cloudflare Workers (Free tier) | **FREE** ✅ |
| Tiered Cache | **FREE** ✅ |
| SSL/TLS Certificates | **FREE** ✅ |
| Domain (if you need one) | $0-5/year |
| **Total** | **$0-5/year** |

---

## Recommended Approach

1. **For Development**: Use `.workers.dev` (instant, no setup)
2. **For Testing Production**:
   - Use a subdomain of a domain you own, OR
   - Get a cheap domain ($1-5/year), OR
   - Use a free subdomain service
3. **Add to Cloudflare** (free DNS)
4. **Configure Worker custom domain**
5. **Enable Tiered Cache** with the script

---

## Troubleshooting

### "I don't have a domain"
- Option 1: Get a free subdomain from DuckDNS/No-IP
- Option 2: Buy a cheap domain ($1-5/year)
- Option 3: Use `.workers.dev` (but Tiered Cache won't work)

### "DNS propagation is slow"
- Usually takes 24-48 hours
- Can check status at: https://www.whatsmydns.net/

### "Tiered Cache not working"
- Make sure you're using a **custom domain**, not `.workers.dev`
- Verify your zone is active in Cloudflare
- Check that your Worker is deployed to the custom domain

---

## Next Steps

1. Choose your approach (existing domain, free subdomain, or cheap domain)
2. Add domain to Cloudflare (free)
3. Configure Worker custom domain
4. Run `enable-regional-cache.sh` to enable Tiered Cache
5. Test your production setup! 🚀

