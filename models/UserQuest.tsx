export default class UserQuest{
    public id: number = 0;
    public video_evaluation: number = 0;
    public seen_video: 1 | 0 =  0;
    public time_seen: number = 0; //el tiempo que se invoca es en segundos, no en minutos , para mayor control de la reproduccion
    public user: number = 0;
    public answers: Array<UserAnswer> = [];
}

export class UserAnswer{
    public id: number = 0;
    public evaluation: number = 0;
    public question: number = 0;
    public answer: number = 0;
    public answer_text: string = "";
}