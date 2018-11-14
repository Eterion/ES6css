---
next: /fn
---

# Constants

<Tip title="IMPORTANT" type="danger">

Constants are defined with `!default` flag, this means all constants, starting
with `$const` prefix, must be placed **before** the `dist/esm` import.

</Tip>

<Tip type="warn">

Because some of the constants rely on other constants, order is important.
Recommended order of constants is [default-key](#default-key),
[mq-direction](#mq-direciton), [preserve-defaults](#preserve-defaults),
[relative-units](#relative-units), [template](#template), other...

</Tip>

## color-keys

- Type: `map`

```scss
$const-color-keys: (
  'gray': dimgray,
  'theme': blue,
  'success': green,
  'warn': yellow,
  'err': red,
);
```

List of keyword and color values. You probably want to define your colors here.
The keyword for a color can be pretty much anything, including a valid color
value (for example `gray`), the [color](/fn.md#color) function takes care of
everything and will always check for color keys before using the actual color.

## color-scale

Type: `map`

```scss
$const-color-scale: (
  'dark': -50,
  'regular': 0,
  'light': 50,
);
```

List of scale keys for the [color](/fn.md#color) function, used as second
argument. The number (positive or negative value) represents percentage
lightness relative to the original source color. Internally uses native
[scale-color](http://sass-lang.com/documentation/Sass/Script/Functions.html#scale_color-instance_method)
method.

<Tip type="danger">

This map requires [default-key](#default-key) to be present, otherwise
compilation may not be successful.

</Tip>

## custom-properties

- Type: `boolean`

```scss
$const-custom-properties: false;
```

Enables css custom properties, resulting in values to be rendered with
[var](https://developer.mozilla.org/en-US/docs/Web/CSS/var) instead of direct
value. Use [css-custom-properties](/mixin.md#css-custom-properties) mixin to
generate `:root` variables. Additional settings is available, relevant only when
this constant is enabled.

| Constant                                         | Default | Description                                     |
| ------------------------------------------------ | ------- | ----------------------------------------------- |
| <nobr>`$const-custom-properties-fallback`</nobr> | false   | Adds fallback value directly to **var** syntax. |

## default-key

- Type: `string`

```scss
$const-default-key: regular;
```

Determines what key in maps is used as the default value in functions that make
use of certain map constants. If you change this value, make sure all the
relevant map constants contain this key as well, otherwise compilation may not
be successful (probably).

## export-groups

Type: `map`

```scss
$const-export-groups: ();
```

List of group names for export modules, where key represents group name
([template](#template) replacement of `{group}` substring), and value represents
much shorter identificator ([template](#template) replacement of `{id}`
substring).

## font-weight-scale

Type: `map`

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
);
```

List of available keys for the [font-weight](/fn.md#font-weight) function. Note,
this function duplicates the
[postcss-font-weight](https://github.com/jonathantneal/postcss-font-weights)
plugin. If you're using this plugin, there's no need to use this function as
well, use the keyword values directly.

## media-scale

Type: `map`

```scss
$const-media-scale: (
  'phone': (
    width: 480px,
    height: 853px,
  ),
  'desktop': (
    width: 1920px,
    height: 1080px,
  ),
);
```

List of media breakpoints. The values can be defined either directly as values
or as map of width and height properties. However, if used as direct values,
some of the media functionality will not be available.

## mq-direction

Type: `down | up | false`

```scss
$const-mq-direction: up;
```

Determines in what direction the generated media queries take priority. This
constant affects all media mixins (can be set individually via parameter) and is
dependent on [media-scale](#media-scale) map.

<Tip type="warn">

This behavior can be disabled by setting `$const-mq-direction: false`. This also
means your media queries may overlap (depends on your use), and mess up things
on very specific resolutions.

</Tip>

| Value  | Description                                                                                                                  |
| ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `down` | Higher media scale take priority over lower ones, meaning `max` value of lower scale is always one pixel lower than defined. |
| `up`   | Exact opposite of `down` behavior.                                                                                           |

## preserve-defaults

Type: `boolean`

```scss
$const-preserve-defaults: true;
```

This constant affects only few map constants. When set to `true`, you custom map
configuration will be merged with defaults (your values take precedence over
defaults). If you wish to completely replace default map values with your own,
set this constant to `false`.

## relative-units

Type: `boolean`

```scss
$const-relative-units: false;
```

When enabled, function [em](/fn.md#em), [rem](/fn.md#rem) and other (all
relevant function should have mentioned whenever relative units settings affects
them) will recalculate non-relative units to relative values (if possible).
Resulting value is calculated relative to `$const-relative-units-root` constant.
Relative units can be further controlled by additional constants.

| Constant                                 | Default | Description                                                                                                                                                                                          |
| ---------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <nobr>`$const-relative-units-min`</nobr> | 0       | Any value (in pixels) equal or below this constant will not be converted to relative units. This applies to the [em-always](/fn.md#em-always) and [rem-always](/fn.md#rem-always) functions as well. |
| <nobr>`$const-relative-unit-root`</nobr> | 16px    | Base value (in pixels) for calculation of relative units. Your `html` element should have set the same `font-size` property (or quivalent).                                                          |

## template

- Type: `string`

```scss
$const-template: '{module}';
```

Represents how the selector and z-index properties of imported modules are
created. This is to allow customization of selectors generated by
[import](/mixin.md#import) mixin. Additional templates are available, relevant
only when export groups are used.

| Constant                                      | Default           | Description                 |
| --------------------------------------------- | ----------------- | --------------------------- |
| <nobr>`$const-template-group-selector`</nobr> | {id}-{module}     | Template for selector.      |
| <nobr>`$const-template-group-z-index`</nobr>  | {module}({group}) | Template for z-index value. |

Available list of placeholders for template constants.

- `{group}` - Represents **key** from `$const-export-groups` map item.
- `{id}` - Represents **value** from `$const-export-groups` map item.
- `{module}` - Represents module name.

## z-index

Type: `list | map`

```scss
$const-z-index: ();
```

List of values for the [z-index](/mixin.md#z-index) mixin. Can be a simple list,
or complex map of values. Each value must be unique in the entire map (only
first occurence will be taken into account). Values must follow the
`$const-template` (or `$const-template-group-z-index` if you're using export
groups) [template](#template).
