import "./feed.css";
import Share from "../shared/share";
import Post from "../post/post";
import { Posts }  from "../../dummy.data";

export default function Feed() {
  return (
    <div className="feed">
      <div className="sharedWrapper">
        <Share />
        {Posts.map((p) => {
            return <Post post={p} key={p.id} />;
        })
        }
      </div>
    </div>
  );
}
