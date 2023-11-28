import Map from "./components/Map";
import NavBar from "./components/Navbar";
import "./App.css";
import { useState } from "react";

function App() {
  const [area, setArea] = useState("0");
  const onClick = (e) => {
    setArea(e.point.id)
  }

  return ( 
  <div className="container">
    <NavBar/>
    <Map onClick={onClick}/>
    <h1>Area: {area}</h1>
  </div>
  );
}

export default App;