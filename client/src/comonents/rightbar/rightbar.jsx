import { Users } from "../../dummy.data";
import Online from "../online/online";
import "./rightbar.css";

export default function Rightbar({ profile }) {
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdaysContainer">
          <img className="birthdayImg" src="src/assets/gift.png" alt="no img" />
          <span className="birthdayText">
            <b>John Boss</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img className="rightbarAd" src="src/assets/ad.png" alt="no img" />
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
          <div className="rightbarfollowing">
            <img
              className="rightbarfollowingImg"
              src="src/assets/person/1.jpeg"
              alt="no img"
            />
            <span className="rightbarfollowingName">John Doe</span>
          </div>
          <div className="rightbarfollowing">
            <img
              className="rightbarfollowingImg"
              src="src/assets/person/2.jpeg"
              alt="no img"
            />
            <span className="rightbarfollowingName">John Doe</span>
          </div>
          <div className="rightbarfollowing">
            <img
              className="rightbarfollowingImg"
              src="src/assets/person/3.jpeg"
              alt="no img"
            />
            <span className="rightbarfollowingName">John Doe</span>
          </div>
          <div className="rightbarfollowing">
            <img
              className="rightbarfollowingImg"
              src="src/assets/person/4.jpeg"
              alt="no img"
            />
            <span className="rightbarfollowingName">John Doe</span>
          </div>
          <div className="rightbarfollowing">
            <img
              className="rightbarfollowingImg"
              src="src/assets/person/5.jpeg"
              alt="no img"
            />
            <span className="rightbarfollowingName">John Doe</span>
          </div>
          <div className="rightbarfollowing">
            <img
              className="rightbarfollowingImg"
              src="src/assets/person/6.jpeg"
              alt="no img"
            />
            <span className="rightbarfollowingName">John Doe</span>
          </div>

          <div className="rightbarfollowing">
            <img
              className="rightbarfollowingImg"
              src="src/assets/person/6.jpeg"
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
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
