
import {useContext , createContext } from "react";


export const RefreshContext = createContext({
    isFresh :false,
    isRender:false,
    isRenderFunction :()=>{},
    isFreshFunction :()=>{},
})

export const RefreshProvider = RefreshContext.Provider;

export default function useFresh(){
    return useContext(RefreshContext)
}