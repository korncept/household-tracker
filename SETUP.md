# Household Stock Tracker (offline + auto-sync)

## 1. Create the free database (about 5 minutes)
1. Go to https://console.firebase.google.com and create a project (turn off Analytics).
2. Build > Firestore Database > Create database > production mode, pick a nearby region.
3. In Firestore > Rules, paste the contents of firestore.rules and Publish.
4. Project settings (gear) > Your apps > Web (</>) > register an app. Copy the config values.
5. Paste apiKey, authDomain, projectId and appId into config.js.

## 2. Host the folder (needed for phone install)
Upload this whole folder to Netlify Drop, GitHub Pages or Cloudflare Pages.
In Firebase > Authentication is NOT needed.

## 3. Install on each phone
Open the link once while online, then:
- Android Chrome: menu > Install app
- iPhone Safari: Share > Add to Home Screen

## 4. Join the household
On the first phone tap "Create new code", then Join. Enter the same code on the other three phones.
Offline changes are saved on the phone and sync automatically when it is back online.

## Notes
- Anyone with the household code can read and edit the list, so keep it private.
- Same item edited on two phones at once: the last change wins.
- If you update the app files, change V in sw.js (e.g. hh-sync-v2) so phones pick up the new version.

## Logging who used what
- On first open, each person enters their own name once (stored on their phone).
- Tap "Log stock" on an item to say how many are left, e.g. "2 rolls". The app records who, when, and how many were used since the last count.
- Tap "Restocked" when new supply arrives (optionally enter how many you now have).
- "Low at..." on an item sets the count that triggers a "Running low" warning.
- History under each item and Recent activity at the bottom show all updates.
