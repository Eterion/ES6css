module.exports = {
  base: `/${process.env.npm_package_name}/`,
  description: process.env.npm_package_description,
  evergreen: true,
  themeConfig: {
    docsDir: 'docs',
    editLinks: true,
    lastUpdated: true,
    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'Constants', link: '/const' },
      { text: 'Functions', link: '/fn' },
      { text: 'Mixins', link: '/mixin' },
    ],
    repo: 'Eterion/esm-scss',
    sidebar: 'auto',
  },
  title: `ESM Scss`,
};
