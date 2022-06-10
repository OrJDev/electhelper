export type ICurrents = 'I1' | 'I2';
export type IResistor = {
    includeCurrents: ICurrents[];
    value: number;
    name: string;
}
export type IFlows = 'left' | 'right'
export type IVoltage = {
    name: string;
    value: number;
    resisted: boolean
}
export const Currents: ICurrents[] = ['I1', 'I2'];

export type IFirstSecond = {
    first: {
        resistors: IResistor[];
        voltage: IVoltage[];
        formula: string;
        equator: string;
    };
    second: {
        resistors: IResistor[];
        voltage: IVoltage[];
        formula: string;
        equator: string;
    };
}
export type IFirstSecondKeys = keyof IFirstSecond;
export const defaultFirstSecond: IFirstSecond = {
    first: {
        resistors: [],
        voltage: [],
        formula: '',
        equator: '',
    },
    second: {
        resistors: [],
        voltage: [],
        formula: '',
        equator: '',
    }
}

export type IMapping = {
    key: IFlows;
    source: any;
}

export const ItemsToMap: IMapping[] = [
    {
        key: 'left',
        source: require('../assets/images/current-flow-1.png')
    },
    {
        key: 'right',
        source: require('../assets/images/current-flow-2.png')
    }
]

