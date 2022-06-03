export type IForms = {
    requirements: string[],
    formulas: {
        [key: string]: string
    },
    type: IFormType;
}


export type IFormType = 'compare' | 'solve';
