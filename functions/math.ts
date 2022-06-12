import { IOptionalFields } from "../types/Values";
import { getFormula, getUnits } from "./formulas";
import algebra from 'algebra.js';
import { IFormType } from "../types/Formulas";
import { INode } from "../types/Math";

export type ISolverResults = [number, string, any[]];

export function solveSolver(formula: string, variables: Partial<IOptionalFields>, includeUnits?: boolean): ISolverResults {
    let [newFormula, ways] = getFormula(formula, variables, includeUnits);
    let results = eval(newFormula);
    if (results.toString().indexOf('.') !== -1) {
        results = results.toFixed(2);
    }
    return [results, newFormula, ways];
}

export function solveTransistor(formula: string, variables: Partial<IOptionalFields>, includeUnits?: boolean): ISolverResults {
    let [newFormula, ways] = getFormula(formula, variables, includeUnits);
    let sFor = getSFor(newFormula)
    if (!sFor) return solveSolver(formula, variables)
    type IKey = keyof typeof variables
    let myEquator = newFormula.split(' = ').shift()?.replaceAll(' ', '').split('::var|').pop();
    var myExp = new algebra.Expression(sFor.toLowerCase());
    let myElement = newFormula.split(' ');
    for (let i = 0; i < myElement.length; i++) {
        let current = myElement[i]
        if (current.includes(':act::')) {
            let { varName, action } = getNode(current)!;
            varName = varName.split('::var|').pop()!;
            if (current.endsWith('@')) {
                let fixedVarName = shiftVarName(varName);
                let currentVar = parseFloat(variables[fixedVarName?.toLowerCase() as IKey] ?? '0');
                let pusher = `${fixedVarName} = ${currentVar} ${includeUnits ? getUnits(fixedVarName) : ''}`
                if (!ways.includes(pusher)) {
                    ways.push(pusher)
                }
                if (action === '+' &&
                    getNode(myElement[i + 1])?.
                        action !== '*'
                ) {
                    myExp = myExp.add(currentVar.toString())
                } else if (action === '*') {
                    let prevNode = getNode(myElement[i - 1]);
                    let prevValue = variables[fixVarName(prevNode?.varName) as IKey];
                    if (!isNaN(prevValue)) {
                        myExp = myExp.add((prevValue * currentVar).toString())
                    }
                }
            } else {
                let currentVar = parseFloat(myElement[i - 1] ?? '0')
                if (action === '*') {
                    myExp = myExp.multiply(currentVar.toString())
                }
            }
        }
    }
    var equation = myEquator?.indexOf('.') !== -1 ?
        undefined
        :
        new algebra.Equation(myExp, parseFloat(myEquator ?? '0'));
    var eq = myEquator?.indexOf('.') !== -1 ? `${myExp.toString()} = ${myEquator}`
        :
        equation?.toString() ?? ``;
    let [results, form] = getResults(equation?.solveFor(sFor.toLowerCase()), eq, sFor)
    return [results, form, ways];
}


export function solveForm(formula: string,
    variables: Partial<IOptionalFields>,
    solverType: IFormType,
    includeUnits?: boolean):
    ISolverResults {
    switch (solverType) {
        case 'compare':
            return solveTransistor(formula, variables, includeUnits);
        case 'solve':
            return solveSolver(formula, variables, includeUnits);
    }
}

function getResults(r?: any, s?: any, sFor?: string): [number, string] {
    let results: any = 0;
    var form = r ? r.toString() : s;
    if (!r && s && sFor) {
        let arr = s.split('=')
        let [newForm, count] = getNewForm(arr.shift().split(' '), sFor, arr.pop());
        if (s.startsWith(sFor.toLowerCase())) {
            let splitter = s.replace(sFor.toLowerCase(), '').split(' ')
            splitter[0] += sFor;
            form = splitter.join(' ')
        }
        let var1 = parseFloat(eval(newForm));
        results = (var1 / count).toFixed(2)
    } else {
        if (r && ('denom' in r && 'numer' in r)) {
            results = r.numer / r.denom;
        } else {
            results = parseFloat(r?.toString() ?? '0')
        }
        if (results.toString().indexOf('.') !== -1) {
            results = results.toFixed(2)
        }
    }
    return [results, form];
}

function getNewForm(f: any[], sFor: string, equator: any): [string, number] {
    let newForm = ` ${equator} `;
    let count = 0;
    while (f.length > 0) {
        let element = f.shift();
        if (!element) {
            continue;
        } else {
            element = element.toLowerCase();
            sFor = sFor.toLowerCase()
            if (element.includes(sFor)) {
                let splitter = element.split(sFor.toLowerCase());
                count = parseFloat(element.endsWith(sFor) ? splitter.shift() : splitter.pop());
            } else {
                if (element.includes('+')) {
                    element = element.replace('+', '-')
                } else if (element.includes('-')) {
                    element = element.replace('-', '+')
                }
                newForm += ` ${element}`;
            }
        }
    }
    return [newForm, count];
}

function getNode(act: string): INode | undefined {
    if (!act || !act.includes(':act::')) return undefined;
    let splitter = act.split(':act::')
    let [action, varName] = splitter[1].split('&')
    let isSFor = !varName.endsWith('@');
    return {
        varName,
        action: action as any,
        isSFor
    }
}
const shiftVarName = (varName: string | undefined) => varName ? varName.split('@').shift() : undefined;
const fixVarName = (varName: string | undefined) => varName ?
    varName.split('::var|')[1].split('@').shift()?.toLowerCase() :
    undefined
function getSFor(formula: string): string | null {
    let elements = formula.split(' ');
    let sFor = null;
    while (sFor === null && elements.length > 0) {
        let current = elements.shift();
        if (!current || !(current?.includes(':act:'))) {
            continue;
        } else {
            let splitter = current.split(':act::').
                filter(e => (e.includes('&') ||
                    e.includes('::var')) &&
                    !e.endsWith('@'))
            if (splitter.length <= 0) {
                continue;
            } else {
                let temp = splitter.pop();
                if (temp?.includes('::var')) {
                    temp = temp.split('::var').pop()
                } else if (temp?.includes('&')) {
                    temp = temp.split('&').pop()
                } else {
                    continue;
                }
                sFor = temp ?? null;
            }
        }
    }
    return sFor;
}

// a = x of the first
// b = y of the first
// m = eq of the second

// c = x of the second
// d = y of the second
// n = eq of the second


export function solveTwoUnknowns(a: number, b: number, m: number, c: number, d: number, n: number) {
    let alpha = (b * c - a * d);
    let x = ((n * b - m * d) / alpha)
    let y = ((m * c - n * a) / alpha)
    if (x.toString().indexOf('.') !== -1) {
        x = x.toFixed(2) as any
    }
    if (y.toString().indexOf('.') !== -1) {
        y = y.toFixed(2) as any
    }
    return { x, y }
}

