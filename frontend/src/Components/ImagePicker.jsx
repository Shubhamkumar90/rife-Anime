import React, { useState, useCallback } from 'react';

function ImagePicker({onpick}) {
  const [imageURL, setImageURL] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleImage = (file) => {
    if (file && file.type.startsWith('image/')) {
      setImageURL(URL.createObjectURL(file));
      onpick(file)
    } else {
      alert('Please select a valid image file.');
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleImage(file);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleImage(file);
  };

  return (
    <div className="flex items-center justify-center ">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        className={`w-full max-w-sm border-2 rounded-2xl p-6 bg-purple-100/10 shadow-md space-y-4 text-center transition ${
          dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <p className="text-purple-300">Drag & drop image here</p>

        {imageURL && (
          <div className="w-full h-64 border rounded-lg overflow-hidden mx-auto">
            <img
              src={imageURL}
              alt="Preview"
              className="object-contain w-full h-full"
            />
          </div>
        )}

        <label className="cursor-pointer inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-gradient-to-r from-purple-600/60 via-purple-500/60 to-pink-400/40 transition">
          Select Image
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}

export default ImagePicker;
