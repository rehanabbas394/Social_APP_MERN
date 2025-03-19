import "./online.css";

const Public_folder = import.meta.env.VITE_PUBLIC_FOLDER;

export default function Online({user}) {
  
  return (
    <div>
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img
            className="rightbarProfileImg"
            src={Public_folder+user.profilePicture}
            alt="no img"
          />
          <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">{user.username}</span>
      </li>
    </div>
  );
}
