import { IGlobalState } from "./IGlobalState";

export interface IGlobalProps{
    setGlobalState: (state: IGlobalState) => void,
    getGlobalState: () => IGlobalState
}
