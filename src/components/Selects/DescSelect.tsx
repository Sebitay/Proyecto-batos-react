import { useState, useEffect, ChangeEventHandler } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import "./Select.css";

const URL = "https://grupo24.cc3201.dcc.uchile.cl/api";

interface Descendencia {
  id: string;
  name: string;
}

interface SelectProps {
  selected: string;
  onChange: ChangeEventHandler;
  onClose: () => void;
}

function DescSelect({ selected, onChange, onClose }: SelectProps) {
  const [data, setData] = useState<Descendencia[]>([
    { id: "N", name: "Seleccione un descendencia" },
  ]);

  useEffect(() => {
    axios
      .get(URL + "/getDescendencias")
      .then((res) => {
        setData([{ id: "0", name: "Seleccione un descendencia" }, ...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="select-div">
      <label htmlFor="ageSelect">Descendencia de la víctima:</label>
      <select
        name="ageSelect"
        id="ageSelect"
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

export default DescSelect;
