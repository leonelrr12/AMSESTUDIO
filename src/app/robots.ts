import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/panel/", "/login/", "/api/"],
    },
    sitemap: "https://amsestudio.com/sitemap.xml",
  }
}
