const Post = require('../models/postModel');

// Add a new post
exports.createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = new Post({
      title,
      description,
    });
    await post.save();
    res.status(201).json({
      success: true,
      post: {
        _id: post._id,
        title: post.title,
        description: post.description,
        createdAt: post.createdAt
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Like a post by ID
exports.likePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      
      if (!req.session.userLiked) {
        await Post.updateOne({ _id: post._id }, { $inc: { likes: 1 } });
        req.session.userLiked = true;
        return res.json("Liked");
      } else {
        return res.json({ error: 'Post already liked by user' });
      }
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: 'Server Error' });
    }
};
  
// Unlike a post by ID
exports.unlikePost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
    
      if (!req.session.userLiked) {
        return res.json('unliked' );
      } else {
        await Post.updateOne({ _id: post._id }, { $inc: { likes: -1 } });
        req.session.userLiked = false;
        return res.json("Like removed");
      }
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
};

  

// Add a comment to a post by ID
exports.addComment = async (req, res) => {
    try {
    const post = await Post.findOne({ _id: req.params.id });
    if (!post) {
    return res.status(404).json({ error: 'Post not found' });
    }
    let comment = req.body.comment;
    post.comments.push(comment);
    let id =post.comments.length - 1;
    await post.save();
    res.status(201).json({
    success: true,
    id: id,
    text: comment,
    });
    } catch (error) {
    res.status(500).json(error);
    }
    };
    
    // Get a post by ID with likes and comments
    exports.getPostById = async (req, res) => {
    try {
    const post = await Post.findById(req.params.id).populate('comments', 'text createdAt');
    if (!post) {
    return res.status(404).json({ error: 'Post not found' });
    }
    res.json({
    success: true,
    post: {
    _id: post._id,
    title: post.title,
    description: post.description,
    likes: post.likes,
    comments: post.comments
    }
    });
    } catch (error) {
    res.status(500).json({ error: 'Server Error' });
    }
    };
    
    // Get all posts created by authenticated user
    exports.getAllPosts = async (req, res) => {
    try {
    const posts = await Post.find();
    res.json({
    success: true,
    posts: posts.map(post => ({
    _id: post._id,
    title: post.title,
    description: post.description,
    likes: post.likes,
    comments: post.comments
    }))
    });
    } catch (error) {
    res.status(500).json({ error: 'Server Error' });
    }
    };
        
        
        
        
        
        
        
