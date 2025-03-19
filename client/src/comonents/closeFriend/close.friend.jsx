import "./closeFriend.css";

const Public_folder = import.meta.env.VITE_PUBLIC_FOLDER;

export default function CloseFriend({ user }) {
  return (
    <div>
      <li className="sidebarFriend">
        <img
          src={Public_folder+user.profilePicture}
          alt=""
          className="sidebarFriendImg"
        />
        <span className="sidebarFriendName">{user.username}</span>
      </li>
    </div>
  );
}
