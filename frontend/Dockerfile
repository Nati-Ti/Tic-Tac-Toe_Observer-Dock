# Use an official Node.js image as a base
FROM node:18-alpine
# This Dockerfile builds the React front end for nginx.
# It also proxies /api requests to api:5000

WORKDIR /client

# Copy the package.json and package-lock.json
COPY . .

# Install dependencies
RUN npm install

# Expose the port that the Vite development server will run on
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev", "--", "--host"]











# WORKDIR /app

# COPY ./frontend/src ./src

# COPY package.json yarn.lock ./

# COPY ./frontend/public ./public

# RUN yarn install

# RUN yarn build

# FROM nginx:stable-alpine
# COPY --from=build-step /app/build /usr/share/nginx/html
# COPY deployment/nginx.default.conf /etc/nginx/conf.d/default.conf
