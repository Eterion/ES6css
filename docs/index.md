# What's this?

It started as an experimental custom framework for a web application, that would eliminate the need to repeat component name in each variable multiple times per file. Eventually, I've reduced the complexity, removed bunch of stuff that were too specific and made it more simple and independent.

The main feature of this thing is the export and import mechanics, inspired by ES6 specification, that allows to create modules with properties and using those properties in css, only by using one mixin instead of multiple variables.

## Example (simple)

Let's say your project is made of components. Each component comes with tons of variables (like `background-color`, `width`, `height` etc.). Now lookt at your css, how many times is the component name referred? More than once? Consider this.

```scss
// 1. Create component with a list of properties.
@include export(component-name, (
  'background-color': red,
  'height': 100px,
  'width': 200px,
));

// 2. Import component and use functions to access properties.
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

## Contents

- [Install](#install)
- [Setup](#setup)
- [Constants](#constants) (TBD)
- [Functions](#functions) (TBD)
- [Mixins](#mixins) (TBD)

## Install

Use your favorite package manager with access to npm registry.

```
yarn add esm-scss
```

## Setup

Everything needed is included in `esm` file.

```scss
@import 'esm-scss/dist/esm';
```
