# Durable Objects Setup Guide for Next.js ISR on Cloudflare

This guide walks you through setting up Durable Objects for ISR (Incremental Static Regeneration) tag caching in your Next.js application on Cloudflare.

## ✅ What's Already Done

Your configuration is mostly set up! Here's what's already in place:

1. ✅ **wrangler.jsonc** - Durable Object bindings and migrations configured
2. ✅ **open-next.config.ts** - OpenNext config with DO handlers enabled
3. ✅ **worker.ts** - Created to export Durable Object classes

## 📋 Step-by-Step Setup

### Step 1: Verify Your Configuration

Your `wrangler.jsonc` already has:
- Durable Object bindings for `DOQueueHandler`, `DOShardedTagCache`, and `BucketCachePurge`
- Migrations with `new_sqlite_classes` defined
- Service binding for self-reference
- R2 bucket for incremental cache
- D1 database binding

### Step 2: Build Your Next.js App

First, build your Next.js application with OpenNext:

```bash
npm run build
# or
pnpm build
```

This will:
- Build your Next.js app
- Generate the `.open-next/worker.js` file
- Prepare all assets

### Step 3: Verify Worker Entry Point

The `worker.ts` file I created should:
- Import the generated OpenNext worker
- Export the Durable Object classes that Cloudflare needs

**Important**: If you get import errors, you may need to adjust the import paths. The correct paths depend on your `@opennextjs/cloudflare` version.

### Step 4: Deploy to Cloudflare

Deploy your application:

```bash
npm run deploy
# or
pnpm deploy
```

This will:
1. Build your Next.js app with OpenNext
2. Deploy to Cloudflare Workers
3. Create the Durable Object namespaces (first time only)
4. Apply migrations

### Step 5: Verify Deployment

After deployment, check:

1. **Cloudflare Dashboard** → **Workers & Pages** → **originstack**
   - Should show your deployed worker
   - Check the **Bindings** tab to see Durable Objects listed

2. **Cloudflare Dashboard** → **Durable Objects**
   - Should show 3 namespaces:
     - `DOQueueHandler`
     - `DOShardedTagCache`
     - `BucketCachePurge`

3. **Test your application**
   - Visit your deployed URL
   - Test ISR functionality (revalidateTag, revalidatePath)

## 🔧 Troubleshooting

### Issue: "Class not found" or "Durable Object binding error"

**Solution**: The Durable Object classes might not be exported correctly. Try:

1. Check if `worker.ts` can import from OpenNext:
   ```bash
   npx tsc --noEmit worker.ts
   ```

2. If imports fail, try these alternative import paths:
   ```typescript
   // Option 1: Direct from package
   export { DOQueueHandler } from "@opennextjs/cloudflare/overrides/queue/do-queue-handler";

   // Option 2: From the override modules (current approach)
   export { DOQueueHandler } from "@opennextjs/cloudflare/overrides/queue/do-queue";
   ```

3. Check OpenNext documentation for your version's export paths

### Issue: "Migration already applied"

**Solution**: If you've deployed before, you might need a new migration tag:

```jsonc
"migrations": [
  {
    "tag": "v2",  // Increment this
    "new_sqlite_classes": [...]
  }
]
```

### Issue: Worker won't start locally

**Solution**: For local development:

```bash
# Build first
npm run build

# Then run wrangler dev
npx wrangler dev
```

## 📚 Understanding the Setup

### What Each Durable Object Does

1. **DOQueueHandler** (`NEXT_CACHE_DO_QUEUE`)
   - Handles background revalidation queue
   - Processes ISR cache updates asynchronously

2. **DOShardedTagCache** (`NEXT_TAG_CACHE_DO_SHARDED`)
   - Manages tag-based cache invalidation
   - Sharded across multiple instances for performance
   - Your config uses 12 shards (`baseShardSize: 12`)

3. **BucketCachePurge** (`NEXT_CACHE_DO_PURGE`)
   - Handles cache purging operations
   - Works with your R2 bucket

### Configuration Options

In `open-next.config.ts`, you can adjust:

```typescript
tagCache: doShardedTagCache({
  baseShardSize: 12,           // Number of shards (more = better distribution)
  regionalCache: true,          // Enable regional caching (recommended)
  regionalCacheTtlSec: 5,      // TTL for regional cache
  // ... other options
})
```

## 🚀 Next Steps

1. **Monitor Performance**
   - Check Durable Objects metrics in Cloudflare Dashboard
   - Monitor request latency and shard distribution

2. **Optimize Shard Count**
   - If you have high traffic, consider increasing `baseShardSize`
   - More shards = better load distribution but more Durable Objects

3. **Enable Regional Cache** (if not already)
   - Set `regionalCache: true` in your OpenNext config
   - This reduces load on Durable Objects

4. **Test ISR Features**
   - Test `revalidateTag()` and `revalidatePath()` in your app
   - Verify cache invalidation works correctly

## 📖 Additional Resources

- [OpenNext Cloudflare Documentation](https://opennext.js.org/cloudflare)
- [Cloudflare Durable Objects Docs](https://developers.cloudflare.com/durable-objects/)
- [Next.js ISR Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)

## ✅ Checklist

Before deploying, make sure:

- [ ] `wrangler.jsonc` has all Durable Object bindings
- [ ] `migrations` array includes all DO classes
- [ ] `worker.ts` exports all required classes
- [ ] `open-next.config.ts` has DO handlers configured
- [ ] R2 bucket exists and is bound
- [ ] D1 database exists (if using)
- [ ] Service binding points to correct worker name
- [ ] Build completes without errors
- [ ] Deployment succeeds

---

**Need Help?** If you encounter issues, check:
1. Cloudflare Dashboard → Workers & Pages → Logs
2. Wrangler deployment output
3. OpenNext build logs

