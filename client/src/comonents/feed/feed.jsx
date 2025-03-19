import "./feed.css";
import Share from "../shared/share";
import Post from "../post/post";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = username
          ? await axios.get(
              `http://localhost:4000/api/post/profile/${username}`
            )
          : await axios.get(
              "http://localhost:4000/api/post/timeline/" + user._id
            );
        setPosts(posts.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, [username]);

  return (
    <div className="feed">
      <div className="sharedWrapper">
       <Share />
        {error && <p className="error-message">{error}</p>}
        {posts.length === 0 && !error && <p>No posts available.</p>}
        {posts.map((p) => {
          return <Post post={p} key={p._id} />;
        })}
      </div>
    </div>
  );
}
