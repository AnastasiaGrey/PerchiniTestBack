export interface CreateTest{
    name:string,
    manager_id:string,
    question:{
        question:string,
        variants:{
            variant:string,
            status:string,
        }[]
    }[]
}

