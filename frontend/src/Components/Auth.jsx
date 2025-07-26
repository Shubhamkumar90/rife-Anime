import { useState } from "react"
import logo from "../assets/rifelogo.png"
import { Link, Route, useNavigate } from "react-router-dom"
import axios from "axios"
function Auth({type}){
    const[email,setEmail]=useState("")
    const[pass,setpass]=useState("")
    const navigate=useNavigate()
    const [buf,setBuf]=useState(false)
    async function sendcall(e){
        e.preventDefault();
        const rot=type==="Signin"?"login":"signup"
        if(email!=""&&pass!=""){
            setBuf(true)
            const res=await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/${rot}`,{email:email,pas:pass})
            setBuf(false)
            if(!res.data.success){alert(type=="Signin"?"wrong id or password":"email already exist");return;}
            const token=res.data.token
            localStorage.setItem('token',token);
            navigate('/Generate')
        }
    }
    // if(buf){return <div className="flex h-screen justify-center items-center"><Spiner></Spiner></div>}
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400 p-4">
            <div className="flex flex-col border border-purple-200 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 w-full max-w-sm space-y-6">
                <div className="flex flex-col  items-center justify-center">
                    <div className="flex flex-col items-center space-x-3">
                        <img src={logo} alt="RIFE-Anime Logo" className="w-10 h-10" />
                        <span className="text-xl mb-10 font-semibold text-purple-500">Continue to RIFE-Anime</span>
                    </div>
                    <form onSubmit={sendcall} className="flex flex-col  justify-center">
                        <label className="text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 px-4 mb-5 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required/>
                        <label className="text-sm font-medium text-gray-700" htmlFor="password">password</label>
                        <input type="password" placeholder="Password" value={pass} onChange={(e)=>setpass(e.target.value)} className="mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required/>
                        <div className="text-slate-800 mt-3">
                    {type=="Signin"?"Don't have a account?":"Already have an account?"}
                    <Link className="pl-2 underline" to={type=="Signin"?"/signup":"/login"}>
                        {type=="Signin"?"Sign up":"Sign in"}
                    </Link>
                </div>
                        {buf ? (<span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            {/* <Spiner></Spiner> */}
                        </span>
                        ) : (
                        <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition" type="submit">{type}</button>
                        )}
                        
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Auth