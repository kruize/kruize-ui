import React, { useState, useEffect, useContext } from 'react';
import { Select, SelectOption, SelectVariant } from '@patternfly/react-core';
import nodeContext from '@app/components/common/ContextStore/nodeContext';

const DeploymentsDropdown = (props: { data; setData }) => {
  const [deployments, setDeployments] = useState([]);
  const [selected, setSelected] = useState(props.data['deployment']);
  const [isopen, setIsopen] = useState(false);
  const Context = useContext(nodeContext);
  const ip = Context['cluster'];
  const port = Context['autotune'];
  const namesp = sessionStorage.getItem('Namespace Value');
  const deployments_url = 'http://' + ip + ':' + port + '/query/listDeployments?namespace=' + namesp;

  useEffect(() => {
    setSelected(sessionStorage.getItem('Deployment Value'));
    fetch(deployments_url)
      .then((res) => res.json())
      .then((res) => setDeployments(res.data.deployments));
  }, [namesp]);

  useEffect(() => {
    props.setData({ ...{ ...props.data }, deployment: selected });
  }, [selected]);

  useEffect(() => {
    setSelected(sessionStorage.setItem('Deployment Value', ''));
  }, [namesp]);

  const onSelect = (event, selection, isPlaceholder) => {
    setSelected(selection);
    setIsopen(false);
    sessionStorage.setItem('Deployment Value', selection);
    var payload = {
      deployment: selection
    };
  };
  return (
    <>
      {deployments.length === 0 ? (
        <p>No deployments found</p>
      ) : (
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
            <SelectOption key={index} value={option || ''} />
          ))}
        </Select>
      )}
    </>
  );
};

export default DeploymentsDropdown;
