import { createContext , useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    user : null,
    isAthenticated : false
}

const authReducer = (state , action) => {
    switch(action.type) {
        case "login":
            return {
                user : action.payload,
                isAthenticated : true
            }
        case "logout": 
        return {
            user : null,
            isAthenticated : false
        }
        default : throw new Error("unknown type!!!")
    }
}



const AuthProvider = ({children}) => {

    const login = ({name , email , password}) => {
        if(name && email && password){
            dispatch({type : "login" , payload : {name , email , password}})
        }
    }

    const logout = () => {
        dispatch({type:"logout"})
    }

    const [{user , isAthenticated},dispatch] = useReducer(authReducer,initialState);
    return (<AuthContext.Provider value={{user , isAthenticated , login , logout}}>{children}</AuthContext.Provider>);
}
 
export default AuthProvider;

export const useAuth = () => useContext(AuthContext);