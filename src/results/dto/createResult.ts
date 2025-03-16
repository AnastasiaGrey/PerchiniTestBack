export class CreateResultDto {
    test_id: string;
    start_time: Date;
    end_time: Date;
    employee_id: string;
    answers:{
        question_id: string;
        answer_id: string;
    }[]
}