export default {
  base: `/${process.env.npm_package_name}/`,
  description: process.env.npm_package_description,
  evergreen: true,
  themeConfig: {
    docsDir: 'docs',
    editLinks: true,
    lastUpdated: true,
    nav: [
      { text: 'About', link: '/' },
      { text: 'Constants', link: '/constants' },
      { text: 'Export', link: '/export' },
      { text: 'Functions', link: '/functions' },
      { text: 'Mixins', link: '/mixins' },
    ],
    repo: 'Eterion/esm-scss',
    sidebar: 'auto',
  },
  title: `${process.env.npm_package_name}@v${process.env.npm_package_version}`,
};
