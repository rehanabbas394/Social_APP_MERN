import Topbar from "../../comonents/topbar/topbar";
import "./home.css";
import Feed from "../../comonents/feed/feed";
import Sidebar from "../../comonents/sidebar/sidebar";
import Rightbar from "../../comonents/rightbar/rightbar";


export default function HomePage(){
    return(
        <div>
            <Topbar/>
            <div className="homecontainer">
                <Sidebar/>
                <Feed/>
                <Rightbar/>
            </div>
        </div>
    )
}