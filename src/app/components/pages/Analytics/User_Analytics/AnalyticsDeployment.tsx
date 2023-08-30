import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  FormFieldGroup,
  FormFieldGroupExpandable,
  FormFieldGroupHeader,
  Select,
  SelectOption,
  SelectVariant
} from '@patternfly/react-core';
import nodeContext from '@app/ContextStore/nodeContext';
import { TableIcon } from '@patternfly/react-icons';

const AnalyticsDeployment = () => {
  const [deployments, setDeployments] = useState([]);
  const [selected, setSelected] = useState<string | null>(sessionStorage.getItem('Deployment Value'));
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
  }, [selected]);

  useEffect(() => {
    sessionStorage.setItem('Deployment Value', '');
    setSelected('not found');
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
        deployments.map((option, index) => (
          <FormFieldGroup
          // toggleAriaLabel="Details"
          // header={
          //     <FormFieldGroupHeader
          //         titleText={{ text: option, id: index + '' }}
          //     />
          // }
          >
            {option}
          </FormFieldGroup>
        ))
      )}
      {/* <Select
                variant={SelectVariant.single}
                placeholderText={deployments.length === 0 ? "no dep found" : "Select Deployment"}
                aria-label="deployments in analytics"
                onToggle={() => setIsopen(!isopen)}
                onSelect={onSelect}
                selections={selected}
                isOpen={isopen}
            >
                {
                    deployments.map((option, index) => (
                        <SelectOption key={index} value={option || ''} />
                    ))}
            </Select> */}
    </>
  );
};

export { AnalyticsDeployment };
