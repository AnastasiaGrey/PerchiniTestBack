export class CreateQuestionDto {
    manager_id: string
    test_name: string
    questions:{
        question:string,
        variants:{
            variant:string,
            status:string,
        }[]
    }[]

}
export class UpdateQuestionDto {
    id:string
    manager_id: string
    name: string
    question:{
        question:string,
        variants:{
            variant:string,
            status:string,
        }[]
    }[]

}