import { createContext ,useState} from "react";

export let userContext = createContext();


export default function UserContextProvider(props){
    let [userToken , setUserToken]= useState(null)
    let [search , setSearch]= useState(null)
    return  <userContext.Provider value={{search , setSearch , userToken , setUserToken}}>
    {props.children}
    
    </userContext.Provider>
    
}
