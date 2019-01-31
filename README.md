[![Npm](https://img.shields.io/npm/v/esm-scss.svg?style=flat-square)](https://www.npmjs.com/package/esm-scss)
[![Build Status](https://img.shields.io/travis/Eterion/esm-scss/master.svg?style=flat-square)](https://travis-ci.org/Eterion/esm-scss)

# ESM Scss

A collection of tools inspired by ES6 export and import mechanics, using
[sass](http://sass-lang.com/) pre-processor (scss syntax). Consists of constants
(variables), functions and mixins, which means it doesn't generate any css by it
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

> Constants are defined with `!default` flag, this means all constants must be
> placed **before** the `dist/esm` import.

```scss
@import 'esm-scss/dist/esm';
```

## Example

```scss
// Export
@include export(
  module-name,
  (
    'background-color': red,
    'width': 100px,
  )
);

// Import
@include import(module-name) {
  background-color: get(background-color);
  width: get(width);
}

// CSS
.module-name {
  background-color: red;
  width: 100px;
}
```

---

## Contents

- [Constants](#constants)
  - [const-color-keys](#const-color-keys)
  - [const-color-scale](#const-color-scale)
  - [const-custom-properties](#const-custom-properties)
  - [const-custom-properties-fallback](#const-custom-properties-fallback)
  - [const-custom-properties-redirect-var](#const-custom-properties-redirect-var)
  - [const-export-defaults](#const-export-defaults)
  - [const-export-groups](#const-export-groups)
  - [const-font-weight-scale](#const-font-weight-scale)
  - [const-media-direction](#const-media-direction)
  - [const-media-scale](#const-media-scale)
  - [const-media-sort](#const-media-sort)
  - [const-monochrome-steps](#const-monochrome-steps)
  - [const-preserve-defaults](#const-preserve-defaults)
  - [const-relative-units](#const-relative-units)
  - [const-relative-units-min](#const-relative-units-min)
  - [const-relative-units-root](#const-relative-units-root)
  - [const-template](#const-template)
  - [const-template-group](#const-template-group)
- [Functions](#functions)
  - [clear-unit](#clear-unit)
  - [color](#color)
  - [em](#em)
  - [em-always](#em-always)
  - [font-weight](#font-weight)
  - [get](#get)
  - [hue-name](#hue-name)
  - [insert-nth](#insert-nth)
  - [interpolate](#interpolate)
  - [map-deep-get](#map-deep-get)
  - [map-filter](#map-filter)
  - [map-sort](#map-sort)
  - [media](#media)
  - [monochrome](#monochrome)
  - [palette](#palette)
  - [rem](#rem)
  - [rem-always](#rem-always)
  - [spectrum](#spectrum)
  - [str-replace](#str-replace)
  - [to-class](#to-class)
  - [to-id](#to-id)
  - [to-unicode](#to-unicode)
- [Mixins](#mixins)
  - [css-custom-properties](#css-custom-properties)
  - [export](#export)
  - [extend](#extend)
  - [has-class](#has-class)
  - [import](#import)
  - [media-between](#media-between)
  - [media-only](#media-only)
  - [media-up-from](#media-up-from)
  - [media-up-to](#media-up-to)
  - [props](#props)
  - [size](#size)
  - [transition](#transition)

## Constants

### const-color-keys

- Type: `map`

```scss
$const-color-keys: (
  'gray': dimgray,
  'accent': blue,
  'success': green,
  'warn': yellow,
  'err': red,
) !default;
```

List of keyword and its color values. This is where you want to define your
colors. The keyword for a color can be pretty much anything, including a valid
color value (for example `gray`), the [color](#color) function takes care of
everything and will always check for color keys before using the actual color.

[_Back to top_](#contents)

### const-color-scale

- Type: `map`

```scss
$const-color-scale: (
  'dark': -50,
  'regular': 0,
  'light': 50,
) !default;
```

List of scale keys for the [color](#color) function used as second argument. The
nummber (positive or negative value) represents percentage of lightness relative
to the original source color. Internally uses native
[color-scale](http://sass-lang.com/documentation/Sass/Script/Functions.html#scale_color-instance_method)
method.

[_Back to top_](#contents)

### const-custom-properties

- Type: `boolean`

```scss
$const-custom-properties: false !default;
```

Enables css custom properties, resulting in values to be rendered with
[var](https://developer.mozilla.org/en-US/docs/Web/CSS/var) syntax instead of
direct value. Use [css-custom-properties](#css-custom-properties) mixin to
generate `:root` selector.

[_Back to top_](#contents)

### const-custom-properties-fallback

- Type: `boolean`

```scss
$const-custom-properties-fallback: false !default;
```

Determines whenever to use
[custom property fallback values](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables#Custom_Property_fallback_values).
Requires [custom-properties](#const-custom-properties) set to `true`.

[_Back to top_](#contents)

### const-custom-properties-redirect-var

- Type: `boolean`

```scss
$const-custom-properties-redirect-var: false !default;
```

When set to `true`, module properties referencing to their values will be
redirected instead, effectivelly reducing total number of variables. This will
also clean up result of [css-custom-properties](#css-custom-properties) mixin.
Requires [custom-properties](#const-custom-properties) set to `true`.

[_Back to top_](#contents)

### const-export-defaults

- Type: `map`

```scss
$const-export-defaults: (
  'unique': false,
) !default;
```

Properties in this map are automatically added to every module. Properties added
via [export](#export) or [extend](#extend) mixins take priority over defaults.

[_Back to top_](#contents)

### const-export-groups

- Type: `map`

```scss
$const-export-groups: () !default;
```

List of group names for export modules, where key represents group name
([template](#const-template) replacement of `{group}` placeholder), and value
represents much shorter identifier ([template](#const-template) replacement of
`{id}` placeholder).

[_Back to top_](#contents)

### const-font-weight-scale

- Type: `map`

```scss
$const-font-weight-scale: (
  'thin': 100,
  'extralight': 200,
  'ultralight': 200,
  'light': 300,
  'book': 400,
  'normal': 400,
  'regular': 400,
  'roman': 400,
  'medium': 500,
  'semibold': 600,
  'demibold': 600,
  'bold': 700,
  'extrabold': 800,
  'ultrabold': 800,
  'black': 900,
  'heavy': 900,
) !default;
```

List of available keys for the [font-weight](#font-weight) function. Note, this
function duplicates the
[postcss-font-weight](https://github.com/jonathantneal/postcss-font-weights)
plugin. If you're using this plugin, there's no need to use this function as
well, use the keyword values directly instead.

[_Back to top_](#contents)

### const-media-direction

- Type: `down` or `up` or `false`

```scss
$const-media-direction: up !default;
```

Determines in what direction the generated media queries take priority. This
constants affects all media mixins (can be set individually via parameter) and
is dependent on [media-scale](#const-media-scale) map. When set to `down`,
higher media scale takes priority over lower ones, meaning `max` value of lower
scale is always one pixel lower than defined. The `up` option is exact opposite
of `down` behavior. This functionalitz can be completely disabled by setting
this constant to `false`. This also means the media queries may overlap (depends
on use) and mess up things on very specific resolutions.

[_Back to top_](#contents)

### const-media-scale

- Type: `map`

```scss
$const-media-scale: (
  'phone': (
    'width': 480px,
    'height': 853px,
  ),
  'desktop': (
    'width': 1920px,
    'height': 1080px,
  ),
) !default;
```

List of media breakpoints. The values can be defined either directly as values
or as map of width and height properties. However, if defined as direct values,
some of the media functionality will not be available.

[_Back to top_](#contents)

### const-media-sort

- Type: `width` or `height`

```scss
$const-media-sort: width !default;
```

Keys in [media-scale](#const-media-scale) constant are automatically sorted by
its values. However, if [media-scale](#const-media-scale) is set with `width`
and `height` keys, this constant is needed to determine by which key the values
should be sorted.

[_Back to top_](#contents)

### const-monochrome-steps

- Type: `number`

```scss
$const-monochrome-steps: 10 !default;
```

Set number of [monochrome](#monochrome) color steps.

[_Back to top_](#contents)

### const-preserve-defaults

- Type: `boolean`

```scss
$const-preserve-defaults: true !default;
```

This constants affects only few map constants. When set to `true`, your custom
map configuration will be merged with defaults (your values take priority over
defaults). If you wish to completely replace default map values with your own,
set this constant to `false`.

[_Back to top_](#contents)

### const-relative-units

- Type: `boolean`

```scss
$const-relative-units: false !default;
```

When enabled, functions [em](#em), [rem](#rem) and other (all relevant function
have mentioned whenever relative units settings affects them) will recalculate
non-relative units to relative values (if possible). Resulting value is
calculated relative to [relative-units-root](#const-relative-units-root)
constant.

[_Back to top_](#contents)

### const-relative-units-min

- Type: `number`

```scss
$const-relative-units-min: 0 !default;
```

Any value (in pixels) equal or below this constant will not be converted to
relative units. This applies to the [em-always](#em-always) and
[rem-always](#rem-always) functions as well. Requires
[relative-units](#const-relative-units) set to `true`.

[_Back to top_](#contents)

### const-relative-units-root

- Type: `number`

```scss
$const-relative-units-root: 16px !default;
```

Base value (in pixels) for calculation of relative units.

[_Back to top_](#contents)

### const-template

- Type: `string`

```scss
$const-template: '{module}' !default;
```

This template represents how the selector of imported module is created. This is
to allow customization of selectors generated by [import](#import) mixin. The
string value can contain placeholders for `{group}` (represents **key** from
[export-groups](#const-export-groups) map item), `{id}` (represents **value**
from [export-groups](#const-export-groups) map item) and `{module}` (represents
module name).

[_Back to top_](#contents)

### const-template-group

- Type: `string`

```scss
$const-template-group: '{id}-{module}' !default;
```

This template is active instead of [template](#const-template) constant, when
[export-groups](#const-export-groups) are used. Placeholders are also identical.

[_Back to top_](#contents)

## Functions

### clear-unit

- Type: `Function`

```scss
clear-unit($number)
```

Returns a **number** stripped of its unit, if possible.

| Name   | Type     | Description  | Default |
| ------ | -------- | ------------ | ------- |
| number | `number` | Input number | &ndash; |

[_Back to top_](#contents)

### color

- Type: `Function`

```scss
color($color, $scale: false)
```

Returns scale **color** according to a **scale** key (adjusted lightness).
Allows easy color scaling without the need of additional variables for each new
color variant. The source color can be passed as either direct color value or
key identifier present in [color-keys](#const-color-keys) constant. Scaling
levels are completely customizable through [color-scale](#const-color-scale)
constant.

| Name  | Type                | Description               | Default |
| ----- | ------------------- | ------------------------- | ------- |
| color | `color` or `string` | Input color, or color-key | &ndash; |
| scale | `bool` or `string`  | Scale key                 | false   |

[_Back to top_](#contents)

### em

- Type: `Function`

```scss
em($number, $unit: em, $ignore-const-relative-units: false)
```

Returns a **number** recalculated to _em_ units, if possible. Allows scaling
based on [relative-units-root](#const-relative-units-root) constant. To ensure
visibility of all elements, resulting numbers equal or below
[relative-units-min](#const-relative-units-min) are not converted. Requires
[relative-units](#const-relative-units) set to `true`. Use
[em-always](#em-always) if you wish to convert to relative units regardless of
global settings.

| Name                        | Type                  | Description     | Default |
| --------------------------- | --------------------- | --------------- | ------- |
| number                      | `number`              | Input number    | &ndash; |
| unit                        | `boolean` or `string` | Returned unit   | em      |
| ignore-const-relative-units | `boolean`             | Ignore settings | false   |

[_Back to top_](#contents)

### em-always

- Type: `Function`

```scss
em-always($number)
```

This function is identical to [em](#em) function, except it will always convert
to relative units, even if [relative-units](#const-relative-units) constant is
disabled.

| Name   | Type     | Description  | Default |
| ------ | -------- | ------------ | ------- |
| number | `number` | Input number | &ndash; |

[_Back to top_](#contents)

### font-weight

- Type: `Function`

```scss
font-weight($value)
```

Returns a numeric representation of _font-weight_ based on **value**. Allows the
use of readable values without the knowledge of real numbers used by css.
Complete map of keys and values is set through
[font-weight-scale](#const-font-weight-scale) constant.

| Name  | Type                 | Description         | Default |
| ----- | -------------------- | ------------------- | ------- |
| value | `number` or `string` | Number or scale key | &ndash; |

[_Back to top_](#contents)

### get

- Type: `Function`

```scss
get($prop, $name: false, $group: $export-group, $css-custom-properties: false, $data: $system-import)
```

Returns a property value from imported module item. When used inside
[import](#import) mixin, parameters **name** and **group** are automatically
inferred.

| Name                  | Type               | Description       | Default         |
| --------------------- | ------------------ | ----------------- | --------------- |
| prop                  | `string`           | Property name     | &ndash;         |
| name                  | `bool` or `string` | Module name       | false           |
| group                 | `bool` or `string` | Group key         | \$export-group  |
| css-custom-properties | `bool`             | Enable var syntax | false           |
| data                  | `map`              | Source map        | \$system-import |

[_Back to top_](#contents)

### hue-name

- Type: `Function`

```scss
hue-name($value)
```

Returns color name of provided input color.

| Name  | Type                | Description               | Default |
| ----- | ------------------- | ------------------------- | ------- |
| value | `color` or `string` | Input color, or color-key | &ndash; |

[_Back to top_](#contents)

### insert-nth

- Type: `Function`

```scss
insert-nth($list, $index, $value)
```

Insert value at list or map index.

| Name  | Type                          | Description        | Default |
| ----- | ----------------------------- | ------------------ | ------- |
| list  | `list` or `map`               | Source list or map | &ndash; |
| index | `number`                      | Target index       | &ndash; |
| value | `number` or `string` or `map` | Value              | &ndash; |

[_Back to top_](#contents)

### interpolate

- Type: `Function`

```scss
interpolate($template, $data)
```

Returns string composed from provided input template, where placeholders `{n}`
are replaced with data from provided map.

| Name     | Type     | Description                         | Default |
| -------- | -------- | ----------------------------------- | ------- |
| template | `string` | Template string                     | &ndash; |
| data     | `map`    | Map of replacement keys with values | &ndash; |

[_Back to top_](#contents)

### map-deep-get

- Type: `Function`

```scss
map-deep-get($map, $keys)
```

Extended version of native
[map-get](http://sass-lang.com/documentation/Sass/Script/Functions.html#map_get-instance_method)
function, with nested maps support.

| Name | Type               | Description           | Default |
| ---- | ------------------ | --------------------- | ------- |
| map  | `map`              | Source map            | &ndash; |
| keys | `string` or `list` | Path to requested key | &ndash; |

[_Back to top_](#contents)

### map-filter

- Type: `Function`

```scss
map-filter($map, $keys)
```

Returns a new map with filtered **keys** only. Throws an error if any value from
**keys** is not present in **map** keys.

| Name | Type               | Description           | Default |
| ---- | ------------------ | --------------------- | ------- |
| map  | `map`              | Source map            | &ndash; |
| keys | `string` or `list` | List of filtered keys | &ndash; |

[_Back to top_](#contents)

### map-sort

- Type: `Function`

```scss
map-sort($map, $keys)
```

Sort map (ascending) according to its value. If the value is a map, sort keys
must be specified.

| Name | Type               | Description                     | Default |
| ---- | ------------------ | ------------------------------- | ------- |
| map  | `map`              | Source map                      | &ndash; |
| keys | `string` or `list` | Sort by nested key, if possible | &ndash; |

[_Back to top_](#contents)

### media

- Type: `Function`

```scss
media($value, $prop: width)
```

Returns pixel value of [media-scale](#const-media-scale) according to **value**
property. Use of [media-between](#media-between), [media-only](#media-only),
[media-up-from](#media-up-from) and [media-up-to](#media-up-to) mixins is highly
recommended instead of using custom new media rules through this function. Media
breakpoints are completely customizable through
[media-scale](#const-media-scale) constant.

| Name  | Type                 | Description                          | Default |
| ----- | -------------------- | ------------------------------------ | ------- |
| value | `number` or `string` | Number, or media-scale               | &ndash; |
| prop  | `string`             | Returned value (width, height, both) | width   |

[_Back to top_](#contents)

### monochrome

- Type: `Function`

```scss
monochrome($value, $index, $desaturate: false, $steps: $const-monochrome-steps)
```

Returns monochrome color, where index with number 0 is the lightest.

| Name       | Type                  | Description                   | Default                  |
| ---------- | --------------------- | ----------------------------- | ------------------------ |
| value      | `color` or `string`   | Color, or color-key           | &ndash;                  |
| index      | `number`              | Index in the monochrome scale | &ndash;                  |
| desaturate | `boolean` or `string` | Desaturate (boolean, black)   | false                    |
| steps      | `number`              | Number of steps               | \$const-monochrome-steps |

[_Back to top_](#contents)

### palette

- Type: `Function`

```scss
palette($value, $name: false, $index: false, $steps: $const-monochrome-steps)
```

Computes color palette based on a single color. The **name** parameter accepts
`red`, `orange`, `yellow`, `lime`, `green`, `teal`, `cyan`, `blue`, `indigo`,
`violet`, `fuchsia` or `pink` value. The returned value varies based on provided
parameters. If neither **name** or **index** is provided, the function returns
map of entire color palette. If **name** is provided, but no **index**, the
function returns list of monochrome colors for that specific hue **name**. If
**name** and **index** is provided, only that specific color is returned.

| Name  | Type                  | Description                   | Default                  |
| ----- | --------------------- | ----------------------------- | ------------------------ |
| value | `color` or `string`   | Color, or color-key           | &ndash;                  |
| name  | `boolean` or `string` | Hue name                      | false                    |
| index | `boolean` or `number` | Index in the monochrome scale | false                    |
| steps | `number`              | Number of steps               | \$const-monochrome-steps |

[_Back to top_](#contents)

### rem

- Type: `Function`

```scss
rem($number)
```

Returns a **number** recalculated to _rem_ units, if possible. Allows scaling
based on [relative-units-root](#const-relative-units-root) constant. To ensure
visibility of all elements, resulting numbers equal or below
[relative-units-min](#const-relative-units-min) are not converted. Requires
[relative-units](#const-relative-units) set to `true`. Use
[rem-always](#rem-always) if you wish to convert to relative units regardless of
global settings.

| Name   | Type     | Description  | Default |
| ------ | -------- | ------------ | ------- |
| number | `number` | Input number | &ndash; |

[_Back to top_](#contents)

### rem-always

- Type: `Function`

```scss
rem-always($number)
```

This function is identical to [rem](#rem) function, except it will always
convert to relative units, event if [relative-units](#const-relative-units) is
disabled.

| Name   | Type     | Description  | Default |
| ------ | -------- | ------------ | ------- |
| number | `number` | Input number | &ndash; |

[_Back to top_](#contents)

### spectrum

- Type: `Function`

```scss
spectrum($value, $chars: alpha, $saturation: 100, $lightness: 50)
```

Returns color **value** according to its position in **chars** list, where the
**chars** list represents the entire color spectrum. The **chars** property
accepts custom list of characters, `alpha` (alphabet a-z) or `num` (numbers 0-9)
presets. If the searched **value** is a list of values, the resulting colors
will be mixed together to produce a single color.

| Name       | Type                           | Description                      | Default |
| ---------- | ------------------------------ | -------------------------------- | ------- |
| value      | `number` or `string` or `list` | Searched value in character list | &ndash; |
| chars      | `string` or `list`             | Source characters (alpha, num)   | alpha   |
| saturation | `number`                       | Saturation (0-100)               | 100     |
| lightness  | `number`                       | Lightness (0-100)                | 50      |

[_Back to top_](#contents)

### str-replace

- Type: `Function`

```scss
str-replace($str, $search, $replace: '')
```

Replaces all occurences of **search** substring with **replace** value.

| Name    | Type     | Description          | Default |
| ------- | -------- | -------------------- | ------- |
| str     | `string` | Initial string       | &ndash; |
| search  | `string` | Substring to replace | &ndash; |
| replace | `string` | New value            | ''      |

[_Back to top_](#contents)

### to-class

- Type: `Function`

```scss
to-class($class)
```

Returns a **class** string converted to class selector, if possible. Doesn't
affect the input value if a class selector is already present.

| Name  | Type     | Description | Default |
| ----- | -------- | ----------- | ------- |
| class | `string` | Class name  | &ndash; |

[_Back to top_](#contents)

### to-id

- Type: `Function`

```scss
to-id($id)
```

Returns a **id** string converted to id selector, if possible. Doesn't affect
the input value if a id selector is already present.

| Name | Type     | Description | Default |
| ---- | -------- | ----------- | ------- |
| id   | `string` | Id name     | &ndash; |

[_Back to top_](#contents)

### to-unicode

- Type: `Function`

```scss
to-unicode($value)
```

Converts **value** to a unicode string used by css content property. This
function is available because of a known bug, more information in this github
[issue](https://github.com/sass/sass/issues/1395). Only valid unicode values are
automatically detected and converted, everything else is returned in its
original input value. Several known characters are automatically converted to
its unicode equivalents.

| Name  | Type     | Description | Default |
| ----- | -------- | ----------- | ------- |
| value | `string` | Value       | &ndash; |

[_Back to top_](#contents)

## Mixins

### css-custom-properties

- Type: `Mixin`
- Content: `true` (through `@content` directive)

```scss
css-custom-properties()
```

Outputs `:root` element with all properties from detected modules.

[_Back to top_](#contents)

### export

- Type: `Mixin`

```scss
export($name, $props: false, $group: $export-group, $defaults: $const-export-defaults)
```

Create a new module item, that can be imported using the [import](#import)
mixin. Includes few automatically computed properties (name, selector). Throws
an error if item with identical **name** in a **group** already exists, use
[extend](#extend) mixin if you need to modify already existing module item.

| Name     | Type            | Description        | Default                 |
| -------- | --------------- | ------------------ | ----------------------- |
| name     | `string`        | Module name        | &ndash;                 |
| props    | `bool` or `map` | Property map       | false                   |
| group    | `string`        | Group key          | \$export-group          |
| defaults | `map`           | Default properties | \$const-export-defaults |

[_Back to top_](#contents)

### extend

- Type: `Mixin`

```scss
extend($name, $props: false, $group: $export-group)
```

Extends already existing module item created via [export](#export) mixin.
Properties in the extends mixin take priority over already existing ones. Throws
an error if **name** in **group** doesn't exists.

| Name  | Type            | Description  | Default        |
| ----- | --------------- | ------------ | -------------- |
| name  | `string`        | Module name  | &ndash;        |
| props | `bool` or `map` | Property map | false          |
| group | `string`        | Group key    | \$export-group |

[_Back to top_](#contents)

### has-class

- Type: `Mixin`
- Content: `true` (through `@content` directive)

```scss
has-class($list)
```

Adds a **list** of classes to a root element. Individual values are converted to
a class if possible. New classes are placed at the beginning of the selector,
therefore the root element must be either class or id selector.

| Name | Type               | Description         | Default |
| ---- | ------------------ | ------------------- | ------- |
| list | `string` or `list` | List of class names | &ndash; |

[_Back to top_](#contents)

### import

- Type: `Mixin`
- Content: `true` (through `@content` directive)

```scss
import($name, $group: $export-group)
```

Extracts an module item, previously defined via [export](#export) mixin, and
allows the use of [get](#get) function without the need of specified group. This
mixin internally uses [props](#props) mixin, with the addition of automatically
generated selector. The selector is class by default, set `unique` property to
`true` to enable id selector.

| Name  | Type     | Description | Default        |
| ----- | -------- | ----------- | -------------- |
| name  | `string` | Module name | &ndash;        |
| group | `string` | Group key   | \$export-group |

[_Back to top_](#contents)

### media-between

- Type: `Mixin`
- Content: `true` (through `@content` directive)

```scss
media-between($lower, $upper, $prop: width, $operator: and, $direction: $const-media-direction)
```

Wraps the content with a specified media query between **lower** and **upper**
values. Use of [media-up-from](#media-up-from) mixin is highly preferred before
any other media mixin (not a requirement). The **operator** parameter determines
relationship between width and height properties, only relevant when **prop** is
set to `both`. Media breakpoints are completely customizable through
[media-scale](#const-media-scale) constant.

| Name      | Type                 | Description                          | Default                 |
| --------- | -------------------- | ------------------------------------ | ----------------------- |
| lower     | `number` or `string` | Number, or media-scale               | &ndash;                 |
| upper     | `number` or `string` | Number, or media-scale               | &ndash;                 |
| prop      | `string`             | Returned value (width, height, both) | width                   |
| operator  | `string`             | Operator (and, or)                   | and                     |
| direction | `string`             | Direction (down, up)                 | \$const-media-direction |

[_Back to top_](#contents)

### media-only

- Type: `Mixin`
- Content: `true` (through `@content` directive)

```scss
media-only($scale, $prop: width, $operator: and, $direction: $const-media-direction)
```

Wraps the content with a specified media query between **scale** and previous
scale in map. Use of [media-up-from](#media-up-from) mixin is highly preferred
before any other media mixin (not a requirement). The **operator** parameter
determines relationship between width and height properties, only relevant when
**prop** is set to `both`. Media breakpoints are completely customizable through
[media-scale](#const-media-scale) constant.

| Name      | Type     | Description                          | Default                 |
| --------- | -------- | ------------------------------------ | ----------------------- |
| scale     | `string` | Key of media-scale                   | &ndash;                 |
| prop      | `string` | Returned value (width, height, both) | width                   |
| operator  | `string` | Operator (and, or)                   | and                     |
| direction | `string` | Direction (down, up)                 | \$const-media-direction |

[_Back to top_](#contents)

### media-up-from

- Type: `Mixin`
- Content: `true` (through `@content` directive)

```scss
media-up-from($scale, $prop: width, $operator: and, $direction: $const-media-direction)
```

Wraps the content with a specified media query from **scale** in upward
direction. Use of this mixin is highly preferred before any other media mixin
(not a requirement). The **operator** parameter determines relationship between
width and height properties, only relevant when **prop** is set to `both`. Media
breakpoints are completely customizable through
[media-scale](#const-media-scale) constant.

| Name      | Type                 | Description                          | Default                 |
| --------- | -------------------- | ------------------------------------ | ----------------------- |
| scale     | `number` or `string` | Number, or media-scale               | &ndash;                 |
| prop      | `string`             | Returned value (width, height, both) | width                   |
| operator  | `string`             | Operator (and, or)                   | and                     |
| direction | `string`             | Direction (down, up)                 | \$const-media-direction |

[_Back to top_](#contents)

### media-up-to

- Type: `Mixin`
- Content: `true` (through `@content` directive)

```scss
media-up-to($scale, $prop: width, $operator: and, $direction: $const-media-direction)
```

Wraps the content with a specified media query from **scale** in downward
direction. Use of [media-up-from](#media-up-from) mixin is highly preferred
before any other media mixin (not a requirement). The **operator** parameter
determines relationship between width and height properties, only relevant when
**prop** is set to `both`. Media breakpoints are completely customizable through
[media-scale](#const-media-scale) constant.

| Name      | Type                 | Description                          | Default                 |
| --------- | -------------------- | ------------------------------------ | ----------------------- |
| scale     | `number` or `string` | Number, or media-scale               | &ndash;                 |
| prop      | `string`             | Returned value (width, height, both) | width                   |
| operator  | `string`             | Operator (and, or)                   | and                     |
| direction | `string`             | Direction (down, up)                 | \$const-media-direction |

[_Back to top_](#contents)

### props

- Type: `Mixin`
- Content: `true` (through `@content` directive)

```scss
props($name, $group: $export-group)
```

Extracts an module item, previously defined via [export](#export) mixin, and
allows the use of [get](#get) function without the need of specified group. This
mixin is internally used by [import](#import) mixin, however unlike
[import](#import) mixin, this mixin doesn't automatically adds generated
selector.

| Name  | Type     | Description | Default        |
| ----- | -------- | ----------- | -------------- |
| name  | `string` | Module name | &ndash;        |
| group | `string` | Group key   | \$export-group |

[_Back to top_](#contents)

### size

- Type: `Mixin`

```scss
size($size, $method: rem)
```

Allows to use shorthand properties to represent width and height. Unitless
values are handled as aspect ratio. Skip token **false** can be used to skip
width or height property. This mixin already includes unit convertsion, use
non-relative units for input value, can be disabled by setting **method**
parameter to `false`. This mixin is alternative to
[postcss-short-size](https://github.com/jonathantneal/postcss-short-size)
plugin, that works in very similar way.

| Name   | Type               | Description                    | Default |
| ------ | ------------------ | ------------------------------ | ------- |
| size   | `number` or `list` | Size, or space separated list  | &ndash; |
| method | `bool` or `string` | Parser method (false, em, rem) | rem     |

[_Back to top_](#contents)

### transition

- Type: `Mixin`

```scss
transition($options, $properties)
```

Shortcut mixin for transition property. Allows to apply multiple transition
properties with identical options.

| Name       | Type               | Description        | Default |
| ---------- | ------------------ | ------------------ | ------- |
| options    | `string`           | Transition options | &ndash; |
| properties | `string` or `list` | List of properties | &ndash; |

[_Back to top_](#contents)

---

**Last Updated:** Thu Jan 31 2019 14:54:33 GMT+0100 (Central European Standard
Time)
