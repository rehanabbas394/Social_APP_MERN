import axios from "axios";
import { Users } from "../../dummy.data";
import Online from "../online/online";
import "./rightbar.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Public_folder = import.meta.env.VITE_PUBLIC_FOLDER;

export default function Rightbar({ user }) {
  const [friends, setFriends] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [follow, setFollow] = useState(false);

  // Check if current user follows this user
  useEffect(() => {
    if (user?._id) {
      setFollow(currentUser.followings.includes(user._id));
    }
  }, [currentUser, user?._id]);

  const followHandler = async () => {
    try {
      const res = await axios.put(`http://localhost:4000/api/user/${user._id}/follow`, {
        userId: currentUser._id,
      });
      console.log("Followed:", res.data);
      setFollow(true);
    } catch (e) {
      console.error("Error following user:", e);
    }
  };

  const unfollowHandler = async () => {
    try {
      const res = await axios.put(`http://localhost:4000/api/user/${user._id}/unfollow`, {
        userId: currentUser._id,
      });
      console.log("Unfollowed:", res.data);
      setFollow(false);
    } catch (e) {
      console.error("Error unfollowing user:", e);
    }
  };

  const handleClick = () => {
    if (follow) {
      unfollowHandler();
    } else {
      followHandler();
    }
  };

  useEffect(() => {
    const fetchFriends = async () => {
      if (!user?._id) return;
      try {
        const resp = await axios.get(`http://localhost:4000/api/user/friends/${user._id}`);
        console.log("Friends:", resp.data);
        setFriends(resp.data);
      } catch (e) {
        console.error("Error fetching friends:", e);
      }
    };
    fetchFriends();
  }, [user?._id]);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdaysContainer">
          <img className="birthdayImg" src="/assets/gift.png" alt="no img" />
          <span className="birthdayText">
            <b>John Boss</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img className="rightbarAd" src="/assets/ad.png" alt="no img" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => {
            return <Online key={u.id} user={u} />;
          })}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
         {user.username !== currentUser.username && (
          <button onClick={handleClick} className="rightbarFollowButton">
            {follow ? "Unfollow" : "Follow"}
          </button>
        )}
        <h1 className="rightbarTitle">User Information</h1>
        <div className="rightbarinfo">
          <div className="rightbarinfoItem">
            <span className="rightbarinfoKey">City:</span>
            <span className="rightbarinfoValue">Bahawalpur</span>
          </div>
          <div className="rightbarinfoItem">
            <span className="rightbarinfoKey">From:</span>
            <span className="rightbarinfoValue">Droher Wahin</span>
          </div>
          <div className="rightbarinfoItem">
            <span className="rightbarinfoKey">Relationship:</span>
            <span className="rightbarinfoValue">Single</span>
          </div>
        </div>
        <h1 className="rightbarTitle">User Friends</h1>
        <div className="rightbarfollwings">
          {friends.map((friend) => (
            <Link to={`/profile/${friend.username}`} style={{ textDecoration: "none" }}>
            <div key={friend._id} className="rightbarfollowing">
              <img
                className="rightbarfollowingImg"
                src={
                  friend.profilePicture
                    ? `${Public_folder}/${friend.profilePicture}`
                    : `${Public_folder}/person/6.jpeg`
                }
                alt="no img"
              />
              <span className="rightbarfollowingName">{friend.username}</span>
            </div>
            </Link>
          ))}
        

          <div className="rightbarfollowing">
            <img
              className="rightbarfollowingImg"
              src="/assets/person/3.jpeg"
              alt="no img"
            />
            <span className="rightbarfollowingName">John Doe</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
