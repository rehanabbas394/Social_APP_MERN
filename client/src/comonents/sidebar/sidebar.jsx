import "./sidebar.css";
import ChatIcon from '@mui/icons-material/Chat';
import FeedIcon from '@mui/icons-material/Feed';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import { Users } from "../../dummy.data";
import CloseFriend from "../closeFriend/close.friend";


export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidbarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <FeedIcon className="sidebarIcon" />
                        Feed
                    </li>
                    <li className="sidebarListItem">
                        <ChatIcon className="sidebarIcon" />
                        Chat
                    </li>

                    <li className="sidebarListItem">
                        <PlayCircleFilledIcon className="sidebarIcon" />
                        Videos
                    </li>
                    <li className="sidebarListItem">
                        <GroupIcon className="sidebarIcon" />
                        Groups
                    </li>
                    <li className="sidebarListItem">
                        <BookmarkIcon className="sidebarIcon" />
                        Bookmarks
                    </li>
                    <li className="sidebarListItem">
                        <HelpOutlineIcon className="sidebarIcon" />
                        Questions
                    </li>
                    <li className="sidebarListItem">
                        <WorkOutlineIcon className="sidebarIcon" />
                        Jobs
                    </li>
                    <li className="sidebarListItem">
                        <EventIcon className="sidebarIcon" />
                        Events
                    </li>
                    <li className="sidebarListItem">
                        <SchoolIcon className="sidebarIcon" />
                        Courses
                    </li>
                </ul>
                <button className="sidbarbtn">See More</button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    {Users.map((u)=> {
                        return (
                            <CloseFriend key={u.id} user={u} />
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}