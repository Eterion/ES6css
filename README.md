[![Npm](https://img.shields.io/npm/v/esm-scss.svg?style=flat-square)](https://www.npmjs.com/package/esm-scss)
[![Build Status](https://img.shields.io/travis/Eterion/esm-scss/master.svg?style=flat-square)](https://travis-ci.org/Eterion/esm-scss)

# ESM Scss

A collection of tools inspired by ES6 export and import mechanics, using
[sass](http://sass-lang.com/) pre-processor (scss syntax). Consists of constants
(variable), functions and mixins, which means it doesnt generate any css by it
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

Any property in this map is automatically added to every export item. Properties added via [**export**](#mixin-export) or [**extend**](#mixin-extend) mixins take precedence over defaults.

```scss
$const-export-defaults: (
  'unique': false,
) !default;
```

[Back to top](#table-of-contents)

## Functions

### get

Returns a property value from export item. Can be used inside a [**import**](#mixin-import) mixin without **$name** and **$group** parameters.

```scss
get($prop, $name: false, $group: $export-group, $css-custom-properties: false, $data: $system-import)
```

Name|Type|Description|Default
-|-|-|-
prop|`string`|Property name|&ndash;
name|`bool | string`|Module name|false
group|`bool | string`|Group key|$export-group
css-custom-properties|`bool`|Enable var syntax|false
data|`map`|Source map|$system-import

```scss
element { height: rem(get(height) / 2); }
```

[Back to top](#table-of-contents)

### media

Returns pixel value of media scale according to **$value** property. Use of [**media-between**](#mixin-media-between), [**media-only**](#mixin-media-only), [**media-up-from**](#mixin-media-up-from) and [**media-up-to**](#mixin-media-up-to) mixins is highly recommended instead of creating new media rules through this function. Media breakpoints are completely customizable through **$const-media-scale** constant. Note that **both** option on **$prop** is relevant only when media breakpoint is defined as map of width and height properties.

```scss
media($value, $prop: width)
```

Name|Type|Description|Default
-|-|-|-
value|`number | string`|Scale or number|&ndash;
prop|`string`|Determines what value is returned, can be **width**, **height** or **both**|width

```scss
media(desktop) // returns 1680px
```

[Back to top](#table-of-contents)

### clear-unit

Returns a **$number** stripped of its unit, if possible.

```scss
clear-unit($number)
```

Name|Type|Description|Default
-|-|-|-
number|`number`|Input number|&ndash;

```scss
clear-unit(16px) // returns 16
```

[Back to top](#table-of-contents)

### color-spectrum

Returns color **$value** according to its position in provided **$list**, where the **$list** represents the entire color spectrum.

```scss
color-spectrum($list, $value, $saturation: 100%, $lightness: 50%)
```

Name|Type|Description|Default
-|-|-|-
list|`list`|List of values that represent color spectrum|&ndash;
value|`number | string`|Searched value|&ndash;
saturation|`number`|Saturation (percent)|100%
lightness|`number`|Lightness (percent)|50%

```scss
color-spectrum((0, 1, 2, 3, 4, 5, 6, 7, 8, 9), 2) // returns #aaff00
```

[Back to top](#table-of-contents)

### color

Returns scaled **$color** according to a **$scale** key. Allows easy color scaling without the need of additional variables for each new color variant. The source color can be passed as either direct color value or key identifier present in **$const-color-keys** constant. Scaling levels are completely customizable through **$const-color-scale** constant.

```scss
color($color, $scale: false)
```

Name|Type|Description|Default
-|-|-|-
color|`color | string`|Input color or key|&ndash;
scale|`bool | string`|Scale key|false

```scss
color(gray, dark) // returns #4f4f4f
```

[Back to top](#table-of-contents)

### em-always

This function is identical to [**em**](#function-em) function, except it will always convert to relative units, even if **$const-relative-units** are disabled.

```scss
em-always($number)
```

Name|Type|Description|Default
-|-|-|-
number|`number`|Input number|&ndash;

```scss
em-always(16px) // returns 1em
```

[Back to top](#table-of-contents)

### em

Returns a **$number** recalculated to em units, if possible. Allows scaling based on **$const-relative-units-root** constant. To ensure visibility of all elements, resulting numbers equal or below **$const-relative-units-min** are not recalculated. Requires **$const-relative-units** set to true. Use [**em-always**](#function-em-always) if you wish to convert to relative units, regardless of global settings.

```scss
em($number, $unit: em, $ignore-const-relative-units: false)
```

Name|Type|Description|Default
-|-|-|-
number|`number`|Input number|&ndash;
unit|`boolean | string`|Returned unit|em
ignore-const-relative-units|`boolean`|Internal option, use [**em-always**](#function-em-always) or [**rem-always**](#function-rem-always) instead|false

```scss
em(16px) // returns 1em
```

[Back to top](#table-of-contents)

### font-weight

Returns a numeric representation of font-weight based on **$value**. Allows the use of readable values without the knowledge of real numbers used by css. Complete map of keys and values is set through **$const-font-weight-scale** constant. This function is alternative to [**postcss-font-weights**](https://github.com/jonathantneal/postcss-font-weights) plugin.

```scss
font-weight($value)
```

Name|Type|Description|Default
-|-|-|-
value|`number | string`|Number or scale key|&ndash;

```scss
font-weight(regular) // returns 400
```

[Back to top](#table-of-contents)

### hue-name

Returns color name of provided input color.

```scss
hue-name($value)
```

Name|Type|Description|Default
-|-|-|-
value|`string`|Input color, or color-scale key.|&ndash;

```scss
hue-name(#07c) // returns 'blue'
```

[Back to top](#table-of-contents)

### insert-nth

Insert value at list or map index.

```scss
insert-nth($list, $index, $value)
```

Name|Type|Description|Default
-|-|-|-
list|`list | map`|Source list or map.|&ndash;
index|`number`|Target index.|&ndash;
value|`number | string|map`|Value.|&ndash;

[Back to top](#table-of-contents)

### interpolate

Returns input template where placeholders '{n}' are replaced with data from map.

```scss
interpolate($template, $data)
```

Name|Type|Description|Default
-|-|-|-
template|`string`|Template string|&ndash;
data|`map`|Map of replacement keys with values|&ndash;

[Back to top](#table-of-contents)

### map-deep-get

Extended version of the native [**map-get**](http://sass-lang.com/documentation/Sass/Script/Functions.html#map_get-instance_method) function, with nested maps support.

```scss
map-deep-get($map, $keys)
```

Name|Type|Description|Default
-|-|-|-
map|`map`|Source map|&ndash;
keys|`string | list`|Path to requested key|&ndash;

[Back to top](#table-of-contents)

### map-filter

Returns a new map with filtered **$keys** only. Throws an error if any value from **$keys** in **$map** doesn't exists.

```scss
map-filter($map, $keys)
```

Name|Type|Description|Default
-|-|-|-
map|`map`|Source map|&ndash;
keys|`string | list`|List of filtered keys|&ndash;

[Back to top](#table-of-contents)

### map-sort

Sort map (ascending) according to its value. If the value is a map, requested sorting keys must be specified.

```scss
map-sort($map, $keys)
```

Name|Type|Description|Default
-|-|-|-
map|`map`|Source map.|&ndash;
keys|`string | list`|List of keys (only when map item value is a map).|&ndash;

[Back to top](#table-of-contents)

### rem-always

This function is identical to [**rem**](#function-rem) function, except it will always convert to relative units, even if **$const-relative-units** are disabled.

```scss
rem-always($number)
```

Name|Type|Description|Default
-|-|-|-
number|`number`|Input number|&ndash;

```scss
rem-always(16px) // returns 1rem
```

[Back to top](#table-of-contents)

### rem

Returns a **$number** recalculated to rem units, if possible. Allows scaling based on **$const-relative-units-root** constant. To ensure visibility of all elements, resulting numbers equal or below **$const-relative-units-min** are not recalculated. Requires **$const-relative-units** set to true. Use [**rem-always**](#function-rem-always) if you wish to convert to relative units, regardless of global settings.

```scss
rem($number)
```

Name|Type|Description|Default
-|-|-|-
number|`number`|Input number|&ndash;

```scss
rem(16px) // returns 1rem
```

[Back to top](#table-of-contents)

### str-replace

Replaces all occurences of **$search** substring with **$replace** in **$string**.

```scss
str-replace($string, $search, $replace: '')
```

Name|Type|Description|Default
-|-|-|-
string|`string`|Initial string|&ndash;
search|`string`|Substring to replace|&ndash;
replace|`string`|New value|''

[Back to top](#table-of-contents)

### to-class

Returns a **$class** string converted to class selector if possible. Doesn't affect the input value if a class selector is already present.

```scss
to-class($class)
```

Name|Type|Description|Default
-|-|-|-
class|`string`|Class name|&ndash;

```scss
to-class(element) // returns .element
```

[Back to top](#table-of-contents)

### to-id

Returns a **$id** string converted to id selector if possible. Doesn't affect the input value if a id selector is already present.

```scss
to-id($id)
```

Name|Type|Description|Default
-|-|-|-
id|`string`|Id name|&ndash;

```scss
to-id(element) // returns #element
```

[Back to top](#table-of-contents)

### to-unicode

Converts **$value** to a unicode string used by css content property. This function is available because of a known bug, more information in this github [**issue**](https://github.com/sass/sass/issues/1395). Only valid unicode values are automatically detected and converted, everything else is returned in its original input value.

```scss
to-unicode($value)
```

Name|Type|Description|Default
-|-|-|-
value|`string`|Value|&ndash;

```scss
to-unicode('e655') // returns '\e655'
```

[Back to top](#table-of-contents)

## Mixins

### export

Creates a new export item, that can be extracted using the [**import**](#mixin-import) mixin. Includes few automatically computed properties (name, selector). Throws an error if item with identical **$name** in a **$group** already exists, use [**extend**](#mixin-extend) mixin if you need to modify already existing item.

```scss
export($name, $props: false, $group: $export-group, $defaults: $const-export-defaults)
```

Name|Type|Description|Default
-|-|-|-
name|`string`|Module name|&ndash;
props|`bool | map`|Property map|false
group|`string`|Group key|$export-group
defaults|`map`|Default properties|$const-export-defaults

```scss
@include export(component-name, ( ... ))
```

[Back to top](#table-of-contents)

### extend

Extends already existing item created via [**export**](#mixin-export) mixin. Properties in the extend mixin takes precedence over already existing ones. Throws an error if **$name** in a **$group** doesn't exists.

```scss
extend($name, $props: false, $group: $export-group)
```

Name|Type|Description|Default
-|-|-|-
name|`string`|Module name|&ndash;
props|`bool | map`|Property map|false
group|`string`|Group key|$export-group

```scss
@include extend(component-name, ( ... ))
```

[Back to top](#table-of-contents)

### import

Extracts an item, previously defined via [**export**](#mixin-export) mixin, and allows the use of [**get**](#function-get) function without the need of specified group. This mixin internally uses [**props**](#mixin-props) mixin, with the addition of automatically generated selector. The selector is class by default, set **unique** property to true to enable id selector.

```scss
import($name, $group: $export-group)
```

Name|Type|Description|Default
-|-|-|-
name|`string`|Module name|&ndash;
group|`string`|Group key|$export-group

```scss
@include import(component-name) { ... }
```

[Back to top](#table-of-contents)

### props

Extracts an item, previously defined via [**export**](#mixin-export) mixin, and allows the use of [**get**](#function-get) function without the need of specified group. This mixin is internally used by [**import**](#mixin-import) mixin. Unlike the [**import**](#mixin-import), this mixin doen't automatically adds generated selector.

```scss
props($name, $group: $export-group)
```

Name|Type|Description|Default
-|-|-|-
name|`string`|Module name|&ndash;
group|`string`|Group key|$export-group

```scss
@include props(component-name) { ... }
```

[Back to top](#table-of-contents)

### media-between

Wraps the content with a specified media query between **$lower** and **$upper** values. Use of [**media-up-from**](#mixin-media-up-from) mixin is highly preferred before any other media mixin (not a requirement). The **$operator** parameter determines relationship between width and height properties, only relevant when **$prop** is set to **both**. Media breakpoints are completely customizable through **$const-media-scale** constant.

```scss
media-between($lower, $upper, $prop: width, $operator: and, $direction: $const-media-direction)
```

Name|Type|Description|Default
-|-|-|-
lower|`number | string`|Scale or number|&ndash;
upper|`number | string`|Scale or number|&ndash;
prop|`string`|Determines what value is returned, can be **width**, **height** or **both**|width
operator|`string`|Determines relationship between width and height, can be **and** or **or**|and
direction|`string`|Determines the direction for media query, can be **up** or **down**|$const-media-direction

```scss
@include media-between(phone, desktop) { ... }
```

[Back to top](#table-of-contents)

### media-only

Wraps the content with a specified media query between provided **$scale** and previous scale in map. Use of [**media-up-from**](#mixin-media-up-from) mixin is highly preferred before any other media mixin (not a requirement). The **$operator** parameter determines relationship between width and height properties, only relevant when **$prop** is set to **both**. Media breakpoints are completely customizable through **$const-media-scale** constant.

```scss
media-only($scale, $prop: width, $operator: and, $direction: $const-media-direction)
```

Name|Type|Description|Default
-|-|-|-
scale|`string`|Scale|&ndash;
prop|`string`|Determines what value is returned, can be **width**, **height** or **both**|width
operator|`string`|Determines relationship between width and height, can be **and** or **or**|and
direction|`string`|Determines the direction for media query, can be **up** or **down**|$const-media-direction

```scss
@include media-only(phone) { ... }
```

[Back to top](#table-of-contents)

### media-up-from

Wraps the content with a specified media query from provided **$scale** in upward direction. Use of this mixin is highly preferred before any other media mixin (not a requirement). The **$operator** parameter determines relationship between width and height properties, only relevant when **$prop** is set to **both**. Media breakpoints are completely customizable through **$const-media-scale** constant.

```scss
media-up-from($scale, $prop: width, $operator: and, $direction: $const-media-direction)
```

Name|Type|Description|Default
-|-|-|-
scale|`number | string`|Scale or number|&ndash;
prop|`string`|Determines what value is returned, can be **width**, **height** or **both**|width
operator|`string`|Determines relationship between width and height, can be **and** or **or**|and
direction|`string`|Determines the direction for media query, can be **up** or **down**|$const-media-direction

```scss
@include media-up-from(phone) { ... }
```

[Back to top](#table-of-contents)

### media-up-to

Wraps the content with a specified media query from provided **$scale** in downward direction. Use of [**media-up-from**](#mixin-media-up-from) mixin is highly preferred before any other media mixin (not a requirement). The **$operator** parameter determines relationship between width and height properties, only relevant when **$prop** is set to **both**. Media breakpoints are completely customizable through **$const-media-scale** constant.

```scss
media-up-to($scale, $prop: width, $operator: and, $direction: $const-media-direction)
```

Name|Type|Description|Default
-|-|-|-
scale|`number | string`|Scale or number|&ndash;
prop|`string`|Determines what value is returned, can be **width**, **height** or **both**|width
operator|`string`|Determines relationship between width and height, can be **and** or **or**|and
direction|`string`|Determines the direction for media query, can be **up** or **down**|$const-media-direction

```scss
@include media-up-to(phone) { ... }
```

[Back to top](#table-of-contents)

### css-custom-properties

Outputs :root element with all properties from detected modules.

```scss
css-custom-properties()
```

```scss
@include css-custom-properties { ... }
```

[Back to top](#table-of-contents)

### has-class

Adds a **$list** of classes to a root element. Individual values are converted to a class if possible. New classes are placed at the beginning of the selector, therefore the root element must be either class or id selector.

```scss
has-class($list)
```

Name|Type|Description|Default
-|-|-|-
list|`string | list`|List of class names|&ndash;

```scss
@include has-class(is-open, is-active) { ... }
```

[Back to top](#table-of-contents)

### size

Allows to use shorthand properties to represent width and height. Unitless values are handled as aspect ratio. Skip token **false** can be used to skip width or height property. This mixin already includes unit conversion, use non-relative units for input value, can be disabled by setting **$method** parameter to **false**. This mixin is alternative to [**postcss-short-size**](https://github.com/jonathantneal/postcss-short-size) plugin.

```scss
size($size, $method: rem)
```

Name|Type|Description|Default
-|-|-|-
size|`number | list`|Size, or space separated list of width and height (set **false** to skip)|&ndash;
method|`bool | string`|Function called on the value, use **em** or **rem**|rem

```scss
@include size(640px 4/3)
```

[Back to top](#table-of-contents)

### transition

Shortcut mixin for transition property. Allows to apply multiple transition properties with identical options.

```scss
transition($options, $properties)
```

Name|Type|Description|Default
-|-|-|-
options|`string`|Options applied to every transition|&ndash;
properties|`string | list`|List of properties|&ndash;

```scss
@include transition(300ms, width, height) // transition: width 300ms, height 300ms
```

[Back to top](#table-of-contents)

---

**Last Updated:** Wed Jan 30 2019 09:27:51 GMT+0100 (Central European Standard Time)