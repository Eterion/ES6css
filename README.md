<!-- prettier-ignore -->
[![Npm](https://img.shields.io/npm/v/esm-scss.svg?style=flat-square)](https://www.npmjs.com/package/esm-scss)
[![Build Status](https://img.shields.io/travis/Eterion/esm-scss/master.svg?style=flat-square)](https://travis-ci.org/Eterion/esm-scss)

# ESM Scss

A collection of tools for css development, inspired by ES6 export and import
mechanics, using [sass](http://sass-lang.com/) pre-processor (scss syntax).
Consists of constants, functions and mixins, which means it doesn't generate any
css by it self just by importing it.

[https://eterion.github.io/esm-scss/](https://eterion.github.io/esm-scss/)

## Install

You can use your favorite package manager with access to npm registry.

```bash
# npm
npm install esm-scss

# yarn
yarn add esm-scss
```

## Usage

Everything that is needed is included in `dist/esm` file, simply import it and
it's done. This of course must correctly point to `node_modules` directory, but
that's up to you to make sure it's correct.

```scss
@import 'esm-scss/dist/esm';
```
