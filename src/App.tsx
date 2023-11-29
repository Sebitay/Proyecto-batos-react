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
  const [area, setArea] = useState("0");
  const [page, setPage] = useState("map")

  const setPeople = () => {
    setPage("people")
  }

  const setMap = () => {
    setPage("map")
  }

  const setChart = () => {
    setPage("chart")
  }

  const onClick = (e: MapClick) => {
    setArea(e.point.id)
  }

  return ( 
  <div className="container">
    <NavBar setChart={setChart} setMap={setMap} setPeople={setPeople}/>
    <Map onClick={onClick}/>
    <InfoArea/>
    <h1>Area: {area}, Page: {page}</h1>
  </div>
  );
}

export default App;