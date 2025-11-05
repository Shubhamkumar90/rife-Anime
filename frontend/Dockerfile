
FROM node:20-slim AS build

WORKDIR /app

# Copy only what's needed for dependency install
COPY package.json package-lock.json ./

# Install dependencies (production only)
RUN npm install

# Copy source code
COPY . .

# Build static assets
RUN npm run build


FROM nginx:alpine


RUN rm -rf /usr/share/nginx/html/*
# Copy built app from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy runtime env injection script
# COPY ./env.sh /docker-entrypoint.d/10-env.sh
# RUN chmod +x /docker-entrypoint.d/10-env.sh

# Expose nginx default port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
