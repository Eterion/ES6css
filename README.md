[![Npm](https://img.shields.io/npm/v/esm-scss.svg?style=flat-square)](https://www.npmjs.com/package/esm-scss)
[![Build Status](https://img.shields.io/travis/Eterion/esm-scss/master.svg?style=flat-square)](https://travis-ci.org/Eterion/esm-scss)

# ESM Scss

A collection of tools for css development, inspired by ES6 export and import
mechanics, using [sass](http://sass-lang.com/) preprocessor.

## What's this?

It started as an experimental custom framework for a web application, that would
eliminate the need to repeat component name in each variable multiple times per
file. Eventually, I've reduced the complexity, removed bunch of stuff that were
too specific and made it more simple and independent.

The main feature of this thing is the export and import mechanics, inspired by
ES6 specification, that allows to create modules with properties and using those
properties in css, only by using one mixin instead of multiple variables.

## Contents

- [Example (simple)](#example-simple)
- [Install](#install)
- [Getting Started](#getting-started)

## Example (simple)

Let's say your fancy project is made of components. Each component comes with
tons of easy to use variables for css properties (like `background-color`,
`border` etc.). Now look at your component file, how many times is the component
name referred? Is it more than once? Then consider this.

```scss
// 1. Create component with a list of properties
@include export(
  component-name,
  (
    'background-color': red,
    'height': 100px,
    'width': 200px,
  )
);

// 2. Import component and use 'get' functions to access properties
@include import(component-name) {
  background-color: get(background-color);
  height: get(height);
  width: get(width);
}

// 3. Generated css
.component-name {
  background-color: red;
  height: 100px;
  width: 200px;
}
```

## Install

You can use your favorite package manager with access to npm registry.

```
$ yarn add esm-scss
```

Once installed, simply import `esm` file, it has everything that's needed for
complete functionality.

```scss
@import 'esm-scss/dist/esm';
```

## Getting Started

This collection of tools consists of constants, functions and mixins. This also
means it doesn't generate any css by it self just by importing it.

- [Constants](readme/const)
- [Export](readme/export) (including extend and import)
- [Functions and Mixins](https://eterion.github.io/esm-scss/)
