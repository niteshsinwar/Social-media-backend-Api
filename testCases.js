const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./src/app');

chai.use(chaiHttp);
chai.should();

describe('Post API Tests', () => {
    let token;

    before(async () => {
      try {
        const res = await chai
          .request(app)
          .post('/api/authenticate')
          .set('Accept', 'application/json')
          .send({ email: 'user@example.com', password: 'password' });
        token = res.body.token;
        console.log('Token:', token);
      } catch (err) {
        console.log('Error:', err);
      }
    });

  describe('POST /api/posts/', () => {
    it('should create a new post with all required fields', (done) => {
      const post = {
        title: 'Test Post',
        description: 'This is a test post.',
      };
      chai
        .request(app)
        .post('/api/posts/')
        .set('Authorization', `Bearer ${token}`)
        .send(post)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('title').eq(post.title);
          res.body.should.have.property('description').eq(post.description);
          done();
        });
    });

    it('should fail if Title field is missing', (done) => {
      const post = {
        description: 'This is a test post.',
      };
      chai
        .request(app)
        .post('/api/posts/')
        .set('Authorization', `Bearer ${token}`)
        .send(post)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('"title" is required');
          done();
        });
    });
  });

  describe('POST /api/like/:id', () => {
    let postId = '';

    before((done) => {
      const post = {
        title: 'Test Post',
        description: 'This is a test post.',
      };
      chai
        .request(app)
        .post('/api/posts/')
        .set('Authorization', `Bearer ${token}`)
        .send(post)
        .end((err, res) => {
          postId = res.body.id;
          done();
        });
    });

    it('should allow authenticated user to like a post', (done) => {
      chai
        .request(app)
        .post(`/api/like/${postId}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('likes').eq(1);
          done();
        });
    });

    it('should fail if user is not authenticated', (done) => {
      chai
        .request(app)
        .post(`/api/like/${postId}`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eq('Unauthorized');
          done();
        });
    });
  });

  describe('POST /api/comment/:id', () => {
    let postId = '';

    before((done) => {
      const post = {
        title: 'Test Post',
        description: 'This is a test post.',
      };
      chai
        .request(app)
        .post('/api/posts/')
        .set('Authorization', `Bearer`)})})})
        it('should allow authenticated user to add a comment to a post', (done) => {
            const comment = {
              content: 'This is a test comment',
            };
            chai
              .request(app)
              .post(`/api/comment/${postId}`)
              .set('Authorization', `Bearer ${token}`)
              .send(comment)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('comments');
                res.body.comments.should.be.a('array');
                res.body.comments.should.have.lengthOf(1);
                res.body.comments[0].should.have.property('content').eq(comment.content);
                done();
              });
          });
          
          it('should fail if user is not authenticated', (done) => {
            const comment = {
              content: 'This is a test comment',
            };
            chai
              .request(app)
              .post(`/api/comment/${postId}`)
              .send(comment)
              .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eq('Unauthorized');
                done();
              });
          });
          
