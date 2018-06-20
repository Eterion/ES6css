# Constants

There are several variables (I've named them constants, because internally they're not changed) to configure this library. All of them have reasonable defaults (I hope so, seems reasonable to me), so configuration is totally optional.

Constants variables always start with `const` prefix and are defined with `!default` flag, so your custom configuration must be added before the `esm` import.

- [Variables](#variables)
  - [Default Key](#default-key)
  - [Preserve Defaults](#preserve-defaults)
  - [Relative Units](#relative-units)
- [Maps](#maps)
  - [Color](#color)
  - [Export](#export)
  - [Font](#media)
  - [Z-Index](#z-index)

## Variables

### Default Key

```scss
$const-default-key: regular;
```

Determines what key in maps is used as default value in functions that make use of map constants. **If you change this value, make sure all the map constants contain this key as well, otherwise compilation may not be successful (probably).**

### Preserve Defaults

```scss
$const-preserve-defaults: true;
```

This constant affects only map constants. When set to `true`, your custom map configuration will be merged with defaults (your values take precedence over defaults). If you wish to completely replace default map values with your custom properties, set this constant to `false`.

### Relative Units

```scss
$const-relative-units-enable: false;
```

When enabled, functions [em](./functions/#em), [rem](./functions/#rem) and other (all relevant functions should have mentioned whenever relative units settings affects them) will recalculate non-relative units to relative values. Resulting value is calculated relative to `$const-relative-units-root` constant.

#### Additional Settings

- `$const-relative-units-min: 3px;` Any value equal or below this constant will not be converted to relative units. This may be useful to allow rendering of small values.

- `$const-relative-unit-root: 16px;` This value is the basis for calculation of all relative units. Your `body` element should have set the same font-size property.

## Maps

The following map constants must have specified [default key](#default-key), if the default key is not present, compilation may not be successful. These maps can also be completely replaced with new custom definitions by setting [preserve defaults](#preserve-defaults) constants to `false`.

### Color

Source constants related to [color](./functions/#color) function.

#### Keys

```scss
$const-color-keys: (
  'gray': dimgray,
  'theme': blue,
  'success': green,
  'warn': yellow,
  'err': red,
);
```

List of keyword and color values. You probably want to define your colors here. The keyword for a color can safely be a valid color value (for example `gray`), the [color](./functions/#color) function takes care of interpretation and will always check color keys before using the actual color.

```scss
color(gray) // returns dimgray
```

#### Scale

```scss
$const-color-scale: (
  'heavy': -64,
  'hard': -55,
  'darkest': -50,
  'darker': -36,
  'dark': -25,
  'regular': 0,
  'light': 25,
  'lighter': 42,
  'lightest': 70,
  'soft': 85,
  'pastel': 95,
);
```

List of available scale keys for the [color](./functions/#color) function, used as second argument. The number (positive or negative) represent lightness relative to the original color. Internally uses native sass [scale-color](http://sass-lang.com/documentation/Sass/Script/Functions.html#scale_color-instance_method) method.

```scss
color(gray, dark) // returns #484848
```

### Export

```scss
$const-export-group: ();
```

TBD

### Font

Source constants related to font functions.

#### Weight

```scss
$const-font-weight-scale-defaults: (
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

List of available keys for the [font-weight](./functions/#font-weight) function. **Note, this function duplicates the [postcss-font-weight](https://github.com/jonathantneal/postcss-font-weights) plugin. If you're using this plugin, there's no need to use this function, use the keyword values directly.**

```scss
font-weight(light) // returns 300
```

### Z-Index

```scss
$const-z-index: ();
```

TBD
