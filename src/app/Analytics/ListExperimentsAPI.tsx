import React, { useState, useEffect, useContext } from 'react';
import nodeContext from '@app/ContextStore/nodeContext';

const ListExperimentsAPI = () => {

    const [experimentData, setExperimentData] = useState({});
    const Context = useContext(nodeContext);
    const ip = Context['cluster'];
    const port = Context['autotune'];
    const list_experiments_url = 'http://' + ip + ':' + port + '/listExperiments';

    useEffect(() => {
        if (ip != 'undefined' && port != 'undefined') {
            fetch(list_experiments_url)
                .then((res) => res.json())
                .then((res) => console.log(res))
                .catch(err => { console.log(err) })
        }
    }, []);


    return (
        <>

        </>
    );
}

export { ListExperimentsAPI }
