[![Build Status](https://travis-ci.org/Eterion/ES6css.svg?branch=master)](https://travis-ci.org/Eterion/ES6css)

# ES6css
Engine for front-end web development of css, using [sass](http://sass-lang.com/) preprocessor (scss syntax).

## What's this?
The word engine may be a little too strong (sounds cool though). Essentially it's a collection of functions, mixins and variables. However it's not a framework, it doesn't have any predefined appearance you can use.

It started as a experimental custom framework for web application, that would eliminate the need for multiple variables for a single component. Eventually, I've reduced the complexity, removed bunch of stuff that are too specific for a given project and made it more simple and independent.

The main feature is the **export** and **import** mechanics, inspired by ES6 specification, that allows to create modules (components) with properties and using those properties in css definitions, all without the need of multiple variables for each module.

## Contents

- [Docs](#docs)
- [Setup](#setup)
- [Constants](#constants)
- [Modules](#modules)

## Docs
Documentation can be generated via `npm run docs` command (using [sassdoc](http://sassdoc.com/) package) and will be available in the `/docs` directory. Note that the documentation contains mostly just mixins, functions and placeholders. Variables are described in the [constants](#constants) section below.

## Setup
Everything needed is included in the `esm` file.

```scss
@import 'dist/esm';
```

View the demo [export](demo/_export.scss) file for a example. Notice all the constants are placed before the esm import, while non-constants after. This works perfectly thanks to the sass `!default` flag. Optional [animation](dist/_animation.scss) and [placeholder](dist/_placeholder.scss) files can be imported after `esm` if desired.

## Constants
Fair amount of options can be set through sass variables. Always prefixed with the `const` keyword, must be placed before the `esm` import.

## Modules
TBD
