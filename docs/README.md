---
home: true
heroImage: /hero.png
actionLink: /guide
actionText: Get Started →
features:
  - title: Modules
    details:
      Create modules with properties via simple mixins. Having multiple
      variables per component is no longer needed.
  - title: Themes
    details:
      The system was build with themes in mind, all you need to do is extend
      modules with updated properties for each theme.
  - title: CSS
    details:
      Does not output any css by itself. This library contains only constants,
      functions and mixins.
footer: MIT License
---

## Example

Simple module example.

### 1. Export

```scss
@include export(
  module-name,
  (
    'background-color': red,
    'width': 100px,
  )
);
```

### 2. Import

```scss
@include import(module-name) {
  background-color: get(background-color);
  width: get(width);
}
```

### 3. CSS

```css
.module-name {
  background-color: red;
  width: 100px;
}
```

## About

It started as an experimental custom framework for a web application, that would
eliminate the need to repeat component name multiple times per file. Eventually,
I've reduced the complexity, removed bunch of stuff that were too specific and
made it more simple and independent.

The main feature of this thing is the **export** and **import** mechanics,
inspired by ES6 specification, that allows to create modules with properties and
using those properties in css, only by using mixin instead of multiple
variables.
