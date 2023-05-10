# Specify the base image
FROM node:16

# Create a new directory for our app
WORKDIR /app

# Copy package.json and package-lock.json to the app directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app code to the app directory
COPY . .

# Expose the port that the app listens on
EXPOSE 3000

# Set environment variables
ENV MONGODB_URI=mongodb://mongo:27017/mydb
ENV JWT_SECRET=mysecret

# Wait for the MongoDB service to be available
CMD ["./wait-for-it.sh", "mongo:27017", "--", "npm", "test"]

# Start the app
CMD ["npm", "start"]
