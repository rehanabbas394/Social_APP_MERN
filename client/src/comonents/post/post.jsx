import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./post.css";
import { Users } from '../../dummy.data';
import { useState } from 'react';

export default function Post({post}){
    const [like,setLike] = useState(post.like);
    const [isLiked,setIsLiked] = useState(false);

    const hundleClick = () => {
        setLike(isLiked? like-1 : like+1);
        setIsLiked(!isLiked);
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopleft">
                        <img className="profileImage" src={Users.filter((u)=> u.id===post.userId)[0].profilePicture} alt="no image" />
                        <span className="postUsername">{Users.filter((u)=> u.id===post.userId)[0].username}</span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                      <MoreVertIcon />
                    </div>
                </div>
                <div className="postCenter">
                    <span className='postText'>{post?.desc}</span>
                    <img className="postImg" src={post.photo} alt="no image" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src="src/assets/like.png" onClick={hundleClick} alt="no image" />
                        <img className="likeIcon" src="src/assets/heart.png" onClick={hundleClick} alt="no image" />
                        <span className="postLikeCounter">{like} people liked</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>

            </div>
        </div>
    )
}