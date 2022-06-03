export type IKeyA<T> = T extends Array<infer U> ? U : never;
export type ConvertToMap<T extends string | number | symbol, N extends any, F extends boolean = false> =
    F extends false ? {
        [key in T]: N;
    } : {
        [key in T]?: N;
    }

