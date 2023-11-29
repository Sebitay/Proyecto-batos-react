import axios from 'axios';
import { useState, useEffect} from 'react';
import './InfoArea.css';

const URL = "http://localhost:3000";

interface InfoAreaProps {
    area: string;
}

function InfoArea({area}: InfoAreaProps) {
    const [data, setData] = useState("");


    useEffect(() => {
        if(area !== "0"){
        console.log('Fetching data for area: '+ area)
        axios.get(URL +'/infoArea/' + area)
            .then((res) => {
                setData(res.data.nCrimes);})
            .catch((err) => {
                console.log(err);
            })}}, [area]);


    return (
        <div className="info-area-container">
            <h1>Area: {area}</h1>
            <h1>Cimenes totales: {data}</h1>
        </div>
        
    );
};

export default InfoArea;