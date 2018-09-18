---
next: /const
---

# Guide

## Install

You can use your favorite package manager with access to npm registry.

```bash
# npm
npm install esm-scss

# yarn
yarn add esm-scss
```

## Usage

Everything that is needed is included in `dist/esm` file, simply import it and
it's done.

<Tip>

This ofcourse must correctly point to `node_modules` directory, but that's up to
you to make sure it's correct.

</Tip>

```scss
@import 'esm-scss/dist/esm';
```

## Constant Placement

Customization and settings is available through [constants](/const.md). All
constants are defined with `!default` flag, this means all constants must be
placed **before** the `dist/esm` import.

## Modules

### Create Module

Modules are created via [export](/mixin.md#export) mixin.

```scss
@include export(<module-name>, <props>);
```

<Tip>

This mixin will throw error when multiple modules with identical names are
created. If you want to have modules with same names, use [groups](#groups) to
recognize them between each other.

</Tip>

For example, if I want to create a **_user_** module with **_background-color_**
and **_size_** properties, the export mixin will look like this:

```scss
@include export(
  user,
  (
    'background-color': gray,
    'width': 40px,
  )
);
```

### Update Module

Updating or adding new properties to module is done via
[extend](/mixin.md#extend) mixin.

```scss
@include extend(<module-name>, <props>);
```

<Tip type="warn">

This mixin will throw error when attempting to extend non-existing module.

</Tip>

For example, if my **_user_** module has different **_background-color_** in
another theme, I'll do the following:

```scss
@include extend(
  user,
  (
    'background-color': blue,
  )
);
```

### Use Module

Modules are used via [import](/mixin.md#import) mixin, while properties are
extracted using [get](/fn.md#get) function.

```scss
@include import(<module-name>);
```

<Tip>

The **import** mixin will automatically generate class from module name. Classes
can be modified via [template](/const.md#template) constants. If you don't want
generated classes at all and use your own, use [props](/mixin.md#props) mixin
instead.

</Tip>

For example, to use my **_user_** module:

```scss
@include import(user) {
  background-color: get(background-color);
  height: get(size);
  width: get(size);
}
```

My resulting **_user_** css would look like this:

```css
.user {
  background-color: blue;
  height: 40px;
  width: 40px;
}
```

### Groups

Groups can be used to separame module types or for whatever reason you like,
it's up to you. Groups first need to be created via
[export-groups](/const.md#export-groups) constant, see constant
[placemnet](#constant-placement). This constant is just a simple map, where map
_key_ is readable group representation, and map _value_ is internal group id,
also used for class generation.

<Tip>

Add `$export-group: component;` before the initial **export** definition. All
subsequent [export](/mixin.md#export), [extend](/mixin.md#extend),
[import](/mixin.md#import) and [props](/mixin.md#props) mixin will automatically
select that group without dedicated group parameter.

```scss
$export-group: component;
@include export(user, ( ... ));
@include import(user) { ... }
```

</Tip>

For example, I want to have two module groups, **_component_** and **_design_**.
First, I correctly add the group names and identifiers to the appropriate
constant:

```scss
$const-export-groups: (
  'component': 'c',
  'design': 'd',
);
```

After that, I can create my **_user_** module with group as third parameter:

```scss
@include export(
  user,
  (
    'background-color': gray,
    'width': 40px,
  ),
  component
);
```

Then, to use my **_user_** module with group as second parameter:

```scss
@include import(user, component) {
  background-color: get(background-color);
  height: get(size);
  width: get(size);
}
```

My compiled css would look like this:

```css
.c-user {
  background-color: gray;
  height: 40px;
  width: 40px;
}
```

### Export Defaults

Map of default properties can be added to every created module. By default, only
`unique` property is present, which determines whenever _class_ or _id_ is
generated via [import](/mixin.md#import) mixin, where `unique: true` will
generate _id_ instead of _class_.

<Tip type="warn">

This variable must be placed before any **export** mixins.

</Tip>

```scss
$export-defaults: (
  'unique': false,
);
```
