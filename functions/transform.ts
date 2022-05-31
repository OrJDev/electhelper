export const string = (str: string) => str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
export const number = (num: number) => isNaN(num) ? 0 : num;
export const numericValue = (num: number, max?: number, done?: boolean) => {
    let newNum = num;
    if (max !== undefined) {
        newNum = parseFloat(newNum.toString().substring(0, max));
    }
    newNum = number(newNum);
    return done ? newNum.toFixed(2) : newNum;
}

export const dots = (str: any, limit: number, isNan: boolean = true) => isNan ? str.length >
    limit ?
    number(str.substring(0, limit)) + '...' :
    number(str) : str;