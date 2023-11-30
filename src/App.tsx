import Map from "./components/Map";
import NavBar from "./components/Navbar";
import "./App.css";
import { useState } from "react";
import InfoArea from "./components/InfoArea";

interface MapClick {
  point: {
    id: string;
    name: string;
    value: number;
  };
}

function App() {
  const [area, setArea] = useState("1");
  const [page, setPage] = useState("map");

  const setPeople = () => {
    setPage("people");
    console.log("people");
  };

  const setMap = () => {
    setPage("map");
    console.log("map");
  };

  const setChart = () => {
    setPage("chart");
    console.log("chart");
  };

  const onClick = (e: MapClick) => {
    setArea(e.point.id);
  };

  return (
    <div className="container">
      <NavBar setChart={setChart} setMap={setMap} setPeople={setPeople} />
      <Map onClick={onClick} />
      <InfoArea area={area} />
    </div>
  );
}

export default App;
