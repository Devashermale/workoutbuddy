import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup =() =>{
    const [email ,setemail ] = useState('')
    const [password , setpassword] = useState('')
    const {Signup ,error , isloading} = useSignup()
    const handlesubmit =  (e) => {
      e.preventDefault()
   Signup(email ,password)
   //console.log(email ,password) 
    }

    return (
    <form className="Signup" onSubmit={handlesubmit}>
        <h4>Sign up</h4>
        <label>email</label>
        <input type="email" onChange={(e)=>setemail(e.target.value)}/>
         <label>password</label>
        <input type="password" onChange={(e)=>setpassword(e.target.value)}/>
      <button disabled={isloading}>Sign up</button>
      {error&&<div className="error">{error}</div>}
    </form>
    )
}
export default Signup