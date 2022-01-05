import debounce from "lodash/debounce";

export const debounceFunction = debounce((fn: Function) => fn(), 250);

