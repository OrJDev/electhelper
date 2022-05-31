import { IForms } from "../types/Formulas";

const forms: IForms[] = [
    {
        requirements: ["I", "U"],
        formulas: {
            r: 'U / I',
            p: 'U * I',
        }
    },
    {
        requirements: ["I", "R"],
        formulas: {
            u: 'I * R',
            p: 'I * I * R'
        }
    },
    {
        requirements: ["I", "P"],
        formulas: {
            r: 'P / ( I * I)',
            u: 'P / I'
        }
    },
    {
        requirements: ["U", "P"],
        formulas: {
            i: "P / U",
            r: "U * U / P"
        }
    },
    {
        requirements: ["U", "R"],
        formulas: {
            i: "U / R",
            p: 'U * U / R'
        }
    },
    {
        requirements: ["R", "P"],
        formulas: {
            i: "√ P / R",
            u: "√ P * R"
        }
    },
    {
        requirements: ["Ib", "Ic"],
        formulas: {
            ie: 'Ib + Ic'
        }
    },
    {
        requirements: ["Ic", "B"],
        formulas: {
            ib: "Ic / b",
            ie: "1 / B * Ic + 1 * Ic"
        }
    },
    {
        requirements: ["Ib", "B"],
        formulas: {
            ic: "Ib * B",
        }
    }
]

export default forms;