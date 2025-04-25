FROM node:20

WORKDIR /app

# Copy only package files first
COPY package*.json ./

# Run install with logs
RUN echo "📥 Installing..." && npm install && \
    echo "✅ Installed:" && ls -la node_modules && \
    ls -la node_modules/.bin

# Copy the rest of the project AFTER install
COPY . .

# Expose ports
EXPOSE 3000
EXPOSE 3001

# Start dev server
CMD ["npm", "run", "dev"]
