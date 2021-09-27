import axios from "axios"
import { addToLocalStorage } from "../../utils/browserStorage"


export const LoginCall= async(userCred,dispatch)=>{
    dispatch({type:"LOGIN_START"})
    //MAKE REQUEST

    try{
        const res= await axios.post("api/login", userCred)
        dispatch ({type:"LOGIN_SUCCESS",payload:res.data})
       // localStorage.setItem("user",JSON.stringify(res.data))
        addToLocalStorage("user",res.data)


    }catch(err){
        dispatch ({type:"LOGIN_FAILURE",payload:"error"})
        prompt("login error chap")
        
    }
} 

export const Signupcall= async(user)=>{
    try{
        const res = await axios.post("api/register", user)
        console.log(res.data)
    }catch(err){
        console.log(err)
    }

}
