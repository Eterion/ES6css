---
prev: /fn
---

# Mixins

## export

Creates a new export item, that can be extracted using the [import](#import)
mixin. Includes few automatically computed properties (name, selector, z-index).
Throws an error if item with identical `$name` in a `$group` already exists, use
[extend](#extend) mixin if you need to modify already existing item.

```scss
@include export($name, $props: false, $group: $export-group || false);
```

- `$name: string` - Module name
- `$props: boolean | map` - Property map
- `$group: string` - Group key

## extend

Extends already existing item created via [export](#export) mixin. Properties in
the extend mixin takes precedence over already existing ones. Throws an error if
`$name` in a `$group` doesn't exists.

```scss
@include extend($name, $props, $group: $export-group || false);
```

- `$name: string` - Module name
- `$props: boolean | map` - Property map
- `$group: string` - Group key

## has-class <Badge  text="@content" type="warn" />

Adds a `$list` of classes to a root element. Individual values are converted to
a class if possible. New classes are placed at the beginning of the selector,
therefore the root element must be either class or id selector.

```scss
@include has-class($list...);
```

- `$list: string | list` - List of class names

## import <Badge  text="@content" type="warn" />

Extracts an item, previously defined via [export](#export) mixin, and allows the
use of [get](/fn.md#get) function without the need of specified group. This
mixin internally uses [props](#props) mixin, with the addition of automatically
generated selector. The selector is class by default, set **unique** property to
true to enable id selector.

```scss
@include import($name, $group: $export-group || false);
```

- `$name: string` - Module name
- `$group: string` - Group key

## media-between <Badge  text="@content" type="warn" />

Wraps the content with a specified media query between `$lower` and `$upper`
values. Use of [media-up-from](#media-up-from) mixin is highly preferred before
any other media mixin (not a requirement). The `$operator` parameter determines
relationship between width and height properties, only relevant when `$prop` is
set to **both**. Media breakpoints are completely customizable through
`$const-media-scale` constant.

```scss
@include media-between(
  $lower,
  $upper,
  $prop: width,
  $operator: and,
  $direciton: $const-mq-direction
);
```

- `$lower: number | string` - Scale or number
- `$upper: number | string` - Scale or number
- `$prop: both | height | width` - Determines what value is returned
- `$operator: and | or` - Determines relationship between width and height
- `$direction: up | down | false` - Determines relationship between width and
  height

## media-only <Badge  text="@content" type="warn" />

Wraps the content with a specified media query between provided `$scale` and
previous scale in map. Use of [media-up-from](#media-up-from) mixin is highly
preferred before any other media mixin (not a requirement). The `$operator`
parameter determines relationship between width and height properties, only
relevant when `$prop` is set to **both**. Media breakpoints are completely
customizable through `$const-media-scale` constant.

```scss
@include media-only(
  $scale,
  $prop: width,
  $operator: and,
  $direction: $const-mq-direction
);
```

- `$scale: string` - Scale
- `$prop: both | height | width` - Determines what value is returned
- `$operator: and | or` - Determines relationship between width and height
- `$direction: up | down | false` - Determines relationship between width and
  height

## media-up-from <Badge  text="@content" type="warn" />

Wraps the content with a specified media query from provided `$scale` in upward
direction. Use of this mixin is highly preferred before any other media mixin
(not a requirement). The `$operator` parameter determines relationship between
width and height properties, only relevant when `$prop` is set to **both**.
Media breakpoints are completely customizable through `$const-media-scale`
constant.

```scss
@include media-up-from(
  $scale,
  $prop: width,
  $operator: and,
  $direction: $const-mq-direction
);
```

- `$scale: number | string` - Scale or number
- `$prop: both | height | width` - Determines what value is returned
- `$operator: and | or` - Determines relationship between width and height
- `$direction: up | down | false` - Determines relationship between width and
  height

## media-up-to <Badge  text="@content" type="warn" />

Wraps the content with a specified media query from provided `$scale` in
downward direction. Use of [media-up-from](#media-up-from) mixin is highly
preferred before any other media mixin (not a requirement). The `$operator`
parameter determines relationship between width and height properties, only
relevant when `$prop` is set to **both**. Media breakpoints are completely
customizable through `$const-media-scale` constant.

```scss
@include media-up-to(
  $scale,
  $prop: width,
  $operator: and,
  $direciton: $const-mq-direction
);
```

- `$scale: number | string` - Scale or number
- `$prop: both | height | width` - Determines what value is returned
- `$operator: and | or` - Determines relationship between width and height
- `$direction: up | down | false` - Determines relationship between width and
  height

## props <Badge  text="@content" type="warn" />

Extracts an item, previously defined via [export](#export) mixin, and allows the
use of [get](/fn.md#get) function without the need of specified group. This
mixin is internally used by [import](#import) mixin. Unlike the
[import](#import), this mixin doen't automatically adds generated selector.

```scss
@include props($name, $group: $export-group || false);
```

- `$name: string` - Module name
- `$group: string` - Group key

## size

Allows to use shorthand properties to represent width and height. Unitless
values are handled as aspect ratio. Skip token **false** can be used to skip
width or height property. This mixin already includes unit conversion, use
non-relative units for input value, can be disabled by setting `$method`
parameter to **false**. This mixin is alternative to
[postcss-short-size](https://github.com/jonathantneal/postcss-short-size)
plugin.

```scss
@include size($size, $method: rem);
```

- `$size: number | list` - Size, or space separated list of with and height (set
  **false** to skip)
- `$method: em | rem | false` - Function called on the value

## tiles <Badge  text="@content" type="warn" /><Badge text="alpha" type="error" />

Adds tiles layout to element. Includes legacy support, however the generated
layout may not be identical to a modern W3C standard (because legacy syntax
doesn't support automatic positioning). Note, enabled legacy support may
generate large amount of code.

```scss
@include tiles($width, $gap: 0, $repeat: auto-fill: $legacy: Legacy);
```

```ts
interface Legacy {
  enable?: boolean; // false
  item?: string; // to-class(item)
  max-columns?: number; // 1
  max-items?:number // 1
}
```

- `$width: number` - Column width, in pixels
- `$gap: number` - Gap between rows and columns, in pixels
- `$repeat: string` - Recurring pattern for repeat function, see
  [mdn](https://developer.mozilla.org/en-US/docs/Web/CSS/repeat)
- `$legacy: map` - Settings for legacy support, see Legacy interface

## transition

Shortcut mixin for transition property. Allows to apply multiple transition
properties with identical options.

```scss
@include transition($options, $properties...);
```

- `$options: string` - Options applied to every transition
- `$properties: string | list` - List of properties

## z-index

Inserts appropriate **z-index** property according to `$name`. The z-index value
is automatically calculated based on the position in a source map, meaning last
value has the highest z-index assigned. Throws an error if z-index name doesn't
exists in a source map. Automatically adds `$position` property, can be disabled
by setting to **false**.

```scss
@include z-index($name: get(z-index), $position: relative);
```

- `$name: string` - Identifier
- `$position: boolean | string` Position style definition
