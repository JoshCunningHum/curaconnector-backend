export const isObjectEmpty = (obj: Object): obj is Record<string, never> => {
    return Object.keys(obj).length === 0;
};
