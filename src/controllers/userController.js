

// Get user profile
exports.getUserProfile = (req, res) => {
    // Get user profile data from the JWT token
    const  name ="nitesh"
    const followers=200 
    const followings =150 
  
    // Return the user profile data
    return res.json({
      name,
      followers,
      followings
    });
  };
  
  // Follow a user
  exports.followUser = (req, res) => {
    const { id } = req.params;
  
    // Logic to follow the user with the given id
  
    return res.json({
      message: `You have followed the user with ID ${id}`
    });
  };
  
  // Unfollow a user
  exports.unfollowUser = (req, res) => {
    const { id } = req.params;
  
    // Logic to unfollow the user with the given id
  
    return res.json({
      message: `You have unfollowed the user with ID ${id}`
    });
  };
  