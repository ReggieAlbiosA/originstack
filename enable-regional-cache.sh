#!/bin/bash

# Script to enable Tiered Cache with Smart Topology on Cloudflare
# Available on: Free, Pro, Business, and Enterprise plans
#
# IMPORTANT: This script requires a Cloudflare ZONE (custom domain), not a .workers.dev subdomain
# - Tiered Cache is a zone-level setting and only works with custom domains
# - For .workers.dev deployments: No DNS needed, but Tiered Cache is NOT configurable
# - For custom domain deployments: DNS is required, and Tiered Cache IS configurable
#
# Note: Regional Tiered Cache (additional layer) requires Enterprise plan only
# This script enables the best available caching for free tier users
#
# Usage:
#   export CLOUDFLARE_API_TOKEN="your-api-token"
#   export CLOUDFLARE_ZONE_ID="your-zone-id"  # Must be a zone with a custom domain, not .workers.dev
#   ./enable-regional-cache.sh

set -e

# Check for required environment variables
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "Error: CLOUDFLARE_API_TOKEN environment variable is not set"
    echo "Get your API token from: https://dash.cloudflare.com/profile/api-tokens"
    exit 1
fi

if [ -z "$CLOUDFLARE_ZONE_ID" ]; then
    echo "Error: CLOUDFLARE_ZONE_ID environment variable is not set"
    echo "You can find your Zone ID in the Cloudflare dashboard under Overview"
    echo ""
    echo "NOTE: This requires a Cloudflare zone with a custom domain."
    echo "Tiered Cache does NOT work with .workers.dev subdomains."
    echo "You need to add a custom domain to your zone first."
    exit 1
fi

echo "Enabling Tiered Cache with Smart Topology for zone: $CLOUDFLARE_ZONE_ID"
echo ""

# Step 1: Enable Tiered Cache (available on all plans)
echo "Step 1: Enabling Tiered Cache..."
TIERED_CACHE_RESPONSE=$(curl -s -X PATCH \
    "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/argo/tiered_caching" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"value": "on"}')

if echo "$TIERED_CACHE_RESPONSE" | grep -q '"success":true'; then
    echo "✓ Tiered Cache enabled successfully"
else
    echo "✗ Failed to enable Tiered Cache"
    echo "Response: $TIERED_CACHE_RESPONSE"
    exit 1
fi

# Step 2: Enable Smart Tiered Cache Topology (available on all plans)
echo "Step 2: Enabling Smart Tiered Cache Topology..."
SMART_TOPOLOGY_RESPONSE=$(curl -s -X PATCH \
    "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/cache/tiered_cache_smart_topology_enable" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"value": "on"}')

if echo "$SMART_TOPOLOGY_RESPONSE" | grep -q '"success":true'; then
    echo "✓ Smart Tiered Cache Topology enabled successfully"
else
    echo "✗ Failed to enable Smart Tiered Cache Topology"
    echo "Response: $SMART_TOPOLOGY_RESPONSE"
    exit 1
fi

# Step 3: Try to enable Regional Tiered Cache (Enterprise only - will fail gracefully on free tier)
# API Reference: https://developers.cloudflare.com/api/resources/cache/subresources/regional_tiered_cache/
echo "Step 3: Attempting to enable Regional Tiered Cache (Enterprise feature)..."
REGIONAL_CACHE_RESPONSE=$(curl -s -X PATCH \
    "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/cache/regional_tiered_cache" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"value": "on"}')

if echo "$REGIONAL_CACHE_RESPONSE" | grep -q '"success":true'; then
    echo "✓ Regional Tiered Cache enabled successfully! (Enterprise feature)"
    echo ""
    echo "All caching features are now active:"
    echo "  - Tiered Cache: ✓"
    echo "  - Smart Tiered Cache Topology: ✓"
    echo "  - Regional Tiered Cache: ✓ (Enterprise)"
else
    echo "⚠ Regional Tiered Cache not available (requires Enterprise plan)"
    echo "  This is expected on free tier - you still have optimal caching enabled!"
    echo ""
    echo "Active caching features:"
    echo "  - Tiered Cache: ✓"
    echo "  - Smart Tiered Cache Topology: ✓"
    echo ""
    echo "Smart Tiered Cache dynamically selects the closest upper tier for your"
    echo "origin, providing regional caching benefits. Regional Tiered Cache adds"
    echo "an additional layer but requires Enterprise plan."
fi

echo ""
echo "✓ Configuration complete! Your zone now has optimized regional caching enabled."

