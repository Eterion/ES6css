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
