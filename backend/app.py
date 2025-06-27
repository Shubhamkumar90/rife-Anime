from flask import Flask,jsonify,request
import cv2
from modelArc import *
import torch
import os
from flask_cors import CORS
import base64
import numpy as np
import threading

device=torch.device('cuda' if torch.cuda.is_available() else "cpu")
app=Flask(__name__)
model=torch.load('backend\\fullmodel.pkl', weights_only=False,map_location=device)
model.eval()
# model.device()
CORS(app)

def pred(img0,img1):
    # img0 = cv2.cvtColor(img0, cv2.COLOR_BGR2RGB)
    # img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2RGB)
    # img0=cv2.resize(img0,(256,448))
    # img1=cv2.resize(img1,(256,448))
    img0 = (torch.tensor(img0.transpose(2, 0, 1)).to(device) / 255.).unsqueeze(0)
    img1 = (torch.tensor(img1.transpose(2, 0, 1)).to(device) / 255.).unsqueeze(0)
    n, c, h, w = img0.shape
    ph = ((h - 1) // 32 + 1) * 32
    pw = ((w - 1) // 32 + 1) * 32
    padding = (0, pw - w, 0, ph - h)
    img0 = F.pad(img0, padding)
    img1 = F.pad(img1, padding)
    img_list = [img0, img1]
    exp=2
    for i in range(exp):
        tmp = []
        for j in range(len(img_list) - 1):
            mid = model.inference(img_list[j], img_list[j + 1])
            tmp.append(img_list[j])
            tmp.append(mid)
        tmp.append(img1)
        img_list = tmp
    return img_list,h,w

# @app.route('/')
# def yo():
#     return "hello"


@app.route('/get_images',methods=['POST'])
def showImage():
    # print(request.files['image1'])
    img1=cv2.imdecode(np.frombuffer(request.files['image1'].read(),np.int8),cv2.IMREAD_UNCHANGED)
    img2=cv2.imdecode(np.frombuffer(request.files['image2'].read(),np.int8),cv2.IMREAD_UNCHANGED)
    # print("done")
    img_list,h,w=pred(img1,img2)
    res=[]
    for idx,img in enumerate(img_list):
        img_np = (img_list[idx][0] * 255).byte().cpu().numpy().transpose(1, 2, 0)[:h, :w]
        _,buffer=cv2.imencode('.png',img_np)
        res.append(base64.b64encode(buffer).decode('utf-8'))
    # print(len(res))
    return jsonify({'images':res})

# def launch():
#     app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 7860)))


# threading.Thread(target=launch).start()

if __name__=="__main__":
    app.run(debug=True)
    # app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 7860)))