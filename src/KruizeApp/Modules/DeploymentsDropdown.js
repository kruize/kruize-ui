import React, {useState} from 'react';
import KruizeDropdown from "../Components/KruizeDropdown";

const DeploymentsDropdown = () => {
    const [deployment, setDeployment] = useState([
        {
            name: "Galaxies",
        },
        {
            name: "PetClinic",
        },
        {
            name: "TechEmpower",
        },
    ]);
    return (
        <KruizeDropdown label="Deployments" title="Select Deployment" content={deployment}/>
    )
};

export default DeploymentsDropdown;