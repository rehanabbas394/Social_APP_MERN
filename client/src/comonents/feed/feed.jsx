import "./feed.css";
import Share from "../shared/share";
import Post from "../post/post";

export default function Feed() {
    return (
        <div className="feed">
            <div className="sharedWrapper">
                <Share />
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </div>
        </div>
    )
}