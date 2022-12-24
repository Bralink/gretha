import { APITypes }  from "plyr-react";

export default class PlyrModel implements APITypes{
    public plyr: any = {
        currentTime: 0,
        isPlayed: false,
        isAfterMiddle: false,
        isEmbed: false,
        playing: false,
        paused: true,
        seeking: false,
        duration: 0
    }
}