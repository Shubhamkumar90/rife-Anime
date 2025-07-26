
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Prot({ children }) {
    const navigate=useNavigate()
    useEffect(()=>{
        const check=async()=>{
            const token=localStorage.getItem('token')
            if(!token){navigate('/login')}
            try {
                const res=await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/check`,{headers:{Authorization:`Bearer ${token}`}})
                // console.log(res.data)
                // console.error("Auth check error:", err);
            } catch (error) {
                navigate('/login')
            }
            
        return <>{children}</>;
        };
        check()
    })
    return <>{children}</>
}

