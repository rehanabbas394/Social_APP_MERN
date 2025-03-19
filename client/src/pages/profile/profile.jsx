import Feed from "../../comonents/feed/feed";
import Sidebar from "../../comonents/sidebar/sidebar";
import Rightbar from "../../comonents/rightbar/rightbar";
import Topbar from "../../comonents/topbar/topbar";
import "./profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const Public_folder = import.meta.env.VITE_PUBLIC_FOLDER || "/assets/";

export default function Profile() {
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect (()=>{
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:4000/api/user?username=${username}`);
      setUser(res.data);
    }
    fetchUser();
  },[username]);
  return (
    <>
      <Topbar />
      <div className="Profile">
        <Sidebar />
        <div className="ProfileRight">
          <div className="ProfileRightTop">
            <div className="ProfileCover">
              <img
                className="ProfileCoverImg"
                src={user.coverPicture || `${Public_folder}post/3.jpeg`}
                alt="Cover"
              />
              <img
                className="ProfileUserImg"
                src={user.coverPicture || `${Public_folder}person/noAvatar.png`}
                alt="Profile"
              />
            </div>
            <div className="ProfileInfo">
              <h4 className="ProfileInfoName">{user.username}</h4>
              <span className="ProfileInfoDesc">Allah is best planner!</span>
            </div>
          </div>
          <div className="ProfileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
