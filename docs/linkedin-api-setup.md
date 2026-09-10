# LinkedIn company feed — API setup

The homepage currently shows **three curated posts** from `src/content/linkedin.ts`.
This checklist is how we move that to a live pull via LinkedIn’s Community Management API.

## Why the API path is gated

LinkedIn does **not** offer an official embed widget for a company-page feed. Reading org posts requires:

- A LinkedIn Developer app
- **Community Management API** product access (manual review)
- Scope **`r_organization_social`**
- An authenticated member who is a page **Super Admin / Content Admin** (you)

Approval is often days to weeks. Development tier has call limits and a ~12‑month build window before Standard tier.

## Step 1 — Create the developer app (you)

1. Sign in as a GreyEdge LinkedIn **Super Admin**: [linkedin.com/developers/apps](https://www.linkedin.com/developers/apps)
2. **Create app**
   - App name: e.g. `GreyEdge Group Website`
   - LinkedIn Page: **The GreyEdge Group** (`grey-edge`)
   - Privacy policy URL: `https://greyedgegroup.com` (or your live privacy page)
3. Under **Auth**, note **Client ID** and **Client Secret** (secret stays server-side only — never in Vite)
4. Add an authorized redirect URL for OAuth (we’ll finalize when Netlify functions land), e.g.  
   `https://greyedgegroup.com/.netlify/functions/linkedin-oauth/callback`  
   and for local: `http://localhost:8888/.netlify/functions/linkedin-oauth/callback`

## Step 2 — Request Community Management API

1. In the app → **Products** → request **Community Management API**
2. Use case (paste / adapt):

   > We operate greyedgegroup.com for The GreyEdge Group. We need read-only access to our own company page posts (`r_organization_social`) so the public homepage can display our three most recent organic posts. We will not scrape member profiles, post on behalf of others, or redistribute third-party content. Tokens and secrets will live only in a server-side Netlify function; the browser never receives the client secret.

3. Attach screenshots of the current curated “Latest on LinkedIn” section once it’s live
4. Submit and watch the Developer Portal for approval / rejection notes

## Step 3 — After Development-tier approval

1. Complete 3-legged OAuth once as Super Admin with scope `r_organization_social`
2. Store **refresh token** + client secret in Netlify env vars (not in git)
3. Resolve organization URN (`urn:li:organization:{id}`) for GreyEdge
4. Call Posts API finder by author (org URN), `count=3`, newest first  
   Docs: [Posts API](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api)
5. Map response → `{ id, publishedAt, title, excerpt, url, image }` and keep the same `LinkedInFeed` UI

## Step 4 — Site wiring (engineering, after approval)

Planned shape (not built yet):

- `netlify/functions/linkedin-posts.ts` — refresh token, fetch last 3, cache ~15–60 min
- Homepage keeps `LinkedInFeed`; data source swaps from static module → `fetch('/.netlify/functions/linkedin-posts')` with static fallback
- Curated `src/content/linkedin.ts` remains the offline / rejected-API fallback

## What you can do this week

| Owner | Action |
|--------|--------|
| Super Admin | Create app + request Community Management API (Steps 1–2) |
| Super Admin | Replace placeholder entries in `src/content/linkedin.ts` with real post permalinks |
| Engineering | After approval: OAuth + Netlify function (Steps 3–4) |

Until the API is approved, updating the three cards in `linkedin.ts` after each important company post is the production path.
