[![Build Status](https://travis-ci.org/Eterion/esm-scss.svg?branch=master)](https://travis-ci.org/Eterion/esm-scss)

> A collection of tools for css development, inspired by ES6 export and import mechanics, using [sass](http://sass-lang.com/) preprocessor.

## Install

```
$ yarn add esm-scss
```

## Setup

Everything needed is included in the `esm` file.

```scss
@import '~esm-scss/dist/esm';
```

## What's this?

It started as a experimental custom framework for webp application, that would eliminate the need to repeat component name in each variable. Eventually, I've reduced the complexity, removed bunch of stuff that were too specific and made it more simple and independent.

The main features is the **export** and **import** mechanics, inspired by ES6 specification, that allows to create modules (components) with properties and using those properties in css definitions, all without the need of multiple variables for each module.
