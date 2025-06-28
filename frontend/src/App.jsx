import { useState } from 'react';
import ImagePicker from '../Components/ImagePicker';
import './App.css'
import axios from 'axios'
import JSZip from 'jszip'
import {saveAs} from 'file-saver'

function App() {
  const [file1,setFile1]=useState(null)
  const [file2,setFile2]=useState(null)
  const [check,setCheck]=useState(false)
  const [images,setImages]=useState([])
  const [loading, setLoading] = useState(false);
  // const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
  const downloadZipImages=async ()=>{
    const zip=new JSZip();
    images.forEach((img,i)=>{
      zip.file(`frame-${i+1}.png`,img,{base64:true});
    });
    const con=await zip.generateAsync({type:'blob'});
    saveAs(con,'generated_frames.zip');
  };

  const handlePick1=  (file)=>{
    setFile1(file)
    // console.log(`${import.meta.env.VITE_REACT_APP_API_URL}/get_images`)
  }
  const handlePick2=(file)=>{
    setFile2(file)
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

        setImages(res.data.images);
      }
    } catch (error) {
      console.error("Error fetching interpolated images:", error);
      alert("Failed to generate images. Please try again.");
    } finally {
      setLoading(false);
    }

  }
   return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-10 px-4">
      {/*  Background Blobs */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-purple-300 rounded-full opacity-20 blur-3xl z-0" />
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-pink-300 rounded-full opacity-20 blur-3xl z-0" />

      {/* Main Card */}
      <div className="relative z-10 bg-white/30 backdrop-blur-lg shadow-2xl rounded-3xl w-full max-w-6xl mx-auto p-10 border border-white/20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-6 drop-shadow-sm">
          Anime Frame Generator
        </h1>
        <p className="text-center text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
          Upload two anime-style keyframes to automatically generate intermediate frames using a trained AI model.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-10 mb-8">
          <ImagePicker onpick={handlePick1} />
          <ImagePicker onpick={handlePick2} />
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
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600'
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
      </div>

      {/* Output section */}
      {images.length > 0 && (
        <div className="max-w-7xl mt-16 flex flex-col items-center">
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
            {images.map((image, i) => (
              <img
                key={i}
                src={`data:image/png;base64,${image}`}
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
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg shadow-lg transition-all duration-300 cursor-pointer font-semibold "
          >
            📦 Download All as ZIP
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
