import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./post.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Public_folder = import.meta.env.VITE_PUBLIC_FOLDER;

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUsers] = useState({});

  const { user: currentuser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!post.userId) return;
      try {
        const res = await axios.get(
          `http://localhost:4000/api/user/${post.userId}`
        );
        setUsers( 
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })[0]
        );
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUsers();
  }, [post.userId]);

  useEffect(()=>{
    setIsLiked(post.likes.includes(currentuser._id))
  })

  const hundleClick = async () => {
    try {
      await axios.put(`http://localhost:4000/api/post/${post._id}/like`, {
        userId: currentuser._id,
      });
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopleft">
            <Link
              to={`/profile/${user.username}`}
              style={{ textDecoration: "none" }}
            >
              <img
                className="profileImage"
                src={
                  user?.profilePicture
                    ? `${Public_folder}/${user.profilePicture}`
                    : `${Public_folder}/person/noAvatar.png`
                }
                alt="Profile Image"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img
            className="postImg"
            src={
              post?.img
                ? `${Public_folder}/person/${post.img}`
                : `${Public_folder}noAvatar.png`
            }
            alt="Post image"
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="/assets/like.png"
              onClick={hundleClick}
              alt="no image"
            />
            <img
              className="likeIcon"
              src="/assets/heart.png"
              onClick={hundleClick}
              alt="no image"
            />
            <span className="postLikeCounter">{like} people liked</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
