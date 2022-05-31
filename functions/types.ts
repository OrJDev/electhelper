import { ITransistor, IValues } from "../types/Values";
import { defaultValues, transValues } from "../constants/stateValues";

export const isTransistor = (type: any, b?: boolean): type is ITransistor => {
    return b ? transValues.indexOf(type) !== -1 : type === 'transistor';
}
export const isValue = (type: any, b?: boolean): type is IValues => {
    return b ? defaultValues.indexOf(type) !== -1 : type === 'default';
}