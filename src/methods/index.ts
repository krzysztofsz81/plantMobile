import debounce from 'lodash/debounce';

export const debounceFunction = debounce((fn: () => void) => fn(), 250);
export const mapToRange = (value: number, x1: number, y1: number, x2: number, y2: number): number =>
  ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
