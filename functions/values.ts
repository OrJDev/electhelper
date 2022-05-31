export const transValues = ['vcc', 'b', 'rb', 'ib', 'rc', 'ic', 're', 'ie', 'vce', 'vbe']
export const defaultValues = ['u', 'r', 'i', 'p']

export const arrayToMap = (arr: any[]) => arr.reduce((acc, key) => {
    acc[key] = NaN;
    return acc;
}, {} as { [key: string]: number })