import React from "react";
import forms from "../constants/formulas";
import { transValues } from "../constants/stateValues";
import { ICategory, IForms } from "../types/Formulas";
import { IOptionalFields, IOptionalKeys, IPossibleTypes, ITransistor, IValues } from "../types/Values";

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

export const requirementsValues = (formulas: IForms[]): any => {
    let currentValues: any = {};
    for (const element of formulas) {
        for (const requirement of
            element.requirements.
                filter(e => currentValues[e] === undefined)) {
            currentValues[requirement.toLowerCase()] = NaN;
        }
    }
    return currentValues;
}

export const filterdValues = (wantedKeys: string[], f?: IForms[], b?: boolean): IForms[] | any[] => {
    let newResults: IForms[] = []
    let formulasFound: any[] = []
    for (const element of f ? f : forms) {
        let temp: any = {}
        let keys = b ? Object.keys(element.formulas) : Object.keys(element.formulas).
            filter(e => wantedKeys.indexOf(e) !== -1);
        if (keys.length === 0) continue;
        keys.forEach(key => {
            temp[key] = element.formulas[key]
            formulasFound.push(key)
        })
        newResults.push({ ...element, formulas: temp })

    }
    if (b) {
        let current: any = []
        formulasFound.forEach(e => {
            if (current.indexOf(e) === -1) current.push(e)
        })
        formulasFound = current;
    }
    return b ? formulasFound : newResults;
}

export const getFilteredAndKeys = (wantedKeys: IOptionalKeys[], form?: IForms[]): [IForms[], any] => {
    let results = filterdValues(wantedKeys.map(e => e.toLowerCase()), form);
    let requirements = requirementsValues(results)
    return [results, requirements]
}

