const symbols: string = '<>"\';(){}[]|\\`&$*?~^%!@#+=';

export const validateChars = (input: string) => symbols.split('').some(s => input.includes(s));