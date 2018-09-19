---
prev: /const
next: /mixin
---

# Functions

## clear-unit

Returns a `$number` stripped of its unit, if possible.

```scss
clear-unit($number)
```

- `$number: number` - Input number

## color

Returns scaled `$color` according to a `$scale` key. Allows easy color scaling
without the need of additional variables for each new color variant. The source
color can be passed as either direct color value or key identifier present in
[color-keys](/const.md#color-keys) constant. Scaling levels are completely
customizable through [color-scale](/const.md#color-scale) constant.

```scss
color($color, $scale: false)
```

- `$color: color | string` - Input color or key
- `$scale: boolean | string` - Scale key

## color-spectrum

Returns color `$value` according to its position in provided `$list`, where the
`$list` represents the entire color spectrum.

```scss
color-spectrum($list, $value, $saturation: 100%, $lightness: 50%)
```

- `$list: list` - List of values that represent color spectrum
- `$value: number | string` - Searched value
- `$saturation: number` - Saturation (percent)
- `$lightness: number` - Lightness (percent)

## em

Returns a `$number` recalculated to em units, if possible. Allows scaling based
on `$const-relative-units-root` constant. To ensure visibility of all elements,
resulting numbers equal or below `$const-relative-units-min` are not
recalculated. Requires [relative-units](/const.md#relative-units) set to true.
Use [em-always](#em-always) if you wish to convert to relative units, regardless
of global settings.

```scss
em($number)
```

- `$number: number` - Input number

## em-always

This function is identical to [em](#em) function, except it will always convert
to relative units, even if [relative-units](/const.md#relative-units) are
disabled.

```scss
em-always($number)
```

- `$number: number` - Input number

## font-weight

Returns a numeric representation of font-weight based on `$value`. Allows the
use of readable values without the knowledge of real numbers used by css.
Complete map of keys and values is set through
[font-weight-scale](/const.md#font-weight-scale) constant. This function is
alternative to
[postcss-font-weights](https://github.com/jonathantneal/postcss-font-weights)
plugin.

```scss
font-weight($value)
```

- `$value: number | string` - Number or scale key

## get

Returns a property value from export item. Can be used inside a
[import](/mixin.md#import) mixin without `$name` and `$group` parameters.

```scss
get($prop, $name: false, $group: $export-group || false)
```

- `$prop: string` - Property name
- `$name: boolean | string` - Module name
- `$group: boolean | string` - Group key

## interpolate

Returns input template where placeholders `'{n}'` are replaced with data from
map.

```scss
interpolate($template, $data)
```

- `$template: string` - Template string
- `$data: map` - Map of replacement keys with values

## map-deep-get

Extended version of the native
[map-get](http://sass-lang.com/documentation/Sass/Script/Functions.html#map_get-instance_method)
function, with nested maps support.

```scss
map-deep-get($map, $keys...)
```

- `$map: map` - Source map
- `$keys: string | list` - Path to requested key

## map-filter

Returns a new map with filtered `$keys` only. Throws an error if any value from
`$keys` in `$map` doesn't exists.

```scss
map-filter($map, $keys...)
```

- `$map: map` - Source map
- `$keys: string | list` - List of filtered keys

## map-key-get

Returns a value from source `$map` based on `$key`. This function is only a
wrapper function around the native
[map-get](http://sass-lang.com/documentation/Sass/Script/Functions.html#map_get-instance_method)
function, with the support of inherit value and error handling.

```scss
map-key-get($map, $key, $can-inherit: false)
```

- `$map: map` - Source map
- `$key: number | string` - Number or key
- `$can-inherit: boolean` - Deterimens if inherit can be passed

## media

Returns pixel value of media scale according to `$value` property. Use of
[media-between](#mixin-media-between), [media-only](#mixin-media-only),
[media-up-from](#mixin-media-up-from) and [media-up-to](#mixin-media-up-to)
mixins is highly recommended instead of creating new media rules through this
function. Media breakpoints are completely customizable through
[media-scale](/const.md#media-scale) constant. Note that **both** option on
`$prop` is relevant only when media breakpoint is defined as map of width and
height properties.

```scss
media($value, $prop: width)
```

- `$value: number | string` - Scale or number
- `$prop: both | height | width` - Determines what value is returned

## rem

Returns a `$number` recalculated to rem units, if possible. Allows scaling based
on `$const-relative-units-root` constant. To ensure visibility of all elements,
resulting numbers equal or below `$const-relative-units-min` are not
recalculated. Requires [relative-units](/const.md#relative-units) set to true.
Use [rem-always](#rem-always) if you wish to convert to relative units,
regardless of global settings.

```scss
rem($number)
```

- `$number: number` - Input number

## rem-always

This function is identical to [rem](#rem) function, except it will always
convert to relative units, even if [relative-units](/const.md#relative-units)
are disabled.

```scss
rem-always($number)
```

- `$number: number` - Input number

## str-replate

Replaces all occurences of `$search` substring with `$replace` in `$string`.

```scss
str-replace($string, $search, $replace: '')
```

- `$string: string` - Initial string
- `$search: string` - Substring to replace
- `$replace: string` - New value

## to-class

Returns a `$class` string converted to class selector if possible. Doesn't
affect the input value if a class selector is already present.

```scss
to-class($class)
```

- `$class: string` - Class name

## to-id

Returns a `$id` string converted to id selector if possible. Doesn't affect the
input value if a id selector is already present.

```scss
to-id($id)
```

- `$id: string` - Id name

## to-unicode

Converts `$value` to a unicode string used by css content property. This
function is available because of a known bug, more information in this github
[issue](https://github.com/sass/sass/issues/1395). Only valid unicode values are
automatically detected and converted, everything else is returned in its
original input value.

```scss
to-unicode($value)
```

- `$value: string` - Value
