import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import RoomIcon from "@mui/icons-material/Room";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Public_folder = import.meta.env.VITE_PUBLIC_FOLDER;

export default function Share() {
  const desc = useRef();
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;

      try {
        await axios.post("http://localhost:4000/api/upload", data); // Ensure backend has this route
      } catch (err) {
        console.error("Error uploading file:", err);
        return;
      }
    }

    try {
      await axios.post("http://localhost:4000/api/post", newPost);
      window.location.reload();
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div className="share">
      <div className="sharedWrapper">
        <div className="sharedTop">
          <Link to={`/profile/${user.username}`} style={{ textDecoration: "none" }}>
            <img
              className="sharedImg"
              src={
                user?.profilePicture
                  ? `${Public_folder}/${user.profilePicture}`
                  : `${Public_folder}/person/noAvatar.png`
              }
              alt="User Avatar"
            />
          </Link>
          <input
            placeholder={`What's on your mind, ${user.username}?`}
            className="sharedInput"
            ref={desc}
          />
        </div>
        <hr className="sharedHr" />
        <form className="sharedBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <label className="shareOption">
              <PermMediaIcon htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>

            <div className="shareOption">
              <LabelIcon htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>

            <div className="shareOption">
              <RoomIcon htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>

            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feeling</span>
            </div>
          </div>
          <button className="sharedButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}