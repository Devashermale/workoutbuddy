import { useState } from "react";
import {useAuthContext} from "../hooks/useAuthContext"
export const useSignup = ()=>{
    const [error , seterror] = useState(null)
    const [isloading , setisloading] = useState(null)
     const { dispatch} = useAuthContext()
    const Signup = async (email ,password) => {
        setisloading(true)
        seterror(null)
    const response = await fetch('http://localhost:3000/api/user/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email , password})
    })
   const json = await response.json()
    if(!response.ok){
        setisloading(false)
        seterror(json.error)
    }
    if(response.ok){
        const json = await response.json()
        localStorage.setItem('user',JSON.stringify(json))
   
        dispatch({type:'LOGIN', payload:json})
        setisloading(false)
    }
    }
    return { Signup, isloading ,error}
}
