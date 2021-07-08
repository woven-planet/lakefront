/**
 * Utility function which pluralizes a word given a number.
 */
export const pluralize = (word: string, num: number) => (num === 1 ? word : `${word}s`);
