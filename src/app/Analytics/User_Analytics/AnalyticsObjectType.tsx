import React, { useState, useEffect, useContext } from 'react';
import { Select, SelectOption, SelectVariant } from '@patternfly/react-core';
import nodeContext from '@app/ContextStore/nodeContext';
import FilterIcon from '@patternfly/react-icons/dist/esm/icons/filter-icon';

const AnalyticsObjectType = () => {
    const [objectType, setObjectType] = useState([]);
    const [selected, setSelected] = useState(sessionStorage.getItem('Kubernetes Object Type Value'));
    const [isopen, setIsopen] = useState(false);

    const onSelect = (event, selection, isPlaceholder) => {
        setSelected(selection);
        setIsopen(false);
        sessionStorage.setItem('Kubernetes Object Type Value', selection);
        var payload = {
            namespace: selection
        };
    };

    const options = [
        <SelectOption key={0} value="Deployment" />,
        <SelectOption key={1} value="Deployment Config" />,
        <SelectOption key={2} value="Stateful Set" />,
        <SelectOption key={3} value="Replica Set" />,
        <SelectOption key={4} value="Replication Controller" />,
        <SelectOption key={6} value="Daemon Set" />
    ];
    return (
        <>
            <Select
                icon={<FilterIcon />}
                variant={SelectVariant.single}
                placeholderText="Select Kubernetes Object Type"
                aria-label="object type in analytics"
                onToggle={() => setIsopen(!isopen)}
                onSelect={onSelect}
                // onChange={onChange}
                selections={selected}
                isOpen={isopen}
            >
                {options}
            </Select>
        </>
    );
};

export { AnalyticsObjectType }
