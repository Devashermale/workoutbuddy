const  {createContext, useReducer, useEffect} = require('react')

export const AuthContext = createContext()
export const authReducer = (state, action) =>{
    switch (action.type) {
        case 'login':
        return {user:action.payload}
 
           case 'logout':
            return{user:null}

            default:
              return state  


    }
  

}
export const AuthcontextProvider = ({children}) =>{
    const [state , dispatch] =useReducer(authReducer ,{
        user:null
    })
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({type:'login',payload:user})

        }
    },[])
    console.log('Authecontext state', state);
 
    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
} 
