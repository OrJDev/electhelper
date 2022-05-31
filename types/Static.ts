export type IKeyA<T> = T extends Array<infer U> ? U : never;
export type ConvertToMap<T extends string | number | symbol, N extends any> = {
    [key in T]: N;
}

