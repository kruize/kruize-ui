import React, { useState, useEffect, useContext } from 'react';
import nodeContext from '@app/ContextStore/nodeContext';

const ListExperimentsAPI = () => {
    const [experimentDetails, setExperimentDetails] = useState("");
    const Context = useContext(nodeContext);
    const ip = Context['cluster'];
    const port = Context['autotune'];

    useEffect(() => {
        const url = "http://" + ip + ":" + port + "/listExperiments";

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log(json.slip.advice);
                setExperimentDetails(json.slip.advice);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            {experimentDetails[0]}
        </div>
    )
}

export { ListExperimentsAPI }
