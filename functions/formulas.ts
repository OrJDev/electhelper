import formulas from "../constants/formulas"
import { IForms } from "../types/formulas"
import { IOptionalFields } from "../types/Values";

export const getFormulas = (valuesIHave: any[]): IForms[] =>
    formulas.filter(e => e.requirements.map(item => item.toLowerCase())
        .every(e => valuesIHave.indexOf(e) !== -1));
export function getFormula(formula: string, variables: Partial<IOptionalFields>):
    [string, string[]] {
    let ways: any[] = []
    return [formula.split(' ').reduce((acc, curr) => {
        if (curr.startsWith('::var') && !curr.includes(':act') && !curr.endsWith('@')) {
            let variable = curr.split('|')[1];
            let value = variables[variable.toLowerCase() as keyof typeof variables]
            ways.push(`${variable} = ${value}`)
            return acc + ` ${value}`;
        }
        return acc + ` ${curr}`;
    }, ''), ways];
}

export const formatFormula = (formula: string) => {
    return formula.replaceAll('::var|', ''
    ).replaceAll('Math.sqrt(', '√(')
        .replaceAll(':act::', '').
        replaceAll('&', '').replaceAll('@', '')
}
export function getUnits(type: any) {
    switch (type.substring(0, 1).toLowerCase()) {
        case 'i':
            return 'Ampere (A)';
        case 'u':
            return 'Volt (V)';
        case 'p':
            return 'Watt (W)';
        case 'r':
            return 'Ohm (Ω)';
    }
}