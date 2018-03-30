[![Build Status](https://img.shields.io/travis/Eterion/esm-scss/master.svg?style=flat-square)](https://travis-ci.org/Eterion/esm-scss)
[![Npm](https://img.shields.io/npm/v/esm-scss.svg?style=flat-square)](https://www.npmjs.com/package/esm-scss)

**_Please note, this package is still in development. I don't recommend to use in production until version 1.0.0 is released. Any suggestions for improvements or changes are welcomed._**

> A collection of tools for css development, inspired by ES6 export and import mechanics, using [sass](http://sass-lang.com/) preprocessor.

## Contents

* [Install](#install)
* [Setup](#setup)
* [What's this?](#whats-this)
* [Example](#example)
* [Wiki](#wiki)

## Install

You can use your favorite package manager with access to npm registry.

```
yarn add esm-scss
```

## Setup

Everything needed is included in the `esm` file.

```scss
@import 'dist/esm';
```

## What's this?

It started as a experimental custom framework for web application, that would eliminate the need to repeat component name in each variable multiple times per file. Eventually, I've reduced the complexity, removed bunch of stuff that were too specific and made it more simple and independent.

The main feature is the **export** and **import** mechanics, inspired by ES6 specification, that allows to create modules (components) with properties and using those properties in css definitions, all without the need of multiple variables for each module.

## Example

Let's say your project is based on components, each component has unique name and comes with tons of easy to define variables (like background-color, width, height etc.). Now when you look at the component file, how many times is the component name referred? If it's more than once, consider this:

```scss
// variables.scss
@include export(component-name, (
  'background-color': red,
  'height': 100px,
  'width': 200px
));

// component.scss
@include import(component-name) {
  background-color: get(background-color);
  height: get(height);
  width: get(width);
}

// app.css
.component-name {
  background-color: red;
  height: 100px;
  width: 200px;
}
```

- The `export` mixin creates a module with unique name (within groups, if used) and properties.
- After that, the `import` mixin automatically creates selector and gives access to properties through `get` function.

## Wiki

There are loads of more functions and mixins, including automatic calculation of relative (em and rem) units, color adjustments, font weights, media queries, grid etc. Read [wiki](https://github.com/Eterion/esm-scss/wiki) for detailed information.
