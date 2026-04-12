import { defineConfig } from "vitepress";

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: "KYUSDA",
  description:
    "KYUSDA Platform Documentation - Release Notes, Architecture Guides, and Deployment Information",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    sidebar: {
      "/v0/": [
        {
          text: "Version 0",
          items: [{ text: "v0.1 Release Notes", link: "/v0/v0.1" }],
        },
      ],
      "/v1/": [
        {
          text: "Version 1",
          items: [{ text: "v1.2 Release Notes", link: "/v1/v1.2" }],
        },
      ],
      "/v2/": [
        {
          text: "Version 2",
          items: [
            { text: "v2.1 Release Notes", link: "/v2/v2.1" },
            { text: "Client Guide", link: "/v2/client" },
            { text: "Server Guide", link: "/v2/server" },
            { text: "Sanity CMS Guide", link: "/v2/sanity" },
            { text: "Features & Status", link: "/v2/feats" },
            { text: "Deployments & Hosting", link: "/v2/deployments" },
          ],
        },
      ],
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "v0", link: "/v0/v0.1" },
      { text: "v1", link: "/v1/v1.2" },
      { text: "v2", link: "/v2/v2.1" },
    ],
  },
});
