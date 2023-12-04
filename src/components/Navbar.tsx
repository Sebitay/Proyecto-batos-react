import "./Navbar.css";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa";

interface NavBarProps {
  onSet: (s: string) => void;
}

const NavBar = ({ onSet }: NavBarProps) => {
  return (
    <div className="navbar-container">
      <FaMapLocationDot
        size="45"
        className="navbar-icon"
        onClick={() => {
          onSet("map");
        }}
      />
      <FaChartBar
        size="45"
        className="navbar-icon"
        onClick={() => {
          onSet("chart");
        }}
      />
    </div>
  );
};

export default NavBar;
