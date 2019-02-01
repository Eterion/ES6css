interface IHueNameOptions {
    hues?: string[];
}
export declare function hueName(color: string, { hues }?: IHueNameOptions): string;
declare type Monochrome = string[];
interface IMonochromeOptions {
    desaturate?: boolean | 'black';
    index?: number;
    shade?: number;
    steps?: number;
    tint?: number;
}
export declare function monochrome(color: string, { desaturate, index, shade, steps, tint, }?: IMonochromeOptions): Monochrome | string;
declare type Palette = {
    [key: string]: Monochrome | string;
};
interface IPaletteOptions extends IMonochromeOptions {
    hueName?: string;
    hues?: string[];
}
export declare function palette(color: string, { desaturate, hueName: name, hues, index, shade, steps, tint, }?: IPaletteOptions): Palette | Monochrome | string;
declare type Spectrum = number | string;
interface ISpectrumOptions {
    chars?: 'alpha' | 'num' | Spectrum[];
    saturation?: number;
    lightness?: number;
}
export declare function spectrum(value: Spectrum | Spectrum[], { chars, saturation, lightness }?: ISpectrumOptions): string;
export {};
