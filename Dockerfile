# Stage 1: Build Frontend
FROM node:20-slim AS frontend-builder
WORKDIR /app/logistics-hub
COPY logistics-hub/package*.json ./
RUN npm install
COPY logistics-hub/ ./
RUN npm run build

# Stage 2: Final Backend Image
FROM python:3.11-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy backend dependencies
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt
RUN pip install --no-cache-dir uvicorn python-dotenv watchdog google-genai

# Copy backend code
COPY backend/ /app/backend/

# Copy built frontend from Stage 1 to backend's static folder
COPY --from=frontend-builder /app/logistics-hub/dist /app/backend/static

# Set environment variables
ENV PYTHONPATH=/app/backend
ENV PORT=8000
ENV HOST=0.0.0.0

# Expose port
EXPOSE 8000

# Start application
WORKDIR /app/backend
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
