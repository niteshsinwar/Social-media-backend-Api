# social media backend api

## Installation
- Clone the repository
- Install dependencies: npm install
Start the server: npm start
Usage
Start the server: npm start
Open http://localhost:5000 in a web browser
API Endpoints
List your API endpoints here, with example requests and responses.

Running Tests
Install dev dependencies: npm install --dev
Run tests: npm test
Docker
Build Image
To build the Docker image, run the following command:

Copy code
docker build -t myapp:latest .
Run Container
To run the Docker container, run the following command:

arduino
Copy code
docker run -p 3000:3000 myapp:latest
This will start the app on http://localhost:3000.

Run Tests in Container
To run tests inside the Docker container, run the following command:

bash
Copy code
docker run -it --rm myapp:latest npm test
This will start a new container, run the tests, and then remove the container.
