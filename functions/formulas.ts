import formulas from "../constants/formulas"
import { IForms } from "../types/formulas"

export const getFormulas = (valuesIHave: any[]): IForms[] =>
    formulas.filter(e => e.requirements.map(item => item.toLowerCase())
        .every(e => valuesIHave.indexOf(e) !== -1));
