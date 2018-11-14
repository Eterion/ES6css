---
home: true
heroImage: /hero.png
actionLink: https://github.com/Eterion/esm-scss/tree/master/demo
actionText: Demo
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

Simple module example, see
[demo](https://github.com/Eterion/esm-scss/tree/master/demo) folder for more
examples.

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
