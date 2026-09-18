import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "http://www.myaimcollege.in";

  const routes = [
    "",
    "/about",
    "/about/chairman",
    "/about/director",
    "/about/recognition",
    "/academics",
    "/academics/bca",
    "/academics/bba",
    "/academics/mms",
    "/admissions",
    "/faculty",
    "/campus-life",
    "/resources/notices",
    "/resources/downloads",
    "/alumni",
    "/contact"
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8
  }));
}
