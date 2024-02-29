import {
    FormSelect,
    FormSelectOption,
    PageSection,
    PageSectionVariants,
    TextContent,
    TextVariants
   } from '@patternfly/react-core';
   import React, { useEffect, useState } from 'react';
   import { getDatasourcesURL } from '@app/CentralConfig';
   import { DatasourceTable } from './DatasourceTable';
   
   
   const LocalMonitoring = () => {
    const [formSelectValue, setFormSelectValue] = useState('local-monitoring');
    const [datasourcesData, setDatasourcesData] = useState();
    // const list_datasources_url: string = 'https://mocki.io/v1/2d8a2843-ff1f-4162-b51f-4af7bb8cb286';
    const list_datasources_url: string = getDatasourcesURL();
   
   
    const onChange = (_event: React.FormEvent<HTMLSelectElement>, value: string) => {
      setFormSelectValue(value);
    };
   
   
    const options = [{ value: 'local-monitoring', label: 'Local Monitoring', disabled: false }];
   
   
    const fetchDatasources = async () => {
      const response = await fetch(list_datasources_url);
      const data = await response.json();
      setDatasourcesData(data);
      // console.log(data);
    };
   
   
    useEffect(() => {
      try {
        fetchDatasources();
      } catch {
        console.log('Datasources URL not working');
      }
    }, []);
   
   
    return (
      <PageSection variant={PageSectionVariants.light}>
        <TextContent>Local Monitoring POC View </TextContent> <br />
        <div style={{ width: '300px' }}>
          <FormSelect value={formSelectValue} onChange={onChange} aria-label="FormSelect Input" ouiaId="BasicFormSelect">
            {options.map((option, index) => (
              <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
            ))}
          </FormSelect>
        </div>
   
   
     {datasourcesData ?  <DatasourceTable fetchDatasourcesData = {datasourcesData}/> : <></>}
      </PageSection>
    );
   };
   
   
   export { LocalMonitoring };
