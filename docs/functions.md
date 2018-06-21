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

```scss
clear-unit($number)
```

### Params

| Parameter | Description  | Type     | Default |
| --------- | ------------ | -------- | ------- |
| `$number` | Input number | `Number` | -       |

[Top](#)

## color-spectrum

Returns color `$value` according to its position in provided `$list`, where the `$list` represents the entire color spectrum.

### Syntax

```scss
color-spectrum($list, $value, $saturation, $lightness)
```

### Params

| Parameter     | Description                                  | Type                 | Default |
| ------------- | -------------------------------------------- | -------------------- | ------- |
| `$list`       | List of values that represent color spectrum | `List`               | -       |
| `$value`      | Searched value                               | `Number` or `String` | -       |
| `$saturation` | Saturation (percent)                         | `Number`             | 100     |
| `$lightness`  | Lightness (percent)                          | `Number`             | 50      |

[Top](#)

## color

Returns scaled `$color` according to a `$scale` key. Allows easy color scaling without the need of additional variables for each new color variant. The source color can be passed as either direct color value or key identifier present in `$const-color-keys` constant. Scaling levels are completely customizable through `$const-color-scale` constant.

### Syntax

```scss
color($color, $scale)
```

### Params

| Parameter | Description        | Type                | Default |
| --------- | ------------------ | ------------------- | ------- |
| `$color`  | Input color or key | `Color` or `String` | -       |
| `$scale`  | Scale key          | `Bool` or `String`  | false   |

[Top](#)

## em-always

This function is identical to [**em**](#em) function, except it will always convert to relative units, regardless of `$const-relative-units-enable` value.

### Syntax

```scss
em-always($number)
```

### Params

| Parameter | Description  | Type     | Default |
| --------- | ------------ | -------- | ------- |
| `$number` | Input number | `Number` | -       |

[Back](./#contents)
