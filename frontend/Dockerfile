FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.21.0-alpine
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 3000
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
