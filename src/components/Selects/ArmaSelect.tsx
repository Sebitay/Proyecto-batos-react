import { useState, useEffect, ChangeEventHandler } from "react";
import axios from "axios";
import "./Select.css";

const URL = "http://localhost:3000";

interface Weapon {
  id: string;
  name: string;
}

interface SelectProps {
  selected: string;
  onChange: ChangeEventHandler;
}

function ArmaSelect({ selected, onChange }: SelectProps) {
  const [data, setData] = useState<Weapon[]>([
    { id: "0", name: "Seleccione un arma..." },
  ]);

  useEffect(() => {
    axios
      .get(URL + "/getArmas")
      .then((res) => {
        setData([{ id: 0, name: "Seleccione un arma..." }, ...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="select-div">
      <label htmlFor="weaponSelect">Arma usada:</label>
      <select
        name="weponSelect"
        id="weaponSelect"
        value={selected}
        onChange={onChange}
      >
        {data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ArmaSelect;
