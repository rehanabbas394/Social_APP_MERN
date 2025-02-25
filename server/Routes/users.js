const router = require("express").Router();
const User = require("../Model/User");
const bcrypt = require("bcrypt");

router.put("/:id", async (req, res) => {
  try {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json(err);
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json({ message: "Account has been updated", user });
      } catch (err) {
        return res.status(500).json(err);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json("User not found");
      }
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can only delete your account");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password, updatedAt, ...other } = user.toObject();

    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch all friends in parallel
    const friends = await Promise.all(
      user.followings.map(async (friendId) => await User.findById(friendId))
    );

    // Extract necessary fields
    const friendList = friends
      .filter(friend => friend !== null) 
      .map(({ _id, username, profilePicture }) => ({
        _id,
        username,
        profilePicture
      }));

    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});


//follow a user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId === req.params.id) {
    return res.status(403).json({ message: "You can't follow yourself" });
  }

  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);

    if (!user || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.followers.includes(req.body.userId)) {
      return res.status(403).json({ message: "You already follow this user" });
    }

    await user.updateOne({ $push: { followers: req.body.userId } });
    await currentUser.updateOne({ $push: { followings: req.params.id } });

    res.status(200).json({ message: "User has been followed", user });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json({message:"user has been unfollowed",user});
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

module.exports = router;
