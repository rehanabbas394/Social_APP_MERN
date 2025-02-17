import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import './topbar.css'

export default function Topbar() {
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo">Social Media</span>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <SearchIcon className="searchIcon" />
                    <input placeholder="Search for friends, posts or videos" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLinks">Friend</span>
                    <span className="topbarLinks">Timeline</span>
                </div>
                <div className="topbarIcon">
                    <div className="topbarIconItem">
                        <PersonIcon />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <ChatIcon />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <NotificationsIcon />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <img src="src/assets/person/1.jpeg" alt="" className="topbarImg" />
            </div>
        </div>
    )
}