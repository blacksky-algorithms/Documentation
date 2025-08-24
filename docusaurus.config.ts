import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Blacksky Documentation",
  favicon: "img/clear-blacksky-favicon.ico",
  url: "https://docs.blackskyweb.xyz",
  baseUrl: "/",
  organizationName: "blacksky-algorithms",
  projectName: "blacksky-algorithms.github.io",
  trailingSlash: false,
  deploymentBranch: "gh-pages",
  onBrokenLinks: "log",
  onBrokenMarkdownLinks: "warn",
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/blacksky-webclip-256.png",
    navbar: {
      title: "Blacksky Algorithms",
      logo: {
        alt: "The Blacksky logo",
        src: "img/blacksky-favicon.ico",
      },
      items: [
        { to: "/docs", label: "Docs", position: "left" },
        { to: "https://blog.rudyfraser.com/", label: "Blog", position: "left" },
        {
          href: "https://github.com/blacksky-algorithms/rsky",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Introduction",
              to: "/docs",
            },
            {
              label: "Frequently Asked Questions",
              to: "/faq",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "BlueSky",
              href: "https://bsky.app/profile/blacksky.app",
            },
            {
              label: "Discord",
              href: "https://discord.com/invite/AFuuPvM7zZ",
            },
            {
              label: "Instagram",
              href: "https://www.instagram.com/blacksky.app",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/blacksky-algorithms",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              href: "https://blog.rudyfraser.com",
            },
            {
              label: "GitHub",
              href: "https://github.com/blacksky-algorithms",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} BlackSky Algorithms, Inc`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
