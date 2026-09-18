import { defineConfig, fontProviders } from "astro/config";
import solid from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel";

// Canonical URL = Vercel deployment. Replace with custom domain when purchased.
// NOTE: Vercel subdomains use .vercel.app (not .vercel.com).
const SITE = "https://webcodersevvy.vercel.app";

export default defineConfig({
  site: SITE,
  output: "static",
  integrations: [solid(), sitemap()],

  // Display type: Melodrama (Fontshare, OFL) via Astro's Fonts API.
  // Downloaded at build, self-hosted from _astro/fonts — no third-party
  // requests, automatic fallbacks + font-display: swap. Only weights in use.
  fonts: [
    {
      provider: fontProviders.fontshare(),
      name: "Melodrama",
      cssVariable: "--font-display",
      weights: [400, 500, 600],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["Georgia", "serif"],
    },
  ],

  vite: {
    build: {
      cssMinify: true,
    },
  },

  adapter: vercel(),
});