import "./share.css";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

export default function Share(){
    return(
        <div className="share">
            <div className="sharedWrapper">
                <div className="sharedTop">
                    <img className="sharedImg" src="src/assets/person/1.jpeg" alt="no img" />
                    <input placeholder="What's in your mind?" className="sharedInput" />
                </div>
                <hr className="sharedHr" />
                <div className="sharedBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMediaIcon htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                        </div>

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
                            <span className="shareOptionText">Photo or Video</span>
                        </div>

                    </div>
                    <button className="sharedButton">Share</button>
                </div>
            </div>
        </div>
    )
}