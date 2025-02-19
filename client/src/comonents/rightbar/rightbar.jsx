import "./rightbar.css";

export default function Rightbar(){
    return(
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className="birthdaysContainer">
                    <img className="birthdayImg" src="src/assets/gift.png" alt="no img" />
                    <span className="birthdayText"><b>John Boss</b> and <b>3 other friends</b> have a birthday today</span>

                </div>
                <img className="rightbarAd" src="src/assets/ad.png" alt="no img" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    <li className="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className="rightbarProfileImg" src="src/assets/person/1.jpeg" alt="no img" />
                            <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername">John Boss</span>
                    </li>
                    <li className="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className="rightbarProfileImg" src="src/assets/person/2.jpeg" alt="no img" />
                            <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername">John Boss</span>
                    </li>
                    <li className="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className="rightbarProfileImg" src="src/assets/person/3.jpeg" alt="no img" />
                            <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername">John Boss</span>
                    </li>
                    <li className="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className="rightbarProfileImg" src="src/assets/person/4.jpeg" alt="no img" />
                            <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername">John Boss</span>
                    </li>
                    <li className="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className="rightbarProfileImg" src="src/assets/person/5.jpeg" alt="no img" />
                            <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername">John Boss</span>
                    </li>
                    <li className="rightbarFriend">
                        <div className="rightbarProfileImgContainer">
                            <img className="rightbarProfileImg" src="src/assets/person/6.jpeg" alt="no img" />
                            <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername">John Boss</span>
                    </li>
                </ul>

            </div>
        </div>
    )
}