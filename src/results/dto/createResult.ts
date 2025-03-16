export class CreateResultDto {
    test_id: string;
    user_id: string;
    answers:{
        question_id: string;
        answer: string;
    }[]
}