import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const ORG_NAME = process.env.ORG_NAME || "default-org";
const REPO_NAME = process.env.REPO_NAME || "lerndoku";

const config: Config = {
  title: "Lerndokumentation",
  tagline: "",
  favicon: "img/favicon.ico",

  url: `https://${ORG_NAME}.github.io`, // e.g. "https://my-username.github.io"
  baseUrl: `/${REPO_NAME}/`, // e.g. "/my-repo/"

  organizationName: ORG_NAME, // e.g. "my-username"
  projectName: REPO_NAME, // e.g. "my-repo"

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      {
        hashed: true,
        // Uncomment and adjust the options below if needed:
        // language: ["en", "zh"],
        // forceIgnoreNoIndex: true,
      },
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "",
      logo: {
        alt: "logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Dokus",
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
