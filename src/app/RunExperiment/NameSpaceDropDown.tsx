import React, {useState} from 'react';
import KruizeDropdown from "../Components/KruizeDropdown";

const NameSpaceDropDown = () => {
    const [namespaces, setNamespaces] = useState([
        {
            name: "Default",
        },
        {
            name: "Monitoring",
        },
        {
            name: "Test",
        },
    ]);
    return (
        <KruizeDropdown label="Namespace" title="Select Namespace" content={namespaces}/>
    )
};

export default NameSpaceDropDown;
