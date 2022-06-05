import { defaultValues, transValues } from "../constants/stateValues";
import { ConvertToMap, IKeyA } from "./Static";
export type IPossibleTypes = IKeyA<['transistor', 'solver']>;


export type ITransistorKeys = keyof typeof transValues;
export type ITransistor = ConvertToMap<ITransistorKeys, number>

export type IValuesKeys = keyof typeof defaultValues;
export type IValues = ConvertToMap<IValuesKeys, number>;

export type IOptionalKeys = ITransistorKeys | IValuesKeys;
export type IOptionalFields = ITransistor | IValues;