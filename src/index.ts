import Color from 'color';

const colorHues: string[] = [
  'red',
  'orange',
  'yellow',
  'lime',
  'green',
  'teal',
  'cyan',
  'blue',
  'indigo',
  'violet',
  'fuchsia',
  'pink',
];

interface IHueNameOptions {
  hues?: string[];
}

/**
 * Returns named hue representation of input color.
 * @param color Input color.
 * @param options Options.
 * @param options.hues Custom array of hue names.
 */

export function hueName(
  color: string,
  { hues = colorHues }: IHueNameOptions = {}
): string {
  return [...hues, hues[0]][
    Math.round((Color(color).hue() - 2) / (360 / hues.length))
  ];
}

type Monochrome = string[];

interface IMonochromeOptions {
  desaturate?: boolean | 'black';
  index?: number;
  shade?: number;
  steps?: number;
  tint?: number;
}

/**
 * Computes monochrome color scale, where index 0 is the lightest.
 * @param color Input color.
 * @param options Options.
 * @param options.desaturate Enable desaturation, can be `true` or `'black'`.
 * @param options.index Returns specific color, starts at 0.
 * @param options.shade Modifier of dark colors.
 * @param options.steps Number of steps.
 * @param options.tint Modifier of light colors.
 */

export function monochrome(
  color: string,
  {
    desaturate = false,
    index,
    shade = 1,
    steps = 10,
    tint = 1,
  }: IMonochromeOptions = {}
): Monochrome | string {
  const fraction = 1 / (steps * 10);
  const max = steps / 2;
  let monochrome: Monochrome = [];
  for (let n: number = 0; n < steps; n++) {
    let mix: Color = Color(color);

    // Tint (white)
    if (n < max) {
      const edge = 1 / (steps - 1);
      const modifier = fraction * tint * 0.55;
      let sum = 0;

      for (let s: number = 1; s < max; s++) {
        sum = sum + s * modifier;
      }

      if (sum >= 1 - edge * 2) {
        return Color('#fff').hex();
      }

      const percentage = (1 - sum - edge * 2) / max;
      const value = n * percentage + n * modifier;
      mix = mix.mix(Color('#fff'), 1 - edge - value);
    }

    // Shade (black)
    else if (n > max) {
      const edge = 1 / steps;
      const modifier = fraction * shade * 1.15;
      let sum = 0;

      for (let s: number = 1; s < max; s++) {
        sum = sum + s * modifier;
      }

      if (sum >= 1 - edge * 2) {
        return Color('#000').hex();
      }

      const percentage = (1 - sum - edge * 2) / max;
      const nMod = n - max - 1;
      const value = nMod * percentage + nMod * modifier;
      mix = mix.mix(Color('#000'), edge + value);
    }

    // Properties
    const hue = Color(mix).hue();
    let saturation = Color(mix).saturationl();
    const lightness = Color(mix).lightness();

    // Desaturate
    if (desaturate) {
      saturation = saturation * (desaturate === 'black' ? 0.025 : 0.175);
    }

    monochrome = [
      ...monochrome,
      Color(`hsl(${hue}, ${saturation}%, ${lightness}%)`)
        .hex()
        .toLowerCase(),
    ];
  }

  // Index
  if (index || index === 0) {
    return monochrome[index];
  }

  return monochrome;
}

type Palette = { [key: string]: Monochrome | string };

interface IPaletteOptions {
  hueName?: string;
  hues?: string[];
  index?: number;
  shade?: number;
  steps?: number;
  tint?: number;
}

/**
 * Computes color palette based on a single color.
 * @param color Input color.
 * @param options Options.
 * @param options.hueName Returns only specific hue values.
 * @param options.hues Custom array of hue names.
 * @param options.index Returns specific color, starts at 0.
 * @param options.shade Modifier of dark colors.
 * @param options.steps Number of steps.
 * @param options.tint Modifier of light colors.
 */

export function palette(
  color: string,
  {
    hueName: hueNameOption,
    hues = colorHues,
    index,
    shade = 1,
    steps = 10,
    tint = 1,
  }: IPaletteOptions = {}
): Palette | Monochrome | string {
  let palette: Palette = {};

  // Properties
  const hue = Color(color).hue();
  const saturation = Color(color).saturationl();
  const lightness = Color(color).lightness();

  // Desaturate
  [{ key: 'black', value: 'black' }, { key: 'gray', value: true }].forEach(
    ({ key, value }) => {
      palette = {
        ...palette,
        [key]: monochrome(Color(color).hex(), {
          desaturate: value as boolean | 'black',
          index,
          shade,
          steps,
          tint,
        }),
      };
    }
  );

  // Hues
  for (let n: number = 1; n <= hues.length; n++) {
    const base = Color(
      `hsl(${n * (360 / hues.length) + hue}, ${saturation}%, ${lightness}%)`
    ).hex();
    palette = {
      ...palette,
      [hueName(base)]: monochrome(base, {
        desaturate: false,
        index,
        shade,
        steps,
        tint,
      }),
    };
  }

  // Hue
  if (hueNameOption) {
    return palette[hueNameOption];
  }

  return palette;
}

type Spectrum = number | string;

interface ISpectrumOptions {
  chars?: 'alpha' | 'num' | Spectrum[];
  saturation?: number;
  lightness?: number;
}

/**
 * Returns color of value accoring to its position in character list.
 * @param value Searched value in character list.
 * @param options Options.
 * @param options.chars Array of characters, can be `'alpha'` or `'num'` preset.
 * @param options.saturation Color saturation.
 * @param options.lightness Color lightness.
 */

export function spectrum(
  value: Spectrum | Spectrum[],
  { chars = 'alpha', saturation = 100, lightness = 50 }: ISpectrumOptions = {}
): string {
  value = Array.isArray(value) ? value : [value];
  if (chars === 'alpha') chars = 'abcdefghijklmnopqrstuvwxyz'.split('');
  if (chars === 'num') chars = '0123456789'.split('');
  chars = chars.map(char => char.toString().toLowerCase());
  let color: Color = Color(
    `hsl(${(360 / chars.length) *
      chars.indexOf(
        value[0].toString().toLowerCase()
      )}, ${saturation}%, ${lightness}%)`
  );
  value.slice(1).forEach(char => {
    color = color.mix(
      Color(
        `hsl(${(360 / chars.length) *
          chars.indexOf(
            char.toString().toLowerCase()
          )}, ${saturation}%, ${lightness}%)`
      )
    );
  });
  return color.hex();
}
