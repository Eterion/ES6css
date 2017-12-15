# ES6css
Tools for frond-end web development, using [sass](http://sass-lang.com/) preprocessor (scss syntax).

## About
This project started as a experimental custom framework for web application, that would eliminate the need for multiple variables for a single component. It had much more things going on, so I've decided to make it more simple and independent from the web project.

The main feature is the export and import mechanics, inspired by ES6 specification, that allows to create components (modules) with properties and using those properties in css definitions, all without the need of multiple variables.

## Contents

- [Docs](#docs)
- [Setup](#setup)
- Options (TBD)

## Docs
Not all functions, mixins etc. are mentioned in this readme. Documentation can be generated via `npm run docs` command (using [sassdoc](http://sassdoc.com/) package) and  will be available in the `/docs` directory.

## Setup
Everything needed is included in the `esm` file.

```scss
@import 'dist/esm';
```

View the demo [export](demo/_export.scss) file for a real example. Notice that all the constants are placed before the esm import, and non-constants after. This works thanks to the sass `!default` flag, see [options](#options) for more details on what is available. Optional `animation` and `placeholder` files can be imported after `esm` if needed.
