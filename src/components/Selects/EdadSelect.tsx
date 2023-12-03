import { useState, useEffect, ChangeEventHandler } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import "./Select.css";

const URL = "http://localhost:3000";

interface SelectProps {
  selected: string;
  onChange: ChangeEventHandler;
  onClose: () => void;
}

function EdadSelect({ selected, onChange, onClose }: SelectProps) {
  const [data, setData] = useState<string[]>(["Seleccione una edad..."]);

  useEffect(() => {
    axios
      .get(URL + "/getEdades")
      .then((res) => {
        setData(["Seleccione una edad...", ...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="select-div">
      <label htmlFor="ageSelect">Edad de la victima:</label>
      <select
        name="ageSelect"
        id="ageSelect"
        value={selected}
        onChange={onChange}
      >
        {data.map((item) => (
          <option key={item} value={item}>
            {item}
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

export default EdadSelect;
