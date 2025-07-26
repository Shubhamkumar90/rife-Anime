import { useState } from "react";
import logo from "../assets/rifelogo.png"
import {Menu,X} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

function Navbar(){
    const [isopen,setisopen]=useState(false);
     return (
     <nav className="fixed top-10 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-5xl rounded-2xl px-10 py-4 border border-purple-50 shadow-lg  md:backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <Link to={"/"}>
        <div className="flex items-center space-x-3">
          <img src={logo} alt="RIFE-Anime Logo" className="w-8 h-8" />
          <span className="text-xl font-semibold text-purple-400">RIFE-Anime</span>
        </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-purple-300 font-medium">
          <a href="#about" className="hover:text-purple-500 transition py-2">About</a>
          <a href="#how" className="hover:text-purple-500 transition py-2">How it works</a>
          <a href="/generate"className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full shadow-md hover:scale-105 transition transform duration-300 cursor-pointer">
                        Generate
                      </a>
        </div>
        <div className="md:hidden">
            <button onClick={()=>setisopen(!isopen)}>
                {isopen? <X className="text-purple-400"></X>:<Menu className="text-purple-400"></Menu>}
            </button>
        </div>
        {isopen && (
        <div className="md:hidden fixed top-[85px] left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-5xl rounded-xl border border-purple-100 shadow-xl bg-[rgba(0,0,0,0.4)] backdrop-blur-lg px-6 py-4 space-y-3 text-purple-300 font-medium">
          <a href="/generate" className="block hover:text-purple-500 transition">Generate</a>
          <a href="#about" className="block hover:text-purple-500 transition">About</a>
          <a href="#how" className="block hover:text-purple-500 transition">How it works</a>
        </div>
      )}
      </div>
    </nav>
  );
}

export function Navbar2(){
  const navigate=useNavigate()
  function logout(){
    localStorage.removeItem('token');
    navigate('/')
  }
  return (
     <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-5xl rounded-2xl px-10 py-4 border border-purple-50 shadow-lg  md:backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <Link to={"/"}>
        <div className="flex items-center space-x-3">
          <img src={logo} alt="RIFE-Anime Logo" className="w-8 h-8" />
          <span className="text-xl font-semibold text-purple-400">RIFE-Anime</span>
        </div>
        </Link>

        <button onClick={logout} className={`px-5 py-2 cursor-pointer text-white font-semibold rounded-xl transition-all duration-300 shadow-lg tracking-wide text-md bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500 hover:brightness-110
              `}>Log out</button>
      </div>
    </nav>
  );
}

export default Navbar