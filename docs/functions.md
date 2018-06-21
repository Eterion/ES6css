# Functions

[Back](./#contents)

- [clear-unit](#clear-unit)
- [color-spectrum](#color-spectrum)
- [color](#color)
- [em-always](#em-always)
- [em](#em)
- [font-weight](#font-weight)
- [get](#get)
- [map-deep-get](#map-deep-get)
- [map-filter](#map-filter)
- [map-key-get](#map-key-get)
- [media](#media)
- [rem-always](#rem-always)
- [rem](#rem)
- [str-replace](#str-replace)
- [to-class](#to-class)
- [to-id](#to-id)
- [to-unicode](#to-unicode)

## clear-unit

Returns a `$number` stripped of its unit, if possible.

### Syntax

```
clear-unit($number)
```

### Params

| Parameter | Description  | Type     | Default |
| --------- | ------------ | -------- | ------- |
| `$number` | Input number | `Number` | -       |

[Back to top](#functions)

## color-spectrum

Returns color `$value` according to its position in provided `$list`, where the `$list` represents the entire color spectrum.

### Syntax

```
color-spectrum($list, $value[, $saturation, $lightness])
```

### Params

| Parameter     | Description                                  | Type                 | Default |
| ------------- | -------------------------------------------- | -------------------- | ------- |
| `$list`       | List of values that represent color spectrum | `List`               | -       |
| `$value`      | Searched value                               | `Number` or `String` | -       |
| `$saturation` | Saturation (percent)                         | `Number`             | 100     |
| `$lightness`  | Lightness (percent)                          | `Number`             | 50      |

[Back to top](#functions)

## color

Returns scaled `$color` according to a `$scale` key. Allows easy color scaling without the need of additional variables for each new color variant. The source color can be passed as either direct color value or key identifier present in `$const-color-keys` constant. Scaling levels are completely customizable through `$const-color-scale` constant.

### Syntax

```
color($color[, $scale])
```

### Params

| Parameter | Description        | Type                | Default |
| --------- | ------------------ | ------------------- | ------- |
| `$color`  | Input color or key | `Color` or `String` | -       |
| `$scale`  | Scale key          | `Bool` or `String`  | false   |

[Back to top](#functions)

## em-always

This function is identical to [`em`](#em) function, except it will always convert to relative units, regardless of `$const-relative-units-enable` value.

### Syntax

```
em-always($number)
```

### Params

| Parameter | Description  | Type     | Default |
| --------- | ------------ | -------- | ------- |
| `$number` | Input number | `Number` | -       |

[Back to top](#functions)

## em

Returns a `$number` recalculated to em units, if possible. Allows scaling based on `$const-relative-units-root` constant. To ensure visibility of all elements, resulting numbers equal or below `$const-relative-units-min` are not recalculated. Requires `$const-relative-units-enable` set to true. Use [em-always](#em-always) if you wish to convert to relative units, regardless of global settings.

### Syntax

```
em($number[, $unit, $ignore-const-relative-units-enable])
```

### Params

| Parameter                             | Description                                                                       | Type                  | Default |
| ------------------------------------- | --------------------------------------------------------------------------------- | --------------------- | ------- |
| `$number`                             | Input number                                                                      | `Number`              | -       |
| `$unit`                               | Returned unit                                                                     | `Boolean` or `String` | em      |
| `$ignore-const-relative-units-enable` | Internal option, use [em-always](#em-always) or [rem-always](#rem-always) instead | `Boolean`             | false   |

[Back to top](#functions)

## font-weight

Returns a numeric representation of font-weight based on `$value`. Allows the use of readable values without the knowledge of real numbers used by css. Complete map of keys and values is set through `$const-font-weight-scale` constant. This function is alternative to [postcss-font-weights](https://github.com/jonathantneal/postcss-font-weights) plugin.

### Syntax

```
font-weight($value)
```

### Params

| Parameter | Description         | Type                 | Default |
| --------- | ------------------- | -------------------- | ------- |
| `$value`  | Number or scale key | `Number` or `String` | -       |

[Back to top](#functions)

## get

Returns a property value from export item. Can be used inside a [import](./mixins/#import) mixin without `$name` and `$group` parameters.

### Syntax

```
get($prop[, $name, $group])
```

### Params

Parameters|Description|Type|Default
-|-|-|-
`$prop`|Property name|`String`|-
`$name`|Module name|`Boolean` or `String`|false
`$group`|Group key|`Boolean` or `String`|`$export-group`

[Back to top](#functions)

## map-deep-get

Extended version of the native [map-get](http://sass-lang.com/documentation/Sass/Script/Functions.html#map_get-instance_method) function, with nested maps support.

### Syntax

```
map-deep-get($map, $keys...)
```

### Params

Parameters|Description|Type|Default
-|-|-|-
`$map`|Source map|`Map`|-
`$keys`|Path to requested key|`String` or `List`|-

[Back to top](#functions)

## map-filter

Returns a new map with filtered `$keys` only. Throws an error if any value from `$keys` in `$map` doesn't exists.

### Syntax

```
map-filter($map, $keys...)
```

### Params

Parameters|Description|Type|Default
-|-|-|-
`$map`|Source map|`Map`|-
`$keys`|List of filtered keys|`String` or `List`|-

[Back to top](#functions)

## map-key-get

Returns a value from source `$map` based on `$key`. This function is only a wrapper function around the native [map-get](http://sass-lang.com/documentation/Sass/Script/Functions.html#map_get-instance_method) function, with the support of inherit value and error handling.

### Syntax

```
map-key-get($map, $key[, $can-inherit])
```

### Params

Parameters|Description|Type|Default
-|-|-|-
`$map`|Source map|`Map`|-
`$key`|Number or key|`Number` or `String`|-
`$can-inherit`|Determines if inherit can be passed|`Boolean`|false

[Back to top](#functions)

## media

Returns pixel value of media scale according to `$value` property. Use of [media-between](#media-between), [media-only](#media-only), [media-up-from](#media-up-from) and [media-up-to](#media-up-to) mixins is highly recommended instead of creating new media rules through this function. Media breakpoints are completely customizable through `$const-media-scale` constant. Note that `both` option on `$prop` is relevant only when media breakpoint is defined as map of width and height properties.

### Syntax

```
media($value[, $prop])
```

### Params

Parameters|Description|Type|Default
-|-|-|-
`$value`|Scale or number|`Number` or `String`|-
`$prop`|Determines what value is returned, can be **width**, **height** or **both**|`String`|width

[Back to top](#functions)

## rem-always

This function is identical to [rem](#rem) function, except it will always convert to relative units, regardless of `$const-relative-units-enable` value.

### Syntax

```
rem-always($number)
```

### Params

Parameters|Description|Type|Default
-|-|-|-
`$number`|Input number|`Number`|-

[Back to top](#functions)

## rem

Returns a `$number` recalculated to rem units, if possible. Allows scaling based on `$const-relative-units-root` constant. To ensure visibility of all elements, resulting numbers equal or below `$const-relative-units-min` are not recalculated. Requires `$const-relative-units-enable` set to true. Use [rem-always](#rem-always) if you wish to convert to relative units, regardless of global settings.

### Syntax

```
rem($number)
```

### Params

Parameters|Description|Type|Default
-|-|-|-
`$number`|Input number|`Number`|-

[Back to top](#functions)

## str-replace

Replaces all occurences of `$search` substring with `$replace` in `$string`.

### Syntax

```
str-replace($string, $search[, $replace])
```

### Params

Parameters|Description|Type|Default
-|-|-|-
`$string`|Initial string|`String`|-
`$search`|Substring to replace|`String`|-
`$replace`|New value|`String`|''

[Back to top](#functions)

## to-class

Returns a `$class` string converted to class selector if possible. Doesn't affect the input value if a class selector is already present.

### Syntax

```
to-class($class)
```

### Params

Parameters|Description|Type|Default
-|-|-|-
`$class`|Class name|`String`|-

[Back to top](#functions)

## to-id

Returns a `$id` string converted to id selector if possible. Doesn't affect the input value if a id selector is already present.

### Syntax

```
to-id($id)
```

### Params

Parameters|Description|Type|Default
-|-|-|-
`$id`|Id name|`String`|-

[Back to top](#functions)

## to-unicode

Converts `$value` to a unicode string used by css content property. This function is available because of a known bug, more information in this github [issue](https://github.com/sass/sass/issues/1395). Only valid unicode values are automatically detected and converted, everything else is returned in its original input value.

### Syntax

```
to-unicode($value)
```

### Params

Parameters|Description|Type|Default
-|-|-|-
`$value`|Value|`String`|-

[Back to top](#functions)
