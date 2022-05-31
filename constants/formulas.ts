import { IForms } from "../types/Formulas";

const forms: IForms[] = [
    {
        requirements: ["I", "U"],
        formulas: {
            r: '::var|U / ::var|I',
            p: '::var|U * ::var|I',
        }
    },
    {
        requirements: ["I", "R"],
        formulas: {
            u: '::var|I * ::var|R',
            p: '::var|I * ::var|I * ::var|R'
        }
    },
    {
        requirements: ["I", "P"],
        formulas: {
            r: '::var|P / ( ::var|I * ::var|I )',
            u: '::var|P  / ::var|I'
        }
    },
    {
        requirements: ["U", "P"],
        formulas: {
            i: "::var|P / ::var|U",
            r: "::var|U * ::var|U / ::var|P"
        }
    },
    {
        requirements: ["U", "R"],
        formulas: {
            i: "::var|U / ::var|R",
            p: '::var|U * ::var|U / ::var|R'
        }
    },
    {
        requirements: ["R", "P"],
        formulas: {
            i: "Math.sqrt( ::var|P / ::var|R )",
            u: "Math.sqrt( ::var|P  * ::var|R )"
        }
    },
    {
        requirements: ["Ib", "Ic"],
        formulas: {
            ie: '::var|IB + ::var|IC'
        }
    },
    {
        requirements: ["Ic", "B"],
        formulas: {
            ib: "::var|IC / ::var|B",
            ie: "1 / ::var|B * ::var|IC + 1 * ::var|IC"
        }
    },
    {
        requirements: ["Ib", "B"],
        formulas: {
            ic: "::var|IB * ::var|B",
        }
    }
]

export default forms;