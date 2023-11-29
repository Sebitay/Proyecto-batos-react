import axios from 'axios';
import { useState, useEffect} from 'react';

const URL = "http://localhost:3000";

function InfoArea() {
    const [data, setData] = useState("");


    useEffect(() => {
        axios.get(URL +'/message')
            .then((res) => {
                console.log(res.data.message);})
            .catch((err) => {
                console.log(err);
            })});

    return (
        <h1>{data}</h1>
    );
};

export default InfoArea;