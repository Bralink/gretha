export default class Quest{
    public id: number = 0;
    public name: string = "";
    public questions: number = 0;  
    public user_answers: number = 0;
    public created:  Date = new Date();
    public modified: Date = new Date();  
    public published: number = 0;
    public published_text: "Publicada" | "No Publicada" = "No Publicada";
    public from: Date | null = new Date();
    public to: Date | null = new Date();
}

export class Question{
    public id: number = 0;
    public evaluation: number = 0;
    public question: string = "";
    public type: 'Respuesta Multiple' | 'Respuesta Abierta ' | 'Opción Multiple'  = 'Opción Multiple';
    public type_value: {id: any, text: string} = {id: 0, text: ""};
    public answers: Array<Answer> = [];
    public haveCorrectAnswer: boolean = false;
}

export class Answer{
    public id:number = 0;
    public evaluation: number = 0;
    public question: number = 0;
    public answer: string = "";
    public is_correct: number = 0;
}

export class UserAnswer{
    public evaluation: number = 0;
    public question: number = 0;
    public answer: number = 0;
    public answer_text: string = "";
}