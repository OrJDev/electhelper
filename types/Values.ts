import { ConvertToMap, IKeyA } from "./Static";
export type IPossibleTypes = IKeyA<['transistor', 'solver']>;

export type ITransistorKeys = IKeyA<['vcc', 'b', 'rb', 'ib', 'rc', 'ic', 're', 'ie', 'vce', 'vbe']>
export type ITransistor = ConvertToMap<ITransistorKeys, number>

export type IValuesKeys = IKeyA<['u', 'r', 'i', 'p']>;
export type IValues = ConvertToMap<IValuesKeys, number>;

export type IOptionalKeys = ITransistorKeys | IValuesKeys;
export type IOptionalFields = ITransistor | IValues;