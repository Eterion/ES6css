[![Build Status](https://travis-ci.org/Eterion/esm-scss.svg?branch=master)](https://travis-ci.org/Eterion/esm-scss)

> A collection of tools for css development, inspired by ES6 export and import mechanics, using [sass](http://sass-lang.com/) preprocessor.

## Install
You can use your favorite package manager with access to npm registry.

```
yarn add esm-scss
```

## Setup
Everything needed is included in the `esm` file. Read [wiki](https://github.com/Eterion/esm-scss/wiki) for more information.

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
  'width': 200px,
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

The `export` mixin creates a module with specific name and properties. Then, the `import` mixin automatically creates selector and gives access to properties through `get` function.
