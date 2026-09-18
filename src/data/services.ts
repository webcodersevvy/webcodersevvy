export interface Service {
  index: string;
  slug: string;
  title: string;
  desc: string;
  tags: string[];
  deliverables: string[];
  bestFor: string;
}

export const services: Service[] = [
  {
    index: "S.01",
    slug: "shopify-theme-development",
    title: "Shopify Theme Development",
    desc: "[Placeholder] Custom, accessible Liquid themes — builds, rebuilds, and CRO-ready refactors without app bloat.",
    tags: ["Liquid", "OS 2.0", "Sections"],
    deliverables: [
      "Custom OS 2.0 theme or section-level rebuild",
      "Accessible cart, search, and checkout-adjacent flows",
      "App consolidation and script audit",
      "Editor documentation for your team",
    ],
    bestFor: "Merchants outgrowing a stock theme, or agencies needing a dependable theme build.",
  },
  {
    index: "S.02",
    slug: "headless-commerce",
    title: "Headless Commerce",
    desc: "[Placeholder] Headless storefronts on Storefront APIs — content-driven, fast, and maintainable.",
    tags: ["Storefront API", "Astro", "Headless"],
    deliverables: [
      "Headless storefront on the Shopify Storefront API",
      "Content model and CMS wiring",
      "Static-first rendering with interactive islands",
      "Performance budget and Core Web Vitals pass",
    ],
    bestFor: "Brands needing editorial freedom and sub-second loads that Liquid alone can't deliver.",
  },
  {
    index: "S.03",
    slug: "webflow-framer",
    title: "Webflow & Framer",
    desc: "[Placeholder] Marketing sites and landing systems with clean structure, CMS, and handoff docs.",
    tags: ["Webflow", "Framer", "CMS"],
    deliverables: [
      "Marketing site or landing system",
      "CMS structure your team can actually edit",
      "Motion and interaction polish",
      "Handoff video and documentation",
    ],
    bestFor: "Marketing teams that need to ship pages without filing a ticket.",
  },
  {
    index: "S.04",
    slug: "frontend-development",
    title: "Frontend Development",
    desc: "[Placeholder] Design-to-code execution — semantic markup, design tokens, interaction, and polish.",
    tags: ["TypeScript", "Solid", "Design systems"],
    deliverables: [
      "Pixel-faithful build from Figma or Framer",
      "Token-driven CSS architecture",
      "Accessible, keyboard-tested components",
      "Typed, reviewed, documented code",
    ],
    bestFor: "Design teams and agencies that need a developer who respects the file.",
  },
  {
    index: "S.05",
    slug: "performance-optimization",
    title: "Performance Optimization",
    desc: "[Placeholder] Core Web Vitals work — audits, image strategy, font loading, and JS diet.",
    tags: ["CWV", "Images", "Fonts"],
    deliverables: [
      "CWV audit with prioritized fix list",
      "Responsive image and font-loading strategy",
      "JavaScript reduction and hydration review",
      "Before/after report with verified numbers only",
    ],
    bestFor: "Stores visibly slowed by apps, page builders, or legacy themes.",
  },
  {
    index: "S.06",
    slug: "white-label",
    title: "White-label Development",
    desc: "[Placeholder] Reliable build capacity for agencies and design teams — scoped, documented, on time.",
    tags: ["Agencies", "NDA-friendly", "Handoff"],
    deliverables: [
      "Scoped builds under your brand and process",
      " milestone previews and QA checklist",
      "Clean handoff package for your client",
      "Ongoing capacity on retainer-style terms",
    ],
    bestFor: "Agencies that need senior build capacity without hiring.",
  },
];
