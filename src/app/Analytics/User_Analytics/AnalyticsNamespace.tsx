import React, { useState, useEffect, useContext } from 'react';
import { Select, SelectOption, SelectVariant } from '@patternfly/react-core';
import nodeContext from '@app/ContextStore/nodeContext';
import {ExperimentTable} from './ExperimentTable';

const AnalyticsNamespace = () => {

    const [namespaces, setNamespaces] = useState([]);
    const [selected, setSelected] = useState('');
    const [isopen, setIsopen] = useState(false);
    const Context = useContext(nodeContext);
    const ip = Context['cluster'];
    const port = Context['autotune'];
    const namespace_url = 'http://' + ip + ':' + port + '/query/listNamespaces';

    useEffect(() => {
        if (ip != 'undefined' && port != 'undefined') {
            // setSelected(sessionStorage.getItem('Namespace Value'));
            fetch(namespace_url)
                .then((res) => res.json())
                .then((res) => setNamespaces(res.data.namespaces));
        }
    }, [selected]);

    const onSelect = (event, selection, isPlaceholder) => {
        setSelected(selection);
        setIsopen(false);
        sessionStorage.setItem('Namespace Value', selection);
        var payload = {
            namespace: selection
        };
    };


    return (
        <>
            <Select
                variant={SelectVariant.typeaheadMulti}
                placeholderText="Select Namespace"
                aria-label="namespace in analytics"
                onToggle={() => setIsopen(!isopen)}
                onSelect={onSelect}
                // onChange={onChange}
                selections={selected}
                isOpen={isopen}
            >
                {namespaces.map((option, index) => (
                    <SelectOption key={index} value={option || ''} />
                ))}
            </Select>
            { selected != '' ? <ExperimentTable/> : <></>}
        </>
    );
};

export { AnalyticsNamespace }
