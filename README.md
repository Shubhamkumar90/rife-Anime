# RIFE-ANIME
RIFE-Anime is a deep learning-powered tool that generates intermediate animation frames between two input anime frames. It is based on the Real-Time Intermediate Flow Estimation (RIFE) architecture and fine-tuned on anime-specific datasets to support smoother and more natural frame transitions in animations.

# RIFE (Real-Time Intermediate Flow Estimation)
RIFE is a deep learning model for frame interpolation. Instead of explicitly estimating optical flow and warping frames, RIFE learns to generate intermediate frames directly using context-aware modules and flow refinement techniques. It is lightweight, fast, and achieves high-quality results in real-time.
## Main components:
<b><i>IFNet (Intermediate Flow Network):</i></b> IFNet is the core U-Net-like architecture that extracts multi-scale features from the concatenated input frames. It predicts intermediate optical flow, soft masks, and the final blended image.

<b><i>Flow estimator:</i></b>  This module estimates how each pixel moves between the two input frames by predicting forward and backward flow. It then interpolates these flows to compute motion at the desired intermediate time t.

<b><i>Warping module:</i></b>  Using the predicted flow, this module warps both input frames toward time t using bilinear sampling. This aligns them with where pixels are expected to be at the intermediate moment.

<b><i>Fusion module:</i></b>  The fusion module blends the warped frames and mask into a final interpolated image using lightweight convolutional layers. It refines the output to produce high-quality and coherent results.

## Backend
Backend is written in flask, and deployed using huggingface.



## Frontend
Built with React and Tailwind CSS, and deployed using vercel.

Link: https://rife-anime-kl.vercel.app/

To run it localy use these command
```
cd frontend
npm install
npm run dev
````

## Visuals

### Home
<img width="955" alt="image" src="https://github.com/user-attachments/assets/59022afd-f540-40e3-a831-5065468f77e6" />

### Selecting Images
<img width="890" alt="image" src="https://github.com/user-attachments/assets/a122fc74-0db7-4f78-909a-a76f68274c8c" />

### Generated Images
<img width="936" alt="image" src="https://github.com/user-attachments/assets/874d8de8-8e1f-41d4-a06a-4ebac8ce6241" />

