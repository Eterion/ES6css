[![Npm](https://img.shields.io/npm/v/esm-scss.svg?style=flat-square)](https://www.npmjs.com/package/esm-scss)
[![Build Status](https://img.shields.io/travis/Eterion/esm-scss/master.svg?style=flat-square)](https://travis-ci.org/Eterion/esm-scss)

# ESM Scss

A collection of tools inspired by ES6 export and import mechanics, using
[sass](http://sass-lang.com/) pre-processor (scss syntax). Consists of constants
(variables), functions and mixins, which means it doesnt generate any css by it
self just by importing it.

## Install

You can use your favorite package manager with access to npm registry.

```bash
# npm
npm install esm-scss

# yarn
yarn add esm-scss
```

## Usage

Everything that is needed i included in `dist/esm` file, simply import it and
it's ready. This of course must correctly point to `node_modules` directory, but
that's up to you to make sure it's correct.

```scss
@import 'esm-scss/dist/esm';
```

---

## Table of Contents

- [Variables](#variables)
  - [const-export-defaults](#const-export-defaults)
- [Functions](#functions)
  - [get](#get)
  - [media](#media)
  - [clear-unit](#clear-unit)
  - [color-spectrum](#color-spectrum)
  - [color](#color)
  - [em-always](#em-always)
  - [em](#em)
  - [font-weight](#font-weight)
  - [hue-name](#hue-name)
  - [insert-nth](#insert-nth)
  - [interpolate](#interpolate)
  - [map-deep-get](#map-deep-get)
  - [map-filter](#map-filter)
  - [map-sort](#map-sort)
  - [rem-always](#rem-always)
  - [rem](#rem)
  - [str-replace](#str-replace)
  - [to-class](#to-class)
  - [to-id](#to-id)
  - [to-unicode](#to-unicode)
- [Mixins](#mixins)
  - [export](#export)
  - [extend](#extend)
  - [import](#import)
  - [props](#props)
  - [media-between](#media-between)
  - [media-only](#media-only)
  - [media-up-from](#media-up-from)
  - [media-up-to](#media-up-to)
  - [css-custom-properties](#css-custom-properties)
  - [has-class](#has-class)
  - [size](#size)
  - [transition](#transition)

## Variables

### const-export-defaults

Type: `Map`

Any property in this map is automatically added to every export item. Properties
added via [**export**](#mixin-export) or [**extend**](#mixin-extend) mixins take
precedence over defaults.

```scss
$const-export-defaults: (
  'unique': false,
) !default;
```

[_Back to top_](#table-of-contents)

## Functions

### get

Type: `Function`

Returns a property value from export item. Can be used inside a
[**import**](#mixin-import) mixin without **\$name** and **\$group** parameters.

```scss
get($prop, $name: false, $group: $export-group, $css-custom-properties: false, $data: $system-import)
```

| Name                  | Type                            | Description       | Default         |
| --------------------- | ------------------------------- | ----------------- | --------------- |
| prop                  | <code>string</code>             | Property name     | &ndash;         |
| name                  | <code>bool &#124; string</code> | Module name       | false           |
| group                 | <code>bool &#124; string</code> | Group key         | \$export-group  |
| css-custom-properties | <code>bool</code>               | Enable var syntax | false           |
| data                  | <code>map</code>                | Source map        | \$system-import |

```scss
element {
  height: rem(get(height) / 2);
}
```

[_Back to top_](#table-of-contents)

### media

Type: `Function`

Returns pixel value of media scale according to **\$value** property. Use of
[**media-between**](#mixin-media-between), [**media-only**](#mixin-media-only),
[**media-up-from**](#mixin-media-up-from) and
[**media-up-to**](#mixin-media-up-to) mixins is highly recommended instead of
creating new media rules through this function. Media breakpoints are completely
customizable through **\$const-media-scale** constant. Note that **both** option
on **\$prop** is relevant only when media breakpoint is defined as map of width
and height properties.

```scss
media($value, $prop: width)
```

| Name  | Type                              | Description                                                                 | Default |
| ----- | --------------------------------- | --------------------------------------------------------------------------- | ------- |
| value | <code>number &#124; string</code> | Scale or number                                                             | &ndash; |
| prop  | <code>string</code>               | Determines what value is returned, can be **width**, **height** or **both** | width   |

```scss
media(desktop) // returns 1680px
```

[_Back to top_](#table-of-contents)

### clear-unit

Type: `Function`

Returns a **\$number** stripped of its unit, if possible.

```scss
clear-unit($number)
```

| Name   | Type                | Description  | Default |
| ------ | ------------------- | ------------ | ------- |
| number | <code>number</code> | Input number | &ndash; |

```scss
clear-unit(16px) // returns 16
```

[_Back to top_](#table-of-contents)

### color-spectrum

Type: `Function`

Returns color **\$value** according to its position in provided **\$list**,
where the **\$list** represents the entire color spectrum.

```scss
color-spectrum($list, $value, $saturation: 100%, $lightness: 50%)
```

| Name       | Type                              | Description                                  | Default |
| ---------- | --------------------------------- | -------------------------------------------- | ------- |
| list       | <code>list</code>                 | List of values that represent color spectrum | &ndash; |
| value      | <code>number &#124; string</code> | Searched value                               | &ndash; |
| saturation | <code>number</code>               | Saturation (percent)                         | 100%    |
| lightness  | <code>number</code>               | Lightness (percent)                          | 50%     |

```scss
color-spectrum((0, 1, 2, 3, 4, 5, 6, 7, 8, 9), 2) // returns #aaff00
```

[_Back to top_](#table-of-contents)

### color

Type: `Function`

Returns scaled **\$color** according to a **\$scale** key. Allows easy color
scaling without the need of additional variables for each new color variant. The
source color can be passed as either direct color value or key identifier
present in **\$const-color-keys** constant. Scaling levels are completely
customizable through **\$const-color-scale** constant.

```scss
color($color, $scale: false)
```

| Name  | Type                             | Description        | Default |
| ----- | -------------------------------- | ------------------ | ------- |
| color | <code>color &#124; string</code> | Input color or key | &ndash; |
| scale | <code>bool &#124; string</code>  | Scale key          | false   |

```scss
color(gray, dark) // returns #4f4f4f
```

[_Back to top_](#table-of-contents)

### em-always

Type: `Function`

This function is identical to [**em**](#function-em) function, except it will
always convert to relative units, even if **\$const-relative-units** are
disabled.

```scss
em-always($number)
```

| Name   | Type                | Description  | Default |
| ------ | ------------------- | ------------ | ------- |
| number | <code>number</code> | Input number | &ndash; |

```scss
em-always(16px) // returns 1em
```

[_Back to top_](#table-of-contents)

### em

Type: `Function`

Returns a **\$number** recalculated to em units, if possible. Allows scaling
based on **\$const-relative-units-root** constant. To ensure visibility of all
elements, resulting numbers equal or below **\$const-relative-units-min** are
not recalculated. Requires **\$const-relative-units** set to true. Use
[**em-always**](#function-em-always) if you wish to convert to relative units,
regardless of global settings.

```scss
em($number, $unit: em, $ignore-const-relative-units: false)
```

| Name                        | Type                               | Description                                                                                                 | Default |
| --------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------- |
| number                      | <code>number</code>                | Input number                                                                                                | &ndash; |
| unit                        | <code>boolean &#124; string</code> | Returned unit                                                                                               | em      |
| ignore-const-relative-units | <code>boolean</code>               | Internal option, use [**em-always**](#function-em-always) or [**rem-always**](#function-rem-always) instead | false   |

```scss
em(16px) // returns 1em
```

[_Back to top_](#table-of-contents)

### font-weight

Type: `Function`

Returns a numeric representation of font-weight based on **\$value**. Allows the
use of readable values without the knowledge of real numbers used by css.
Complete map of keys and values is set through **\$const-font-weight-scale**
constant. This function is alternative to
[**postcss-font-weights**](https://github.com/jonathantneal/postcss-font-weights)
plugin.

```scss
font-weight($value)
```

| Name  | Type                              | Description         | Default |
| ----- | --------------------------------- | ------------------- | ------- |
| value | <code>number &#124; string</code> | Number or scale key | &ndash; |

```scss
font-weight(regular) // returns 400
```

[_Back to top_](#table-of-contents)

### hue-name

Type: `Function`

Returns color name of provided input color.

```scss
hue-name($value)
```

| Name  | Type                | Description                      | Default |
| ----- | ------------------- | -------------------------------- | ------- |
| value | <code>string</code> | Input color, or color-scale key. | &ndash; |

```scss
hue-name(#07c) // returns 'blue'
```

[_Back to top_](#table-of-contents)

### insert-nth

Type: `Function`

Insert value at list or map index.

```scss
insert-nth($list, $index, $value)
```

| Name  | Type                         | Description         | Default |
| ----- | ---------------------------- | ------------------- | ------- |
| list  | <code>list &#124; map</code> | Source list or map. | &ndash; |
| index | <code>number</code>          | Target index.       | &ndash; |
| value | <code>number &#124; string   | map</code>          | Value.  | &ndash; |

[_Back to top_](#table-of-contents)

### interpolate

Type: `Function`

Returns input template where placeholders '{n}' are replaced with data from map.

```scss
interpolate($template, $data)
```

| Name     | Type                | Description                         | Default |
| -------- | ------------------- | ----------------------------------- | ------- |
| template | <code>string</code> | Template string                     | &ndash; |
| data     | <code>map</code>    | Map of replacement keys with values | &ndash; |

[_Back to top_](#table-of-contents)

### map-deep-get

Type: `Function`

Extended version of the native
[**map-get**](http://sass-lang.com/documentation/Sass/Script/Functions.html#map_get-instance_method)
function, with nested maps support.

```scss
map-deep-get($map, $keys)
```

| Name | Type                            | Description           | Default |
| ---- | ------------------------------- | --------------------- | ------- |
| map  | <code>map</code>                | Source map            | &ndash; |
| keys | <code>string &#124; list</code> | Path to requested key | &ndash; |

[_Back to top_](#table-of-contents)

### map-filter

Type: `Function`

Returns a new map with filtered **\$keys** only. Throws an error if any value
from **\$keys** in **\$map** doesn't exists.

```scss
map-filter($map, $keys)
```

| Name | Type                            | Description           | Default |
| ---- | ------------------------------- | --------------------- | ------- |
| map  | <code>map</code>                | Source map            | &ndash; |
| keys | <code>string &#124; list</code> | List of filtered keys | &ndash; |

[_Back to top_](#table-of-contents)

### map-sort

Type: `Function`

Sort map (ascending) according to its value. If the value is a map, requested
sorting keys must be specified.

```scss
map-sort($map, $keys)
```

| Name | Type                            | Description                                       | Default |
| ---- | ------------------------------- | ------------------------------------------------- | ------- |
| map  | <code>map</code>                | Source map.                                       | &ndash; |
| keys | <code>string &#124; list</code> | List of keys (only when map item value is a map). | &ndash; |

[_Back to top_](#table-of-contents)

### rem-always

Type: `Function`

This function is identical to [**rem**](#function-rem) function, except it will
always convert to relative units, even if **\$const-relative-units** are
disabled.

```scss
rem-always($number)
```

| Name   | Type                | Description  | Default |
| ------ | ------------------- | ------------ | ------- |
| number | <code>number</code> | Input number | &ndash; |

```scss
rem-always(16px) // returns 1rem
```

[_Back to top_](#table-of-contents)

### rem

Type: `Function`

Returns a **\$number** recalculated to rem units, if possible. Allows scaling
based on **\$const-relative-units-root** constant. To ensure visibility of all
elements, resulting numbers equal or below **\$const-relative-units-min** are
not recalculated. Requires **\$const-relative-units** set to true. Use
[**rem-always**](#function-rem-always) if you wish to convert to relative units,
regardless of global settings.

```scss
rem($number)
```

| Name   | Type                | Description  | Default |
| ------ | ------------------- | ------------ | ------- |
| number | <code>number</code> | Input number | &ndash; |

```scss
rem(16px) // returns 1rem
```

[_Back to top_](#table-of-contents)

### str-replace

Type: `Function`

Replaces all occurences of **\$search** substring with **\$replace** in
**\$string**.

```scss
str-replace($string, $search, $replace: '')
```

| Name    | Type                | Description          | Default |
| ------- | ------------------- | -------------------- | ------- |
| string  | <code>string</code> | Initial string       | &ndash; |
| search  | <code>string</code> | Substring to replace | &ndash; |
| replace | <code>string</code> | New value            | ''      |

[_Back to top_](#table-of-contents)

### to-class

Type: `Function`

Returns a **\$class** string converted to class selector if possible. Doesn't
affect the input value if a class selector is already present.

```scss
to-class($class)
```

| Name  | Type                | Description | Default |
| ----- | ------------------- | ----------- | ------- |
| class | <code>string</code> | Class name  | &ndash; |

```scss
to-class(element) // returns .element
```

[_Back to top_](#table-of-contents)

### to-id

Type: `Function`

Returns a **\$id** string converted to id selector if possible. Doesn't affect
the input value if a id selector is already present.

```scss
to-id($id)
```

| Name | Type                | Description | Default |
| ---- | ------------------- | ----------- | ------- |
| id   | <code>string</code> | Id name     | &ndash; |

```scss
to-id(element) // returns #element
```

[_Back to top_](#table-of-contents)

### to-unicode

Type: `Function`

Converts **\$value** to a unicode string used by css content property. This
function is available because of a known bug, more information in this github
[**issue**](https://github.com/sass/sass/issues/1395). Only valid unicode values
are automatically detected and converted, everything else is returned in its
original input value.

```scss
to-unicode($value)
```

| Name  | Type                | Description | Default |
| ----- | ------------------- | ----------- | ------- |
| value | <code>string</code> | Value       | &ndash; |

```scss
to-unicode('e655') // returns '\e655'
```

[_Back to top_](#table-of-contents)

## Mixins

### export

Type: `Mixin`

Creates a new export item, that can be extracted using the
[**import**](#mixin-import) mixin. Includes few automatically computed
properties (name, selector). Throws an error if item with identical **\$name**
in a **\$group** already exists, use [**extend**](#mixin-extend) mixin if you
need to modify already existing item.

```scss
export($name, $props: false, $group: $export-group, $defaults: $const-export-defaults)
```

| Name     | Type                         | Description        | Default                 |
| -------- | ---------------------------- | ------------------ | ----------------------- |
| name     | <code>string</code>          | Module name        | &ndash;                 |
| props    | <code>bool &#124; map</code> | Property map       | false                   |
| group    | <code>string</code>          | Group key          | \$export-group          |
| defaults | <code>map</code>             | Default properties | \$const-export-defaults |

```scss
@include export(component-name, (...));
```

[_Back to top_](#table-of-contents)

### extend

Type: `Mixin`

Extends already existing item created via [**export**](#mixin-export) mixin.
Properties in the extend mixin takes precedence over already existing ones.
Throws an error if **\$name** in a **\$group** doesn't exists.

```scss
extend($name, $props: false, $group: $export-group)
```

| Name  | Type                         | Description  | Default        |
| ----- | ---------------------------- | ------------ | -------------- |
| name  | <code>string</code>          | Module name  | &ndash;        |
| props | <code>bool &#124; map</code> | Property map | false          |
| group | <code>string</code>          | Group key    | \$export-group |

```scss
@include extend(component-name, (...));
```

[_Back to top_](#table-of-contents)

### import

Type: `Mixin`

Extracts an item, previously defined via [**export**](#mixin-export) mixin, and
allows the use of [**get**](#function-get) function without the need of
specified group. This mixin internally uses [**props**](#mixin-props) mixin,
with the addition of automatically generated selector. The selector is class by
default, set **unique** property to true to enable id selector.

This mixin allows extra content to be passed (through `@content` directive).

```scss
import($name, $group: $export-group)
```

| Name  | Type                | Description | Default        |
| ----- | ------------------- | ----------- | -------------- |
| name  | <code>string</code> | Module name | &ndash;        |
| group | <code>string</code> | Group key   | \$export-group |

```scss
@include import(component-name) { ... }
```

[_Back to top_](#table-of-contents)

### props

Type: `Mixin`

Extracts an item, previously defined via [**export**](#mixin-export) mixin, and
allows the use of [**get**](#function-get) function without the need of
specified group. This mixin is internally used by [**import**](#mixin-import)
mixin. Unlike the [**import**](#mixin-import), this mixin doen't automatically
adds generated selector.

This mixin allows extra content to be passed (through `@content` directive).

```scss
props($name, $group: $export-group)
```

| Name  | Type                | Description | Default        |
| ----- | ------------------- | ----------- | -------------- |
| name  | <code>string</code> | Module name | &ndash;        |
| group | <code>string</code> | Group key   | \$export-group |

```scss
@include props(component-name) { ... }
```

[_Back to top_](#table-of-contents)

### media-between

Type: `Mixin`

Wraps the content with a specified media query between **\$lower** and
**\$upper** values. Use of [**media-up-from**](#mixin-media-up-from) mixin is
highly preferred before any other media mixin (not a requirement). The
**\$operator** parameter determines relationship between width and height
properties, only relevant when **\$prop** is set to **both**. Media breakpoints
are completely customizable through **\$const-media-scale** constant.

This mixin allows extra content to be passed (through `@content` directive).

```scss
media-between($lower, $upper, $prop: width, $operator: and, $direction: $const-media-direction)
```

| Name      | Type                              | Description                                                                 | Default                 |
| --------- | --------------------------------- | --------------------------------------------------------------------------- | ----------------------- |
| lower     | <code>number &#124; string</code> | Scale or number                                                             | &ndash;                 |
| upper     | <code>number &#124; string</code> | Scale or number                                                             | &ndash;                 |
| prop      | <code>string</code>               | Determines what value is returned, can be **width**, **height** or **both** | width                   |
| operator  | <code>string</code>               | Determines relationship between width and height, can be **and** or **or**  | and                     |
| direction | <code>string</code>               | Determines the direction for media query, can be **up** or **down**         | \$const-media-direction |

```scss
@include media-between(phone, desktop) { ... }
```

[_Back to top_](#table-of-contents)

### media-only

Type: `Mixin`

Wraps the content with a specified media query between provided **\$scale** and
previous scale in map. Use of [**media-up-from**](#mixin-media-up-from) mixin is
highly preferred before any other media mixin (not a requirement). The
**\$operator** parameter determines relationship between width and height
properties, only relevant when **\$prop** is set to **both**. Media breakpoints
are completely customizable through **\$const-media-scale** constant.

This mixin allows extra content to be passed (through `@content` directive).

```scss
media-only($scale, $prop: width, $operator: and, $direction: $const-media-direction)
```

| Name      | Type                | Description                                                                 | Default                 |
| --------- | ------------------- | --------------------------------------------------------------------------- | ----------------------- |
| scale     | <code>string</code> | Scale                                                                       | &ndash;                 |
| prop      | <code>string</code> | Determines what value is returned, can be **width**, **height** or **both** | width                   |
| operator  | <code>string</code> | Determines relationship between width and height, can be **and** or **or**  | and                     |
| direction | <code>string</code> | Determines the direction for media query, can be **up** or **down**         | \$const-media-direction |

```scss
@include media-only(phone) { ... }
```

[_Back to top_](#table-of-contents)

### media-up-from

Type: `Mixin`

Wraps the content with a specified media query from provided **\$scale** in
upward direction. Use of this mixin is highly preferred before any other media
mixin (not a requirement). The **\$operator** parameter determines relationship
between width and height properties, only relevant when **\$prop** is set to
**both**. Media breakpoints are completely customizable through
**\$const-media-scale** constant.

This mixin allows extra content to be passed (through `@content` directive).

```scss
media-up-from($scale, $prop: width, $operator: and, $direction: $const-media-direction)
```

| Name      | Type                              | Description                                                                 | Default                 |
| --------- | --------------------------------- | --------------------------------------------------------------------------- | ----------------------- |
| scale     | <code>number &#124; string</code> | Scale or number                                                             | &ndash;                 |
| prop      | <code>string</code>               | Determines what value is returned, can be **width**, **height** or **both** | width                   |
| operator  | <code>string</code>               | Determines relationship between width and height, can be **and** or **or**  | and                     |
| direction | <code>string</code>               | Determines the direction for media query, can be **up** or **down**         | \$const-media-direction |

```scss
@include media-up-from(phone) { ... }
```

[_Back to top_](#table-of-contents)

### media-up-to

Type: `Mixin`

Wraps the content with a specified media query from provided **\$scale** in
downward direction. Use of [**media-up-from**](#mixin-media-up-from) mixin is
highly preferred before any other media mixin (not a requirement). The
**\$operator** parameter determines relationship between width and height
properties, only relevant when **\$prop** is set to **both**. Media breakpoints
are completely customizable through **\$const-media-scale** constant.

This mixin allows extra content to be passed (through `@content` directive).

```scss
media-up-to($scale, $prop: width, $operator: and, $direction: $const-media-direction)
```

| Name      | Type                              | Description                                                                 | Default                 |
| --------- | --------------------------------- | --------------------------------------------------------------------------- | ----------------------- |
| scale     | <code>number &#124; string</code> | Scale or number                                                             | &ndash;                 |
| prop      | <code>string</code>               | Determines what value is returned, can be **width**, **height** or **both** | width                   |
| operator  | <code>string</code>               | Determines relationship between width and height, can be **and** or **or**  | and                     |
| direction | <code>string</code>               | Determines the direction for media query, can be **up** or **down**         | \$const-media-direction |

```scss
@include media-up-to(phone) { ... }
```

[_Back to top_](#table-of-contents)

### css-custom-properties

Type: `Mixin`

Outputs :root element with all properties from detected modules.

This mixin allows extra content to be passed (through `@content` directive).

```scss
css-custom-properties()
```

```scss
@include css-custom-properties { ... }
```

[_Back to top_](#table-of-contents)

### has-class

Type: `Mixin`

Adds a **\$list** of classes to a root element. Individual values are converted
to a class if possible. New classes are placed at the beginning of the selector,
therefore the root element must be either class or id selector.

This mixin allows extra content to be passed (through `@content` directive).

```scss
has-class($list)
```

| Name | Type                            | Description         | Default |
| ---- | ------------------------------- | ------------------- | ------- |
| list | <code>string &#124; list</code> | List of class names | &ndash; |

```scss
@include has-class(is-open, is-active) { ... }
```

[_Back to top_](#table-of-contents)

### size

Type: `Mixin`

Allows to use shorthand properties to represent width and height. Unitless
values are handled as aspect ratio. Skip token **false** can be used to skip
width or height property. This mixin already includes unit conversion, use
non-relative units for input value, can be disabled by setting **\$method**
parameter to **false**. This mixin is alternative to
[**postcss-short-size**](https://github.com/jonathantneal/postcss-short-size)
plugin.

```scss
size($size, $method: rem)
```

| Name   | Type                            | Description                                                               | Default |
| ------ | ------------------------------- | ------------------------------------------------------------------------- | ------- |
| size   | <code>number &#124; list</code> | Size, or space separated list of width and height (set **false** to skip) | &ndash; |
| method | <code>bool &#124; string</code> | Function called on the value, use **em** or **rem**                       | rem     |

```scss
@include size(640px 4/3);
```

[_Back to top_](#table-of-contents)

### transition

Type: `Mixin`

Shortcut mixin for transition property. Allows to apply multiple transition
properties with identical options.

```scss
transition($options, $properties)
```

| Name       | Type                            | Description                         | Default |
| ---------- | ------------------------------- | ----------------------------------- | ------- |
| options    | <code>string</code>             | Options applied to every transition | &ndash; |
| properties | <code>string &#124; list</code> | List of properties                  | &ndash; |

```scss
@include transition(300ms, width, height);
```

[_Back to top_](#table-of-contents)

---

**Last Updated:** Wed Jan 30 2019 09:53:27 GMT+0100 (Central European Standard
Time)
