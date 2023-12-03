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
  const [area, setArea] = useState({ id: "1", name: "Central" });
  const [page, setPage] = useState("map");

  const onClick = (e: MapClick) => {
    setArea({
      id: e.point.id,
      name: e.point.name,
    });
  };
  if (page === "map") {
    return (
      <div className="container">
        <NavBar onSet={setPage} />
        <Map onClick={onClick} />
        <InfoArea areaId={area.id} areaName={area.name} />
      </div>
    );
  }
  if (page !== "map") {
    return (
      <div className="container">
        <NavBar onSet={setPage} />
      </div>
    );
  }
}

export default App;
