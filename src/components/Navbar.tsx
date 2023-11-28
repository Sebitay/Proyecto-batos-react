import "./Navbar.css"
import { FaMapLocationDot } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa";
import { BsPeopleFill } from "react-icons/bs";


interface NavBarProps {
    setPeople: () => void;
    setMap: () => void;
    setChart: () => void;
}

const NavBar = ({setPeople, setMap, setChart}: NavBarProps) => {
    return (
        <div className="navbar-container">
        <FaMapLocationDot size="45" className="navbar-icon" onClick={setMap}/>
        <FaChartBar size="45" className = "navbar-icon" onClick={setChart}/>
        <BsPeopleFill size="45" className = "navbar-icon" onClick={setPeople}/>
        </div>
    );
};

export default NavBar;