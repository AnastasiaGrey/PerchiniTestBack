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
