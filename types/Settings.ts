import { ICategory } from "./Formulas";

export default interface ISettings {
    ignoreValues: boolean;
    includeUnits: boolean;
    holdForModal: boolean;
    useLookingFor: boolean;
    lookForValues: any[];
    dType: ICategory;
}