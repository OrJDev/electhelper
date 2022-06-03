export type INode = {
    action: '+' | '*',
    varName: string;
    isSFor: boolean;
}
export type IWays = {
    f: string,
    myMap?: any;
}