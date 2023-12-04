import { useState, useEffect, ChangeEventHandler } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import "./Select.css";

const URL = "https://grupo24.cc3201.dcc.uchile.cl/api";

interface Weapon {
  id: string;
  name: string;
}

interface SelectProps {
  selected: string;
  onChange: ChangeEventHandler;
  onClose: () => void;
}

function ArmaSelect({ selected, onChange, onClose }: SelectProps) {
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
      <IoMdClose
        className="closeBtn"
        onClick={onClose}
        size="30"
        color="#555555"
      />
    </div>
  );
}

export default ArmaSelect;
