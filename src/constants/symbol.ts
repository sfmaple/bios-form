const hasSymbol = typeof Symbol === 'function' && Symbol.for;

export const BIOS_NIL = hasSymbol ? Symbol('undefined') : -0xffffff;
