import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./post.css";

export default function Post(){
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopleft">
                        <img className="profileImage" src="src/assets/person/1.jpeg" alt="no image" />
                        <span className="postUsername">John Boss</span>
                        <span className="postDate">5 mins ago</span>
                    </div>
                    <div className="postTopRight">
                      <MoreVertIcon />
                    </div>
                </div>
                <div className="postCenter">
                    <span className='postText'>Hi, it's my first appearing</span>
                    <img className="postImg" src="src/assets/post/1.jpeg" alt="no image" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src="src/assets/like.png" alt="no image" />
                        <img className="likeIcon" src="src/assets/heart.png" alt="no image" />
                        <span className="postLikeCounter">32 people liked</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">9 comments</span>
                    </div>
                </div>

            </div>
        </div>
    )
}