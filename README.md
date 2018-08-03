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

```
$ yarn add esm-scss
```

## Example

Let's say your fancy project is made of components. Each component comes with
tons of easy to use variables for css properties (like `background-color`,
`width` etc.) Now look at your component file, how many times is the component
name referenced? Is it more than once? Then consider this.

```scss
// 1. Create component
@include export(
  component-name,
  (
    'background-color': red,
    'width': 100px,
  )
);

// 2. Use component
@include import(component-name) {
  background-color: get(background-color);
  width: get(width);
}

// 3. Compiled css
.component-name {
  background-color: red;
  width: 100px;
}
```
