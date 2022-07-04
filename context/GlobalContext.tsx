import React, { createContext, useContext, useEffect, useReducer } from "react";
import useStorage from "../helpers/useStorage/useStorage";
import { IGlobalProps } from "../interfaces/context/IGlobalProps";
import { IGlobalState } from "../interfaces/context/IGlobalState";
import { GlobalReducer } from "./GlobalReducer";


export const GlobalContext = createContext( {} as IGlobalProps);
export const GlobalInitialState: IGlobalState = {
    token: "",
    username: "",
    permissions: [],
}

export const GlobalProvider = ({children} : any) => {
    let {setItem, getItem} = useStorage();

    const [ GlobalState, dispatch ] = useReducer(GlobalReducer, GlobalInitialState);

    const setGlobalState = ( state: IGlobalState, rewrite: boolean = true ) => {
        dispatch({ type: 'setGlobalState', payload: state});
        if(rewrite){
            setItem("globalState",JSON.stringify(state));
        }
    }

    const getGlobalState = (): IGlobalState => {
        let globalState: IGlobalState = GlobalState;
        if(GlobalState.username.trim() === ''){
            let jsonGlobalState = getItem("globalState");
            
            if(jsonGlobalState !== "" && jsonGlobalState !== undefined){
                globalState = JSON.parse(jsonGlobalState);
                setGlobalState( globalState, false);
            }
            
        }
        return globalState;
    }

    const getUserData = () => {
        let sessionString: string = getItem("globalState") || '';
        let objectSession: any = {
            token: "",
            username: "",
            role: "",
            permissions: []
        };
        if(sessionString !== "" && sessionString !== "{}"){
            objectSession = JSON.parse(sessionString);
        }
        return objectSession;
    }
  
    return (
        <GlobalContext.Provider
            value={{
                setGlobalState: setGlobalState,
                getGlobalState: getGlobalState
            }}
            > 

            { children }      
        </GlobalContext.Provider>
    );
}