import { useState } from "react"
import { useLogin } from "../hooks/useLogin"


const Login =() =>{
    const [email ,setemail ] = useState('')
    const [password , setpassword] = useState('')
    const {Login , error ,isloading } = useLogin()
    const handlesubmit = async () => {
      await Login(email ,password)
    }

    return (
    <form className="login" onSubmit={handlesubmit}>
        <h4>login </h4>
        <label>email</label>
        <input type="email" onChange={(e)=>setemail(e.target.value)}/>
         <label>password</label>
        <input type="current-password" onChange={(e)=>setpassword(e.target.value)}/>
      <button disabled ={isloading}>login</button>
      {error && <div className="error">{error}</div>}
    </form>
    )
}
export default Login