import React, { useState, useEffect, useContext } from 'react';
import { FormGroup, FormSelect, FormSelectOption, Form, FormSection, Checkbox } from '@patternfly/react-core';
import nodeContext from '@app/components/common/ContextStore/nodeContext';

const RegularSection = () => {
  const Context = useContext(nodeContext);
  const ip = Context['cluster'];
  const port = Context['autotune'];
  const performance_profile_url = 'http://' + ip + ':' + port + '/listPerformanceProfiles';

  const [mode, setMode] = useState('Select Mode');
  const [cluster, setCluster] = useState('Select Cluster');
  const [profiles, setProfiles] = useState<any[]>([]);
  const [profile, setProfile] = useState('select');

  const fetchProfiles = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.length > 0) {
        setProfiles(data);
      }
      console.log(data[0].name);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchProfiles(performance_profile_url);
  }, []);

  const handleProfileChange = (value) => {
    setProfile(value);
  };
  const handleModeChange = (value) => {
    setMode(value);
  };
  const handleClusterChange = (value) => {
    setCluster(value);
  };

  const modes = [
    { value: '1', label: 'monitor', disabled: false },
    { value: '2', label: 'trial', disabled: false }
  ];
  const clusters = [
    { value: '1', label: 'remote', disabled: false },
    { value: '2', label: 'local', disabled: false }
  ];

  const PerfProfileDropDown = () => {
    return (
      <FormGroup label="Select Profile" isRequired fieldId="horizontal-form-name">
        <FormSelect value={profile} onChange={handleProfileChange} aria-label="profiles">
          {profiles.map((data, index) => (
            <FormSelectOption key={index} value={data.name} label={data.name} />
          ))}
        </FormSelect>
      </FormGroup>
    );
  };

  const modeDropDown = () => {
    return (
      <FormGroup label="Select mode" isRequired fieldId="horizontal-form-name">
        <FormSelect value={mode} onChange={handleModeChange} aria-label="mode">
          {modes.map((option, index) => (
            <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
          ))}
        </FormSelect>
      </FormGroup>
    );
  };

  const clusterDropDown = () => {
    return (
      <FormGroup label="Select cluster" isRequired fieldId="horizontal-form-name">
        <FormSelect value={cluster} onChange={handleClusterChange} aria-label="cluster">
          {clusters.map((option, index) => (
            <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
          ))}
        </FormSelect>
      </FormGroup>
    );
  };
  const containersCheckbox = () => {
    return (
      <FormGroup role="group" isInline fieldId="basic-form-checkbox-group" label="Select Container" isRequired>
        <Checkbox label="tfb-server-0" aria-label="tfb-server-0" id="inlinecheck01" />
        <Checkbox label="tfb-server-1" aria-label="tfb-server-1" id="inlinecheck02" />
      </FormGroup>
    );
  };

  return (
    <Form
      isWidthLimited
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <FormSection>
        {PerfProfileDropDown()}
        {modeDropDown()}
        {clusterDropDown()}
        {containersCheckbox()}
      </FormSection>
    </Form>
  );
};

export { RegularSection };
