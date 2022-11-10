// import React, { useState, useEffect } from 'react';
// import KruizeDropdown from "../Components/KruizeDropdown";

// const DeploymentsDropdown = (props: { data, setData }) => {
//     const [selected, setSelected] = useState(props.data["deployment"]);
//     useEffect(() => {
//         props.setData({ ...{}, deployment: selected })
//     }, [selected])

//     const [deployment, setDeployment] = useState([
//         {
//             name: "Galaxies",
//         },
//         {
//             name: "PetClinic",
//         },
//         {
//             name: "TechEmpower",
//         },
//     ]);
//     return (
//         <>
//             <KruizeDropdown title="Select Deployment" content={deployment} selected={selected} />
//             {console.log(23, selected)}
//         </>
//     )
// };

// export default DeploymentsDropdown;
import React, { useState, useEffect, useContext } from "react";
import { Select, SelectOption, SelectVariant } from "@patternfly/react-core";
import nodeContext from "@app/Context_store/nodeContext";

const DeploymentsDropdown = (props: { data; setData }) => {
    const [deployments, setDeployments] = useState([]);
    const [selected, setSelected] = useState(props.data["deployment"]);
    const [isopen, setIsopen] = useState(false);
    const Context = useContext(nodeContext);
    const ip = Context["cluster"];
    const port = Context["autotune"];
    const namesp = sessionStorage.getItem("Namespace Value");
    const deployments_url = "http://" + ip + ":" + port + "/query/listDeployments?namespace=" + namesp ;

    useEffect(() => {
        setSelected(sessionStorage.getItem("Deployment Value"))
        fetch(deployments_url)
            .then((res) => res.json())
            .then((res) => setDeployments(res.data.deployments));

    
    }, [namesp])

    useEffect(() => {
        props.setData({ ...{ ...props.data }, deployment: selected })
        //console.log(2, selected)
    }, [selected])

    useEffect(() =>{
        setSelected(sessionStorage.setItem("Deployment Value", ""))
        
    }, [namesp])

    const onSelect = (event, selection, isPlaceholder) => {
        setSelected(selection);
        setIsopen(false);
        sessionStorage.setItem("Deployment Value", selection);
        var payload = {
            deployment: selection,
        };
    };

    return (
        <>
            <Select
                variant={SelectVariant.single}
                placeholderText="Select Deployment"
                aria-label="Select Input with descriptions"
                onToggle={() => setIsopen(!isopen)}
                onSelect={onSelect}
                selections={selected}
                isOpen={isopen}

            >

                {deployments.map((option, index) => (
                    <SelectOption key={index} value={option} />

                ))}
            </Select>
{console.log(1, deployments_url)}

        </>

    );
};

export default DeploymentsDropdown;
