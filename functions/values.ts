import React from "react";
import { IOptionalFields, IPossibleTypes } from "../types/Values";

export const arrayToMap = (arr: any[]) => arr.reduce((acc, key) => {
    acc[key] = NaN;
    return acc;
}, {} as { [key: string]: number })
export const valuesIHave = (obj: IOptionalFields, keysOnly?: boolean) => {
    return keysOnly ?
        Object.keys(obj).filter(e => !isNaN(obj[e as keyof typeof obj]))
        :
        Object.entries(obj).reduce((acc, [key, value]) => {
            if (isNaN(value)) return acc;
            acc[key] = value;
            return acc;
        }, {} as { [key: string]: number })
}
export const getterAndSetter = (
    setter: React.Dispatch<React.SetStateAction<any>>[],
    getter: IOptionalFields[],
    type: IPossibleTypes
): [
        IOptionalFields,
        React.Dispatch<React.SetStateAction<IOptionalFields>>,
    ] => {
    switch (type) {
        case 'solver':
            return [getter[0], setter[0]];
        case 'transistor':
            return [getter[1], setter[1]];
    }
}