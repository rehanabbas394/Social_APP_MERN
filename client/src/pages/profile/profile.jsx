import Feed from "../../comonents/feed/feed";
import Sidebar from "../../comonents/sidebar/sidebar";
import Rightbar from "../../comonents/rightbar/rightbar";
import Topbar from "../../comonents/topbar/topbar";
import "./profile.css";

export default function Profile() {
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
                src="src/assets/post/3.jpeg"
                alt=""
              />
              <img
                className="ProfileUserImg"
                src="src/assets/person/6.jpeg"
                alt=""
              />
            </div>
            <div className="ProfileInfo">
              <h4 className="ProfileInfoName">Rehan Abbas</h4>
              <span className="ProfileInfoDesc">Allah is best planner!</span>
              </div>
          </div>
          <div className="ProfileRightBottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}
