import React from "react";
import forms from "../constants/formulas";
import { transValues } from "../constants/stateValues";
import { ICategory } from "../types/Formulas";
import { IOptionalFields, IPossibleTypes, ITransistor, IValues } from "../types/Values";

export const arrayToMap = (arr: any[]) => arr.reduce((acc, key) => {
    acc[key] = NaN;
    return acc;
}, {} as { [key: string]: number })

export const isTransistor = (type: any, b?: boolean): type is ITransistor => {
    return b ? type in transValues : type === 'transistor';
}

export const valuesIHave = (obj: IOptionalFields, keysOnly?: boolean) => {
    return keysOnly ?
        Object.keys(obj).
            filter(e => !isNaN(obj[e as keyof typeof obj]))
        :
        Object.entries(obj).reduce((acc, [key, value]) => {
            if (!isNaN(value)) acc[key] = value;
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

export const requirementsValues = (category: ICategory): { [key: string]: number } => {
    let currentValues: { [key: string]: number } = {};
    let filterCategory = forms.filter(e => e.category === category);
    for (const element of filterCategory) {
        for (const requirement of
            element.requirements.
                filter(e => currentValues[e] === undefined)) {
            currentValues[requirement.toLowerCase()] = NaN;
        }
    }
    return currentValues;
}

