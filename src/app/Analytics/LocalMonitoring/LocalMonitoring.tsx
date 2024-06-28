import {
  FormSelect,
  FormSelectOption,
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
  TextVariants
} from '@patternfly/react-core';
import React, { useEffect, useState } from 'react';
import { getDatasourcesURL } from '@app/CentralConfig';
import { DatasourceTable } from './DatasourceTable';

/*
  This is the first page of Local Monitoring use case on the ui 
  it calls the fetchDatasources api as page is refreshed
  and displays datasources table if data avaliable

*/

const LocalMonitoring = () => {
  const [datasourcesData, setDatasourcesData] = useState();
  const list_datasources_url: string = getDatasourcesURL();

  const fetchDatasources = async () => {
    const response = await fetch(list_datasources_url);
    const data = await response.json();
    setDatasourcesData(data);
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
      <TextContent>
        <Text component={TextVariants.h1}>Local Monitoring</Text>
      </TextContent>
      <br/>
      {datasourcesData ? <DatasourceTable fetchDatasourcesData={datasourcesData} /> : <></>}
    </PageSection>
  );
};

export { LocalMonitoring };
