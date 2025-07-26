import axios from 'axios'
import JSZip from 'jszip'
import {saveAs} from 'file-saver'
import { useState } from 'react';
import gifshot from 'gifshot'
import ImagePicker from '../Components/ImagePicker';
// import bgimg2 from "../assets/background.jpg"
import {Navbar2} from '../Components/Navbar';
export const Generate=()=>{
  const [file1,setFile1]=useState(null)
  const [file2,setFile2]=useState(null)
  const [check,setCheck]=useState(false)
  const [images,setImages]=useState([])
  const [loading, setLoading] = useState(false);
  const [gif,setGif]=useState(null)
  // const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
  const downloadZipImages=async ()=>{
    const zip=new JSZip();
    images.forEach((img,i)=>{
      zip.file(`frame-${i+1}.png`,img,{base64:true});
    });
    const con=await zip.generateAsync({type:'blob'});
    saveAs(con,'generated_frames.zip');
  };

  const makegif=(images)=>{
    gifshot.createGIF(
      {images:images.map(img => `data:image/jpeg;base64,${img}`),interval: 0.2,webcamVideo: false, // ✅ explicitly disable camera
    cameraStream: false, // ✅ prevent trying to access webcam
    useVideo: false,gifWidth: 280,
      gifHeight: 180,},
      function(obj){
        if(!obj.error){setGif(obj.image)}
        else{alert("gif problem")}
      }
    )
  }

  const handlePick1=  (file)=>{
    setFile1(file)
    setGif(null);
    setImages([])
    // console.log(`${import.meta.env.VITE_REACT_APP_API_URL}/get_images`)
  }
  const handlePick2=(file)=>{
    setFile2(file)
    setGif(null);
    setImages([])
  }
  const isCheck=async()=>{
    // console.log("kfdfs")
    if(file1!=null&&file2!=null){
      // console.log(file1.name+" "+file2.name)
      // console.log("k")
      if(file1.name===file2.name&&file1.size===file2.size){
        // console.log("fdfd")
        setCheck(true);
      }
    }
    try {
      if (check === false) {
        const formdata = new FormData();
        formdata.append('image1', file1);
        formdata.append('image2', file2);
        setLoading(true);
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/get_images`,formdata,{headers: { 'Content-Type':'multipart/form-data'}});
        // console.log(res.data)
        setImages(res.data.images);
        makegif(res.data.images);
        // setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching interpolated images:", error);
      alert("Failed to generate images. Please try again.");
    } finally {
      setLoading(false);
    }

  }
   return (
    <div className="min-h-screen relative bg-[#17062e] overflow-hidden bg-cover bg-center py-10 px-4"
    // style={{ backgroundImage: `url(${bgimg2})` }}
    >
      {/* <img src={bgimg2} alt="background image" className="absolute top-0 left-1/2 -translate-x-1/2 inset-0 max-w-none min-h-screen w-auto h-auto object-cover"/>
      <div className="absolute inset-0 bg-[#17062e]/50"></div> */}
      {/*  Background Blobs */}
      <Navbar2></Navbar2>
      
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-purple-300 rounded-full opacity-20 blur-3xl z-0" />
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-pink-300 rounded-full opacity-20 blur-3xl z-0" />

      {/* Main Card */}
      <div className="relative z-10 mt-15 bg-purple-300/25 backdrop-blur-ms shadow-2xl rounded-3xl w-full max-w-6xl mx-auto p-10 border border-purple-200/20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-purple-300 mb-6 drop-shadow-sm">
          Anime Frame Generator
        </h1>
        <p className="text-center text-lg md:text-xl text-purple-300 max-w-3xl mx-auto mb-10 leading-relaxed">
          Upload two anime-style keyframes to automatically generate intermediate frames using a trained AI model.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-10 mb-8">
          <ImagePicker onpick={handlePick1} />
          <ImagePicker onpick={handlePick2} />
          {/* <ImagePicker></ImagePicker> */}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={isCheck}
            disabled={loading || !file1 || !file2}
            className={`px-8 py-3 cursor-pointer text-white font-semibold rounded-xl transition-all duration-300 shadow-lg tracking-wide text-lg
              ${
                loading
                  ? 'bg-rose-500 animate-pulse cursor-wait'
                  : !file1 || !file2
                  ? 'bg-purple-400/60 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-700 via-purple-500 to-pink-500 hover:brightness-110'

              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating...
              </span>
            ) : (
              'Generate Frames'
            )}
          </button>
        </div>

        {check && (
          <p className="text-red-600 text-center text-lg mt-4 font-semibold">
            ❗ Both images are the same. Please select different frames.
          </p>
        )}
        {gif && (<div className="mt-5 flex flex-col items-center ">
          <h2 className="text-purple-300 text-xl font-semibold mb-2">GIF Preview</h2>
          <div className='relative  bg-purple-300/25 backdrop-blur-ms shadow-2xl rounded-2xl mx-auto p-4 border border-purple-200/20'>
            <img
            src={gif}
            alt="Generated GIF"
            className="w-[300px] rounded-xl border shadow-lg"
          />
          </div>
        </div>
      )}

      </div>

      {/* Output section */}
      {images.length > 0 && (
        <div className="mt-16 flex flex-col items-center justify-center">
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 justify-center">
            {images.map((image, i) => (
              <img
                key={i}
                src={`data:image/jpeg;base64,${image}`}
                alt={`frame-${i}`}
                className="w-[280px] rounded-xl shadow-md border"
              />
            ))}
          </div>
        </div>
      )}
      {images.length > 0 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={downloadZipImages}
            className="bg-fuchsia-800/60 hover:bg-fuchsia-700  text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-300 cursor-pointer font-semibold "
          >
            📦 Download All as ZIP
          </button>
          
        </div>
      )}
      
    </div>
  );
}