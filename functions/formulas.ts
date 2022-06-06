import formulas from "../constants/formulas"
import { IForms } from "../types/formulas"
import { IOptionalFields } from "../types/Values";

export const getFormulas = (valuesIHave: any[], ignore?: boolean): IForms[] => {
    let results = formulas.filter(e => e.requirements.map(item => item.toLowerCase())
        .every(e => valuesIHave.indexOf(e) !== -1));
    if (ignore) {
        let newResults = []
        for (const element of results) {
            let temp: any = {}
            let keys = Object.keys(element.formulas).
                filter(e => valuesIHave.indexOf(e) === -1);
            if (keys.length === 0) continue;
            keys.forEach(key => temp[key] = element.formulas[key])
            newResults.push({ ...element, formulas: temp })
        }
        results = newResults;
    }
    return results;
}
export function getFormula(formula: string, variables: Partial<IOptionalFields>, includeUnits?: boolean):
    [string, string[]] {
    let ways: any[] = []
    return [formula.split(' ').reduce((acc, curr) => {
        if (curr.startsWith('::var') && !curr.includes(':act') && !curr.endsWith('@')) {
            let variable = curr.split('|')[1];
            let value = variables[variable.toLowerCase() as keyof typeof variables]
            let pusher = `${variable} = ${value} ${includeUnits ? getUnits(variable) : ''}`;
            if (!ways.includes(pusher)) {
                ways.push(pusher)
            }
            return acc + ` ${value}`;
        }
        return acc + ` ${curr}`;
    }, ''), ways];
}

export const formatFormula = (formula: string, s?: boolean) => {
    let newFormula = formula.replaceAll('::var|', '').
        replaceAll('Math.sqrt', '√')
        .replaceAll(':act::', '').
        replaceAll('&', '')
        .replaceAll('@', '')
    if (s) {
        let str = newFormula.split('').reduce((acc, curr) => {
            if (/[a-zA-Z]/.test(curr) || !isNaN(parseInt(curr))) {
                acc += curr;
            } else acc += ` ${curr} `;
            return acc;
        }, '')
        newFormula = str.replace(/\s{2,}/g, ' ');
    }
    return newFormula;
}
export function getUnits(type: any) {
    switch (type.substring(0, 1).toLowerCase()) {
        case 'i':
            return 'Ampere (A)';
        case 'u':
        case 'v':
            return 'Volt (V)';
        case 'p':
            return 'Watt (W)';
        case 'r':
            return 'Ohm (Ω)';
        default:
            return '(?)'
    }
}