FROM node:20

WORKDIR /app

ARG API
ENV VITE_REACT_APP_API_URL=${API}

COPY package* .
RUN npm install
COPY . .
EXPOSE 5173
CMD [ "npm","run","dev","--", "--host"]