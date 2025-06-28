
# RIFE-ANIME
![Python](https://img.shields.io/badge/python-3.8%2B-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Flask](https://img.shields.io/badge/backend-flask-lightgrey)
![React](https://img.shields.io/badge/frontend-react-blue)
## Introduction

RIFE-Anime is a deep learning-powered tool that generates intermediate animation frames between two input anime frames. It is based on the Real-Time Intermediate Flow Estimation (RIFE) architecture and fine-tuned on anime-specific datasets to support smoother and more natural frame transitions in animations.

## RIFE (Real-Time Intermediate Flow Estimation)
RIFE is a deep learning model for frame interpolation. Instead of explicitly estimating optical flow and warping frames, RIFE learns to generate intermediate frames directly using context-aware modules and flow refinement techniques. It is lightweight, fast, and achieves high-quality results in real-time.
### Main components:
<b><i>IFNet (Intermediate Flow Network):</i></b> IFNet is the core U-Net-like architecture that extracts multi-scale features from the concatenated input frames. It predicts intermediate optical flow, soft masks, and the final blended image.

<b><i>Flow estimator:</i></b>  This module estimates how each pixel moves between the two input frames by predicting forward and backward flow. It then interpolates these flows to compute motion at the desired intermediate time t.

<b><i>Warping module:</i></b>  Using the predicted flow, this module warps both input frames toward time t using bilinear sampling. This aligns them with where pixels are expected to be at the intermediate moment.

<b><i>Fusion module:</i></b>  The fusion module blends the warped frames and mask into a final interpolated image using lightweight convolutional layers. It refines the output to produce high-quality and coherent results.


## 🖥️ Backend

- Built using **Flask**
- Deployed via **Hugging Face Spaces**
- Contains a fine-tuned RIFE model (`fullmodel.pkl`) trained on anime datasets like ATD-12K.


### 📦 Model Download

The fine-tuned model file (`fullmodel.pkl`, ~130MB) is available here:

👉 [Download fullmodel.pkl from Hugging Face](https://huggingface.co/spaces/shubham879/rifeAnime/resolve/main/fullmodel.pkl)

After downloading, place the model file in the `backend/` directory:

To run it locally use these commands
```
pip install -r requirements.txt
python app.py
```
It takes around 1 min to generate frames so wait if you don't have GPU.


You can generate more frames by changing `exp` variable in `app.py`


## 🌐 Frontend

- Built using **React** and **Tailwind CSS**
- Deployed on **Vercel**




**Live Demo:**  
🔗 [https://rife-anime-kl.vercel.app/](https://rife-anime-kl.vercel.app/)


To run it locally use these command
```
cd frontend
npm install
npm run dev
````

> 🔧 **Note:** 
> If you're running the backend locally, replace `${import.meta.env.VITE_REACT_APP_API_URL}` with `http://127.0.0.1:5000` in the `frontend/app.jsx` file to ensure proper communication between the frontend and backend during development.


## Visuals

### Home
<img width="955" alt="image" src="https://github.com/user-attachments/assets/59022afd-f540-40e3-a831-5065468f77e6" />

### Selecting Images
<img width="890" alt="image" src="https://github.com/user-attachments/assets/a122fc74-0db7-4f78-909a-a76f68274c8c" />

### Generated Images
<img width="936" alt="image" src="https://github.com/user-attachments/assets/874d8de8-8e1f-41d4-a06a-4ebac8ce6241" />

## Acknowledgements
RIFE - [Real-Time Intermediate Flow Estimation](https://github.com/hzwer/ECCV2022-RIFE/tree/main)

Dataset: [ATD-12K Dataset](https://www.kaggle.com/datasets/marafey/atd-12-dataset/data?select=datasets)

Hugging Face, Vercel, and the open-source community ❤️