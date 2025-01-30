
export type Recipe = {
    id?: number,
    title: string,
    description: string,
    ingredients?:string[],
    instructions: string,
    authorId?:number
}
export  const emptyRecipe = {
    id: 0,
    title: '',
    description: '',
    ingredients: [''],
    instructions: '',
    authorId:0

}


export type Fields = {
    title: string,
    description: string,
    // ingredients:string[],
    instructions: string,
}