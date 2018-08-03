# About

A collection of tools for css development, inspired by ES6 export and import
mechanics, using [sass](http://sass-lang.com/) pre-processor (scss syntax).
Consists of constants, functions and mixins, which means it doesn't generate any
css by it self just by importing it.

```scss
@import 'esm-scss/dist/esm';
```

## What's this?

It started as an experimental custom framework for a web application, that would
eliminate the need to repeat component name in each variable multiple times per
file. Eventually, I've reduced the complexity, removed bunch of stuff that were
too specific and made it more simple and independent.

The main feature of this thing is the export and import mechanics, inspired by
ES6 specification, that allows to create modules with properties and using those
properties in css, only by using one mixin instead of multiple variables.

## Example

Let's say your fancy project is made of components. Each component comes with
tons of easy to use variables for css properties (like `background-color`,
`width` etc.) Now look at your component file, how many times is the component
name referenced? Is it more than once? Then consider this.

### Export

Create component using the `export` mixin, where first parameter is the
component name, and second parameter is a map of properties and its values.

```scss
@include export(
  component-name,
  (
    'background-color': red,
    'width': 100px,
  )
);
```

### Import

Use `import` mixin to gain access to component properties, class is
automatically generated.

```scss
@include import(component-name) {
  background-color: get(background-color);
  width: get(width);
}
```

### CSS

```css
.component-name {
  background-color: red;
  width: 100px;
}
```

## Install

You can use your favorite package manager with access to npm registry.

### NPM

```
$ npm install esm-scss
```

### Yarn

```
$ yarn add esm-scss
```
