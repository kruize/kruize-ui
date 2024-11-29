import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
  TextVariants
} from '@patternfly/react-core';
import React, { useEffect } from 'react';
import { DatasourceTable } from './DatasourceTable';
import { useDispatch, useSelector } from 'react-redux';
import { getListOfDataSources } from '@actions/DataSourceActionCreator';

/*
  This is the first page of Local Monitoring use case on the ui 
  it calls the fetchDatasources api as page is refreshed
  and displays datasources table if data avaliable

*/

const LocalMonitoring = () => {
  const dataSource: any = useSelector<any>(state => state.dataSource)
  const dispatch = useDispatch()

  useEffect(() => {
    ( async() => await dispatch(getListOfDataSources()) )()
  }, [dispatch]);
  
  return (
    <PageSection variant={PageSectionVariants.light}>
      <TextContent>
        <Text component={TextVariants.h1}>Local Monitoring</Text>
      </TextContent>
      <br/>

      {dataSource.datasources.length > 0 && <DatasourceTable dataSourcesData={dataSource.datasources} />}
    </PageSection>
  );
};

export { LocalMonitoring };
