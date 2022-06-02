import { IOptionalFields } from "../types/Values";
import { getFormula } from "./formulas";
import algebra from 'algebra.js';
import { IFormType } from "../types/Formulas";

export type ISolverResults = [number, string, any[]];
export function solveSolver(formula: string, variables: Partial<IOptionalFields>): ISolverResults {
    let [newFormula, ways] = getFormula(formula, variables);
    let results = eval(newFormula);
    if (results.toString().indexOf('.') !== -1) {
        results = results.toFixed(2);
    }
    return [results, newFormula, ways];
}

export function solveTransistor(formula: string, variables: Partial<IOptionalFields>): ISolverResults {
    let [newFormula, ways] = getFormula(formula, variables);
    let sFor = getSFor(newFormula)
    if (!sFor) return solveSolver(formula, variables)
    type IKey = keyof typeof variables
    let myEquator = newFormula.split(' = ').shift()?.replaceAll(' ', '').split('::var|').pop();
    var myExp = new algebra.Expression(sFor.toLowerCase())
    let myElement = newFormula.split(' ');
    let fixedFormula = `${myEquator} = `
    for (let i = 0; i < myElement.length; i++) {
        let current = myElement[i]
        if (current.includes(':act::')) {
            let { varName, action } = getNode(current)!;
            varName = varName.split('::var|').pop()!;
            if (current.endsWith('@')) {
                let fixedVarName = shiftVarName(varName);
                let currentVar = parseFloat(variables[fixedVarName?.toLowerCase() as IKey] ?? '0');
                ways.push(`${fixedVarName} = ${currentVar}`)
                if (action === '+' &&
                    getNode(myElement[i + 1])?.action !== '*'
                ) {
                    myExp = myExp.add(currentVar)
                    fixedFormula += ` + ${currentVar} `
                } else if (action === '*') {
                    let prevNode = getNode(myElement[i - 1]);
                    let prevValue =
                        variables[prevNode?.
                            varName.split('::var|')[1].split('@').shift()?.toLowerCase() as IKey];
                    if (!isNaN(prevValue)) {
                        myExp = myExp.add(prevValue * currentVar)
                        fixedFormula += ` ${prevValue} * ${currentVar}`
                    }
                }
            } else {
                let currentVar = parseFloat(myElement[i - 1] ?? '0')
                if (action === '*') {
                    myExp = myExp.multiply(currentVar)
                    fixedFormula += ` ${sFor} * ${currentVar} `
                }
            }
        }
    }
    var equation = new algebra.Equation(myExp,
        parseFloat(myEquator ?? '0')
    )
    ways.push(equation.toString())
    let results = getResults(equation.solveFor(sFor.toLowerCase()))
    return [results, fixedFormula, ways];
}

export function solveForm(formula: string, variables: Partial<IOptionalFields>, solverType: IFormType):
    ISolverResults {
    switch (solverType) {
        case 'compare':
            return solveTransistor(formula, variables);
        case 'solve':
            return solveSolver(formula, variables);
    }
}

function getResults(r?: any) {
    let results: any = 0;
    if (r && 'denom' in r) {
        results = r.numer / r.denom;
        if (results.toString().indexOf('.') !== -1) {
            results = results.toFixed(2)
        }
    } else {
        results = parseFloat(r.toString())
    }
    return results;
}
export type INode = {
    action: '+' | '*',
    varName: string;
    isSFor: boolean;
}
function getNode(act: string): INode | undefined {
    if (act) {
        let splitter = act.split(':act::')
        let [action, varName] = splitter[1].split('&')
        let isSFor = !varName.endsWith('@');
        return {
            varName,
            action: action as any,
            isSFor
        }
    }
    return undefined;
}
const shiftVarName = (varName: string | undefined) => varName ?
    varName.split('@').shift() : undefined;
function getSFor(formula: string): string | null {
    let elements = formula.split(' ');
    for (let i = 0; i < elements.length; i++) {
        let current = elements[i]
        if (current.includes(':act::')) {
            let f = current.split(':act::').
                filter(e => (e.includes('&') ||
                    e.includes('::var')) &&
                    !e.endsWith('@'))
            if ((f?.length < 0)) {
                continue;
            } else {
                let r = f.pop()
                if (r?.includes('::var')) {
                    r = r.split('::var').pop();
                } else {
                    r = r?.split('&').pop()
                }
                return r ?? null;
            }
        }
    }
    return null;
}
function getSVar(sFor: string) {
    let sVar = '';
    let rest = sFor.substring(1)
    if (sFor.startsWith('i')) {
        sVar = 'r' + rest;
    } else {
        sVar = 'i' + rest;
    }
    return sVar;
}