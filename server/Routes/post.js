const router = require("express").Router();
const Post = require("../Model/Post");
const User = require("../Model/User");

// Create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: savedPost });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId === req.body.userId) {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true } // ✅ Returns updated post
      );

      res.status(200).json({
        message: "Post updated successfully",
        post: updatedPost,
      });
    } else {
      res.status(403).json({ message: "You can only update your own post" });
    }
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId === req.body.userId) {
      await post.deleteOne();
      return res.status(200).json({ message: "Post deleted successfully" });
    } else {
      return res
        .status(403)
        .json({ message: "You can only delete your own post" });
    }
  } catch (error) {
    console.error("Delete Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Like/Dislike a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json({ message: "The post has been liked", post });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json({ message: "The post has been disliked", post });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post retrieved successfully", post });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const userPosts = await Post.find({ userId: currentUser._id });

    const friendPosts = currentUser.followings?.length
      ? await Post.find({ userId: { $in: currentUser.followings } })
      : [];

    res.status(200).json([...userPosts, ...friendPosts]);
  } catch (error) {
    console.error("Error fetching timeline:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// Get user's all posts
router.get("/profile/:username", async (req, res) => {
  try {
    const username = req.params.username;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const posts = await Post.find({ userId: user._id });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching user profile posts:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

module.exports = router;
