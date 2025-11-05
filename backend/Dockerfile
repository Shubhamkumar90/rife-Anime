# FROM python:3.9-slim
# WORKDIR /backend

# ARG DATABASE_URL
# ARG skey
# ENV DATABASE_URL=${DATABASE_URL}
# ENV SECRET_KEY=${skey}


# COPY requirements.txt .

# RUN pip install  -r requirements.txt

# COPY . .

# EXPOSE 5000

# CMD [ "python","app.py" ]
# # CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]

FROM python:3.9-slim
WORKDIR /backend

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
