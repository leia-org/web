// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

 /** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'LEIA',
  tagline: 'Create your Custom AI Assistant',
  favicon: 'img/LEIALogo.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Production URL of your site
  url: 'https://leia.ovh',
  // For project pages on GitHub, baseUrl must be '/<repo>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'leia-org', // GitHub org name
  projectName: 'leia-docs',     // Repo name
  deploymentBranch: 'gh-pages', // Branch used by Pages

  onBrokenLinks: 'throw',

  // i18n
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/leia-org/leia-docs/tree/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'LEIA',
        logo: {
          alt: 'LEIA Logo',
          src: 'img/LEIALogo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            type: 'docsVersionDropdown',
            position: 'left',
            dropdownItemsAfter: [{to: '/versions', label: 'All versions'}],
            dropdownActiveClassDisabled: true,
          },
          {
            to: '/docs/tags',
            label: 'Tags',
            position: 'right',
          },
          {
            href: 'https://github.com/leia-org/leia-docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/docusaurus' },
              { label: 'Discord', href: 'https://discordapp.com/invite/docusaurus' },
              { label: 'X', href: 'https://x.com/docusaurus' },
            ],
          },
          {
            title: 'More',
            items: [
              { label: 'GitHub', href: 'https://github.com/leia-org/leia-docs' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} LEIA.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      mermaid: {
        theme: {
          light: 'neutral',
          dark: 'dark'
        },
      },
      algolia: {
        appId: 'WR7AJHB6S8',
        apiKey: '6cef3f0cccb4068d98a80bbc7cccaeb6',
        indexName: 'leia web docs crawler',
        contextualSearch: true,
        searchPagePath: 'search',
      },
    }),
};

export default config;
