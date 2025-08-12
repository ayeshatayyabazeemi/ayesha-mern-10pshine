# 1️⃣ Base image with Node.js
FROM node:22.17.0

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Copy backend package files and install dependencies
COPY backend/package*.json ./backend/

RUN cd backend && npm install --production

# 4️⃣ Copy frontend package files and install dependencies + build
COPY frontend/package*.json ./frontend/

RUN cd frontend && npm install && npm run build

# 5️⃣ Copy the rest of the backend and frontend source code
COPY backend ./backend
COPY frontend ./frontend

# 6️⃣ Move frontend build into backend's public folder
RUN rm -rf backend/public && mkdir -p backend/public && cp -r frontend/build/* backend/public/

# 7️⃣ Set environment to production
ENV NODE_ENV=production

# 8️⃣ Expose the backend port
EXPOSE 5000

# 9️⃣ Start the backend
CMD ["node", "backend/server.js"]
