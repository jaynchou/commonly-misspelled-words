import type { MetadataRoute } from "next";

const routes = ["", "/commonly-misspelled-words", "/leaderboard", "/how-to-play", "/faq", "/about", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://typofind.com";
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : route === "/commonly-misspelled-words" ? 0.9 : 0.6
  }));
}
