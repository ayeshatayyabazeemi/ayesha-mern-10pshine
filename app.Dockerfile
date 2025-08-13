# Base image
FROM node:22.17.0

# Working directory
WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install --production

# Install frontend dependencies and build
COPY frontend/package*.json ./frontend/
COPY frontend ./frontend
RUN cd frontend && npm install && npm run build

# Copy backend source code
COPY backend ./backend

# Move frontend build into backend/public
RUN rm -rf backend/public && mkdir -p backend/public && cp -r frontend/build/* backend/public/

# Set environment to production
ENV NODE_ENV=production

# Expose backend port
EXPOSE 5000

# Start backend
CMD ["node", "backend/server.js"]
