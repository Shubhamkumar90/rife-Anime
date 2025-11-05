from flask import Flask,jsonify,request,make_response
import cv2
from modelArc import *
import torch
import os
from flask_cors import CORS
import base64
from flask_sqlalchemy import SQLAlchemy
import numpy as np
import threading
import jwt
from flask_bcrypt import Bcrypt
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from dotenv import load_dotenv
import datetime
load_dotenv()
database_url = os.getenv('DATABASE_URL')
SECRET_KEY = os.getenv('SECRET_KEY')

if not database_url:
    raise RuntimeError("DATABASE_URL not set in .env")

app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {"pool_pre_ping": True}
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

device=torch.device('cuda' if torch.cuda.is_available() else "cpu")
model=torch.load('fullmodel.pkl', weights_only=False,map_location=device)
model.eval()
# model.device()
CORS(app)

class User(db.Model):
    __tablename__ = 'users'
    email = db.Column(db.String(120), primary_key=True)
    password = db.Column(db.String(120), nullable=False)

# @app.before_request
# def wake_db_if_needed():
#     global db_awake
#     if not db_awake:
#         try:
#             db.session.execute(text("SELECT 1"))
#             db_awake = True
#             print("Database warmed up.")
#         except Exception as e:
#             print("DB wake-up error:", e)
#             db.session.remove()

@app.route('/check',methods=['GET'])
def checkToken():
    head=request.headers.get('Authorization')
    if not head:
        return jsonify({"success":False,"error":"no token"}), 401
    try:
        token=head.split(" ")[1]
    except IndexError:
        return jsonify({"error":"inavlid token","success":False}), 401
    try:
        udata = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expired","success":False}), 401
    except jwt.DecodeError:
        # print("fdsf")
        return jsonify({"error": "Invalid token","success":False}), 401
    # print(udata)
    if not udata:
        return jsonify({"success":False,"error":"expired"}),401
    return jsonify({"success":True,"email":udata['user_id']})
    

@app.route('/')
def check():
    # result = db.session.execute(text("SELECT * FROM users")).mappings().all()
    # print(result)
    # users = [dict(row) for row in result]
    return {"msg": "hello"}

@app.route('/login',methods=['POST'])
def login():
    data=request.get_json()
    email=data.get('email')
    pas=data.get('pas')
    ch=User.query.filter_by(email=email).first()
    
    if ch and bcrypt.check_password_hash(ch.password,pas):
        payload = {
            'user_id': email,
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=10)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        return jsonify({"success":True,"token": token}), 200
        # return resp
    else:
        return jsonify({"success":False})
    return jsonify({"error": "Invalid credentials"}), 401

@app.route('/signup',methods=['POST'])
def signup():
    data=request.get_json()
    email = data.get('email')
    pas = data.get('pas')
    hpas=bcrypt.generate_password_hash(pas).decode('utf-8')
    newuser=User(email=email,password=hpas)
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "Email already registered","success":False}), 400
    try:
        db.session.add(newuser)
        db.session.commit()
        payload = {
            'user_id': email,
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=10)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        return jsonify({"token": token,"success":True}), 200
        # return jsonify({"message": "User added successfully"})
    except SQLAlchemyError as e:
        db.session.rollback()  # Always rollback on failure
        return jsonify({"error": "problem in db end"}), 500
    
    # Return a proper JSON response
    # return jsonify({"email": email, "pas": pas})

def pred(img0,img1):
    # img0 = cv2.cvtColor(img0, cv2.COLOR_BGR2RGB)
    # img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2RGB)
    # img0=cv2.resize(img0,(256,448))
    # img1=cv2.resize(img1,(256,448))
    h0, w0 = img0.shape[:2]
    h1, w1 = img1.shape[:2]
    H, W = min(h0, h1), min(w0, w1)
    # print(f"{H} wight: {W}")
    img0=cv2.resize(img0, (W, H))
    img1=cv2.resize(img1, (W, H))
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
    # 
    img1=cv2.imdecode(np.frombuffer(request.files['image1'].read(),np.int8),cv2.IMREAD_UNCHANGED)
    img2=cv2.imdecode(np.frombuffer(request.files['image2'].read(),np.int8),cv2.IMREAD_UNCHANGED)
    # print("done")
    img_list,h,w=pred(img1,img2)
    # print("h")
    res=[]
    for idx,img in enumerate(img_list):
        img_np = (img_list[idx][0] * 255).byte().cpu().numpy().transpose(1, 2, 0)[:h, :w]
        # imtmp=cv2.resize(img_np,(W,H))
        _,buffer=cv2.imencode('.png',img_np)
        # _,buffer=cv2.imencode('.jpg',img_, [int(cv2.IMWRITE_JPEG_QUALITY), 75])
        res.append(base64.b64encode(buffer).decode('utf-8'))
    # print(len(res))
    return jsonify({'images':res})

# def launch():
#     app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 7860)))


# threading.Thread(target=launch).start()

if __name__=="__main__":
    # app.run()
    app.run(debug=True,host='0.0.0.0', port=5000)