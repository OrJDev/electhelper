export type IForms = {
    requirements: string[],
    formulas: {
        [key: string]: string
    },
    type: IFormType;
    category: ICategory;
}


export type IFormType = 'compare' | 'solve';
export type ICategory = 'transistor' | 'default';