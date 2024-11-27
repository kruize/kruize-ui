import { Button, OverflowMenu, OverflowMenuContent, OverflowMenuGroup, OverflowMenuItem } from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import React, { useEffect, useState } from 'react';
import { ClusterGroupTables } from './ClusterGroupTables';
import { getDataSourceMetaData } from '@actions/DataSourceActionCreator';
import { useDispatch, useSelector } from 'react-redux';
/*

  This is the Datasources table which gets display, takes data from fetchDS api call
  it also represents the data in an expandable row  and has an import metadata button 
  which calls import metadata api and redirects user to the next page, this redirection 
  is does with the help of Link tag and its state property to pass data across pages


*/

const DatasourceTable = ({ dataSourcesData, ...props }) => {
  const dispatch = useDispatch()
  const dataSourceSelector: any = useSelector<any>(state => state.dataSource)

  const [expandedRows, setExpandedRows] = useState({});
  const [buttonStatus, setButtonStatus] = useState(false);
  const [dataSourceName, setDataSourceName] = useState<string>(dataSourceSelector.selectedDataSource || "")

  useEffect(() =>{
    setDataSourceName(dataSourceSelector.selectedDataSource)
  },[dataSourceSelector.selectedDataSource] )
  
  const handleImportMetadata = async (dataSourceName: string) => {
    setButtonStatus(true);
    setDataSourceName(dataSourceName);
    await dispatch(getDataSourceMetaData(dataSourceName));
    setButtonStatus(false);
  };

  const toggleRowExpanded = (index, dataSourceName: string) => {
    setDataSourceName(dataSourceName)
    setExpandedRows((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const dataLoaded = Object.keys(dataSourceSelector.dataSourceMetaData).length > 0

  return (
    <React.Fragment>
        <Table aria-label="Data Sources Table">
          <Thead>
            <Tr>
              <Th aria-label="Select" /> 
              <Th>DataSource Name</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>

            {dataSourcesData.map((source, index) => (
              <Tr key={index} {...(index % 2 === 0 && { isStriped: true })}>
                <Td
                  expand={{
                    rowIndex: index,
                    isExpanded: !!expandedRows[index],
                    onToggle: () => toggleRowExpanded(index, source.name)
                  }}
                />
                <Td dataLabel="DataSource Name">
                  <div>{dataLoaded ? source.name : source.name}</div>
                  {expandedRows[index] && (
                    <div style={{ paddingTop: '10px', fontSize: 'smaller' }}>
                      URL: {source.url} <br />
                      Service Name: {source.serviceName}
                      <br />
                      Namespace: {source.namespace}
                      <br />
                      Provider: {source.provider}
                    </div>
                  )}
                </Td>
                <Td isActionCell>
                  <OverflowMenu breakpoint="lg">
                    <OverflowMenuContent>
                      <OverflowMenuGroup groupType="button">
                        <OverflowMenuItem>
                          <Button
                            variant="primary"
                            isDisabled={buttonStatus}
                            onClick={() => handleImportMetadata(source.name)}
                          >
                            Import Metadata
                          </Button>
                        </OverflowMenuItem>
                      </OverflowMenuGroup>
                    </OverflowMenuContent>
                  </OverflowMenu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {dataLoaded && dataSourceName.length > 0 &&  <ClusterGroupTables clusterGroupData={dataSourceSelector.dataSourceMetaData}  dataSourceName={dataSourceName}/>}
    </React.Fragment>
  );
};

export { DatasourceTable };
