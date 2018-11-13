module.exports = {
  base: `/${process.env.npm_package_name}/`,
  description: process.env.npm_package_description,
  evergreen: true,
  ga: 'UA-126139204-1',
  themeConfig: {
    docsDir: 'docs',
    editLinks: true,
    lastUpdated: true,
    nav: [
      { text: 'Constants', link: '/const' },
      { text: 'Functions', link: '/fn' },
      { text: 'Mixins', link: '/mixin' },
    ],
    repo: 'Eterion/esm-scss',
    sidebar: 'auto',
  },
  title: `ESM Scss`,
};
