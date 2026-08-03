declare module "opencc-js" {
  type ConverterOptions = {
    from: string;
    to: string;
  };

  export function Converter(options: ConverterOptions): (text: string) => string;
}
