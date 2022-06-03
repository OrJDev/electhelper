import { IForms } from "../types/Formulas";

/**
 * i know that this file may be confusing but in order to improve
 * my  solver function it needs to be set like that
 */
const forms: IForms[] = [
    {
        requirements: ["I", "U"],
        formulas: {
            r: '::var|U / ::var|I',
            p: '::var|U * ::var|I',
        },
        type: 'solve'
    },
    {
        requirements: ["I", "R"],
        formulas: {
            u: '::var|I * ::var|R',
            p: '::var|I * ::var|I * ::var|R'
        },
        type: 'solve'
    },
    {
        requirements: ["I", "P"],
        formulas: {
            r: '::var|P / ( ::var|I * ::var|I )',
            u: '::var|P  / ::var|I'
        },
        type: 'solve'
    },
    {
        requirements: ["U", "P"],
        formulas: {
            i: "::var|P / ::var|U",
            r: "::var|U * ::var|U / ::var|P"
        },
        type: 'solve'
    },
    {
        requirements: ["U", "R"],
        formulas: {
            i: "::var|U / ::var|R",
            p: '::var|U * ::var|U / ::var|R'
        },
        type: 'solve'
    },
    {
        requirements: ["R", "P"],
        formulas: {
            i: "Math.sqrt( ::var|P / ::var|R )",
            u: "Math.sqrt( ::var|P  * ::var|R )"
        },
        type: 'solve'
    },
    {
        requirements: ["Ib", "Ic"],
        formulas: {
            ie: '::var|IB + ::var|IC'
        },
        type: 'solve'
    },
    {
        requirements: ["Ic", "B"],
        formulas: {
            ib: "::var|IC / ::var|B",
            ie: "1 / ::var|B * ::var|IC + 1 * ::var|IC"
        },
        type: 'solve'
    },
    {
        requirements: ["Ib", "B"],
        formulas: {
            ic: "::var|IB * ::var|B",
        },
        type: 'solve'
    },
    {
        requirements: ["vcc", 'vbe', 'ib'],
        formulas: {
            "rb": "::var|VCC = ::var|IB :act::*&RB  :act::+&::var|VBE@",
        },
        type: 'compare'
    },
    {
        requirements: ["vcc", 'vbe', 'ib', 're', 'ie'],
        formulas: {
            "rb": "::var|VCC = ::var|IB :act::*&RB  :act::+&::var|VBE@ :act::+&::var|RE@ :act::*&::var|IE@",
        },
        type: 'compare'
    },
    {
        requirements: ["vcc", 'vbe', 'rb'],
        formulas: {
            "ib": "::var|VCC = ::var|RB :act::*&IB  :act::+&::var|VBE@",
        },
        type: 'compare'
    },
    {
        requirements: ["vcc", 'vbe', 'rb', 're', 'ie'],
        formulas: {
            "ib": "::var|VCC = ::var|RB :act::*&IB  :act::+&::var|VBE@ :act::+&::var|RE@ :act::*&::var|IE@",
        },
        type: 'compare'
    },
    {
        requirements: ["vcc", 'vce', 'ic'],
        formulas: {
            "rc": "::var|VCC = ::var|IC :act::*&RC  :act::+&::var|VCE@",
        },
        type: 'compare'
    },
    {
        requirements: ["vcc", 'vce', 'ic', 're', 'ie'],
        formulas: {
            "rc": "::var|VCC = ::var|IC :act::*&RC  :act::+&::var|VCE@ :act::+&::var|RE@ :act::*&::var|IE@",
        },
        type: 'compare'
    },
    {
        requirements: ["vcc", 'vce', 'rc'],
        formulas: {
            "ic": "::var|VCC = ::var|RC :act::*&IC  :act::+&::var|VCE@",
        },
        type: 'compare'
    },
    {
        requirements: ["vcc", 'vce', 'rc', 're', 'ie'],
        formulas: {
            "ic": "::var|VCC = ::var|RC :act::*&IC  :act::+&::var|VCE@ :act::+&::var|RE@ :act::*&::var|IE@",
        },
        type: 'compare'
    },
    {
        requirements: ['re', 'hfe', 'hie'],
        formulas: {
            "ri": "::var|HIE + ( 1 + ::var|HFE ) * ::var|RE"
        },
        type: 'solve'
    },
    {
        requirements: ['rl', 'rc'],
        formulas: {
            'rlt': "( ::var|RL * ::var|RC ) / ( ::var|RL + ::var|RC )"
        },
        type: 'solve'
    },
    {
        requirements: ['hfe', 'rlt', 'ri'],
        formulas: {
            'av': '-1 * ( ( ::var|HFE * ::var|RLT ) / ::var|RI )'
        },
        type: 'solve'
    },
    {
        requirements: ['hfe', 'rlt', 'hie'],
        formulas: {
            'av': '-1 * ( ( ::var|HFE * ::var|RLT ) / ::var|HIE )'
        },
        type: 'solve'
    }
]

export default forms;