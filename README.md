
# RIFE-ANIME
![Python](https://img.shields.io/badge/python-3.8%2B-blue.svg)
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
### Backend Environment Variables

The backend uses environment variables to configure the application. Create a `.env` file inside the `backend/` directory with the following variables:

```env
DATABASE_URL=<your_database_url>
SECRET_KEY=<your_secret_key_for_jwt>
```

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

### Frontend Environment Variables

The frontend uses environment variables to configure the application. Create a `.env` file inside the `frontend/` directory with the following variables:

```env
VITE_REACT_APP_API_URL=http://localhost:5000
```


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

## Start the Project 

Make sure both `.env` files exist:

- `backend/.env`
- `frontend/.env`



### Run with Docker Compose

```bash
docker-compose up --build
```
## Access

- **Backend API:** [http://localhost:5000](http://localhost:5000)  
- **Frontend App:** [http://localhost](http://localhost)


## Visuals

### Home
<p align="center">
  <img width="884" height="434" alt="home1" src="https://github.com/user-attachments/assets/2cfe8ce5-e003-4528-94ad-b5ba951b8f1f" />
  <img width="884" height="521" alt="home2" src="https://github.com/user-attachments/assets/d3e500b9-4481-40a3-9a34-ac53814fa984" />
  <img width="884" height="534" alt="home3" src="https://github.com/user-attachments/assets/89feb646-ce33-4a42-ba5d-bdc102da1e1f" />
</p>



### Selecting Images
<p align="center"><img width="913" height="525" alt="imageselect" src="https://github.com/user-attachments/assets/bfeebea1-0b29-466a-940d-f38d0fdf8c5a" /></p>

### Login and Signup
<p align="center">
  <img width="356" height="342" alt="login" src="https://github.com/user-attachments/assets/8d08e986-7532-4fa1-914a-7ab5162c8c89" />
  <img width="356" height="342" alt="signup" src="https://github.com/user-attachments/assets/54864794-f8fa-4d11-95e2-26820116e72a" />
</p>


### Generated Images
<p align="center"><img width="925" height="524" alt="generatedpage" src="https://github.com/user-attachments/assets/770de39c-e5d0-4e7f-8f87-48c306a93092" />
</p>


## Acknowledgements
RIFE - [Real-Time Intermediate Flow Estimation](https://github.com/hzwer/ECCV2022-RIFE/tree/main)

Dataset: [ATD-12K Dataset](https://www.kaggle.com/datasets/marafey/atd-12-dataset/data?select=datasets)

Hugging Face, Vercel, and the open-source community ❤️
