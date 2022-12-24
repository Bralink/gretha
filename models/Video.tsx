export default class Video{
    public id: number = 0;
    public name: string = "";
    public url_video: string = "";
    public description: string = '';
    public active: 1 | 0 = 1;
    public date: string = "";
    public evaluation_id : number = 0;
    public sections: Array<SectionVideo> = [];
    public modulo: string = "";
    public part: number = 0;
    public is_answered: 0 | 1 | 2 |3 = 0;
} 

export class SectionVideo{ 
    public id: number = 0;
    public topic: string = "";
    public video: number = 0;
    public minute: number = 0; 
    public second: number = 0;
}

export class UserSeen{
    public seen_video: 1 | 0 = 0;
    public time_seen: number = 0;
    public video: number = 0;
}