export default {
  base: `/${process.env.npm_package_name}`,
  description: process.env.npm_package_description,
  evergreen: true,
  themeConfig: { sidebar: 'auto' },
  title: `${process.env.npm_package_name}@v${process.env.npm_package_version}`,
};
