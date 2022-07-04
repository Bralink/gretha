import { IGlobalState } from "../interfaces/context/IGlobalState";

type globalAction = { type: 'setGlobalState', payload: IGlobalState };

export const GlobalReducer = (state: IGlobalState, action: globalAction): IGlobalState => {
    switch(action.type){
        case 'setGlobalState':
            return action.payload;
        default:
            return state;
    }
}