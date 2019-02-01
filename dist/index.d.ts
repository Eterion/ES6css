interface IHueNameOptions {
    hues?: string[];
}
/**
 * Returns named hue representation of input color.
 * @param color Input color.
 * @param options Options.
 * @param options.hues Custom array of hue names.
 */
export declare function hueName(color: string, { hues }?: IHueNameOptions): string;
declare type Monochrome = string[];
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
export declare function monochrome(color: string, { desaturate, index, shade, steps, tint, }?: IMonochromeOptions): Monochrome | string;
declare type Palette = {
    [key: string]: Monochrome | string;
};
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
export declare function palette(color: string, { hueName: hueNameOption, hues, index, shade, steps, tint, }?: IPaletteOptions): Palette | Monochrome | string;
declare type Spectrum = number | string;
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
export declare function spectrum(value: Spectrum | Spectrum[], { chars, saturation, lightness }?: ISpectrumOptions): string;
export {};
