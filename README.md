# social media backend api

## Installation
- Clone the repository
- Install dependencies: npm install
## Usage
- Start the server: npm start
- Open http://localhost:5000 in a web browser
## API Endpoints
- POST /api/authenticate perform user authentication and return a JWT token.
- POST /api/follow/{id} authenticated user would follow user with {id}
- POST /api/unfollow/{id} authenticated user would unfollow a user with {id}
- GET /api/user should authenticate the request and return the respective user profile.
- POST api/posts/ would add a new post created by the authenticated user.
- DELETE api/posts/{id} would delete post with {id} created by the authenticated user.
- POST /api/like/{id} would like the post with {id} by the authenticated user.
- POST /api/unlike/{id} would unlike the post with {id} by the authenticated user.
- POST /api/comment/{id} add comment for post with {id} by the authenticated user.
- GET api/posts/{id} would return a single post with {id} populated with its number of likes and comments
- GET /api/all_posts would return all posts created by authenticated user sorted by post time.
    

## Running Tests
Run tests: npm test
## Docker
To build the Docker image, run the following command:

- docker build -t myapp:latest .
To run the Docker container, run the following command:


- docker run -p 3000:3000 myapp:latest
This will start the app on http://localhost:3000.


