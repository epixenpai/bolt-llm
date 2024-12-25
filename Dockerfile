ARG BASE=node:20.18.0
FROM ${BASE} AS base

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Production image
FROM base AS bolt-ai-production

# Build step if needed
RUN npm run build

CMD ["npm", "start"]

# Development image
FROM base AS bolt-ai-development

CMD ["npm", "run", "dev"]