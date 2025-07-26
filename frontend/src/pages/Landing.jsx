import React from "react";
import logo from '../assets/rifelogo.png'
import Navbar from "../Components/Navbar";
import bgimg from "../assets/background.jpg"
import bgimg2 from "../assets/background2.jpg"
import f1 from "../assets/frame1.png"
import { Link } from "react-router-dom";
export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white ">
      <div className="bg-cover bg-center" style={{ backgroundImage: `url(${bgimg})` }}>
        {/* <img src={bgimg} alt="background image" className="absolute top-0 left-1/2 -translate-x-1/2 inset-0 max-w-none min-h-screen w-auto h-auto object-cover"/> */}
      <div className="absolute inset-0 bg-[#17062e]/50"></div>
      <div className="relative z-50">
        <div><Navbar></Navbar></div>
        <div className="flex flex-col items-center justify-center  px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6 pt-20">
            <img src={logo} alt="Logo" className="w-10 h-10 mr-3"/>
            <h1 className="text-3xl md:text-4xl font-bold text-purple-500">RIFE-Anime</h1>
            </div>
            <h2 className="text-2xl md:text-5xl font-bold text-purple-300 mb-4">
              Bring Anime to Life<br className="hidden md:block" /> Frame by Frame
            </h2>

            <p className="text-md md:text-lg text-purple-200 mb-8">
              Generate smooth in-between frames for anime sequences with AI
            </p>

            <Link to={"/generate"}><button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg px-8 py-3 rounded-full shadow-md hover:scale-105 transition transform duration-300 cursor-pointer">
              Generate
            </button></Link>
          </div>

          <div className="px-4 py-5 space-y-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-purple-200 text-center">
              Interpolation Preview
            </h2>

  {/* Card 1: Start & End Frame */}
            <div className="bg-white/5 border border-purple-500 rounded-2xl p-6 shadow-lg backdrop-blur-md">
              <h3 className="text-purple-300 text-xl mb-6 text-center font-medium">Start & End Frames</h3>
              <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                <div className="flex flex-col items-center">
                  <img src=$`{f1}` alt="Start Frame" className="w-48 md:w-64 rounded-xl shadow-md" />
                  <p className="text-purple-300 mt-3 text-md">Start Frame</p>
                </div>
                <div className="flex flex-col items-center">
                  <img src="../assets/frame-5.png" alt="End Frame" className="w-48 md:w-64 rounded-xl shadow-md" />
                  <p className="text-purple-300 mt-3 text-md">End Frame</p>
                </div>
              </div>
            </div>

  {/* Card 2: Interpolated Frames */}
          <div className="bg-white/5 border border-purple-500 rounded-3xl p-6 shadow-lg backdrop-blur-md">
            <h3 className="text-purple-300 text-2xl mb-6 text-center font-medium">Interpolated Frames</h3>
            <div className="grid grid-cols-3  gap-4 justify-center">
              {["../assets/frame-2.png", "../assets/frame-3.png", "../assets/frame-4.png"].map((src, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <img src={src} alt={`Frame ${idx + 1}`} className="w-32 md:w-50 lg:w-60 rounded-xl shadow-md" />
                  <p className="text-purple-300 mt-2 text-md">Frame {idx + 1}</p>
                </div>
              ))}
              
            </div>
            <div className="flex justify-center items-center pt-3">
                <div>
                  <img src= "/src/assets/al.gif" alt="gif" className="w-32 md:w-70 rounded-xl shadow-md" />
                  <p className="items-center text-center text-purple-300 mt-2 text-xl">GIF Preview</p>
                </div>
              </div>
          </div>
        </div>

          {/* About Section */}

      {/* <img src={bgimg2} alt="background image" className="absolute top-0 left-1/2 -translate-x-1/2 inset-0 max-w-none"/>
      <div className="absolute inset-0 bg-[#17062e]/50"></div> */}
        </div>
      </div>
      </div>
      

{/* How It Works Section */}
<div className="w-full bg-cover bg-center"
    style={{ backgroundImage: `url(${bgimg2})` }}
  >
  {/* <img src={bgimg2} alt="background image" className="absolute inset-0 max-w-none min-h-screen w-auto h-auto object-contain"/>
      <div className="absolute inset-0 bg-[#17062e]/50"></div> */}
      <section id="how" className="w-full backdrop-blur-sm rounded-2xl py-20 px-6 md:px-20 text-center text-purple-200">
  <h2 className="text-3xl md:text-4xl font-bold text-purple-400 mb-6">How It Works</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
    <div className="bg-white/10 rounded-xl p-6 backdrop-blur-md shadow-lg">
      <h3 className="text-xl font-semibold text-purple-300 mb-3">1. Upload Images</h3>
      <p>Choose the starting and ending anime frames you want to interpolate.</p>
    </div>
    <div className="bg-white/10 rounded-xl p-6 backdrop-blur-md shadow-lg">
      <h3 className="text-xl font-semibold text-purple-300 mb-3">2. AI Interpolation</h3>
      <p>RIFE-Anime uses an AI model fine-tuned on anime data to create smooth in-between frames.</p>
    </div>
    <div className="bg-white/10 rounded-xl p-6 backdrop-blur-md shadow-lg">
      <h3 className="text-xl font-semibold text-purple-300 mb-3">3. Download Result</h3>
      <p>Download the generated intermediate frame to use in your animation sequence.</p>
    </div>
  </div>
</section>
  <section id="about" className=" py-40 px-6 md:px-20 text-center text-purple-200 bg-[#17062e]/40 ">
  <h2 className="text-3xl md:text-4xl font-bold text-purple-400 mb-6">About RIFE-Anime</h2>
  <p className="max-w-3xl mx-auto text-lg leading-relaxed">
    RIFE-Anime is a deep learning-powered tool that brings anime to life by generating smooth intermediate frames between two animation-style images.
    It helps animators and creators produce fluid animations effortlessly saving time and effort while enhancing visual appeal.
  </p>
</section>
{/* <div className="md:min-h-0 lg:min-h-70"></div> */}
</div>
    </div>
  );
}
