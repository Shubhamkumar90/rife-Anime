import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export function Prot2({children}){
    const navigate=useNavigate()
    useEffect(()=>{
        const check=async()=>{
            const token=localStorage.getItem('token')
            // console.log(token)
            // if(!token){navigate('/login')}
            if(token){
                try {
                    const res=await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/check`,{headers:{Authorization:`Bearer ${token}`}})
                    // console.log("prot2")
                    if(res.data.success){navigate('/generate')}
                } catch (error) {
                    // navigate('/login')
                    // return <>{children}</>
                }
            }
            // const res=await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/check`,{headers:{Authorization:`Bearer ${token}`}})
            
        // return <>{children}</>;
        };
        check()
    })
    return <>{children}</>
}