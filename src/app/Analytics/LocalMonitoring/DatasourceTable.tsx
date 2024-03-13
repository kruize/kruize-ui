import {
  Button,
  OverflowMenu,
  OverflowMenuContent,
  OverflowMenuGroup,
  OverflowMenuItem,
  TextContent,
  Text,
  TextVariants
} from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td, ExpandableRowContent } from '@patternfly/react-table';
import React, { useState } from 'react';
import { ClusterGroupTables } from './ClusterGroupTables';
import { importDataSourcesMetadataURL } from '@app/CentralConfig';

const DatasourceTable = (props: { fetchDatasourcesData }) => {
  const [clusterGroupData, setClusteGroupData] = useState<any>();
  const [expandedRows, setExpandedRows] = useState({});

  const handleImportMetadata = async (dataSourceName: string) => {
    console.log(dataSourceName);
    const payload = {
      version: 'v1.0',
      datasource_name: dataSourceName
    };

    const response = await fetch(importDataSourcesMetadataURL(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    setClusteGroupData(data);
  };

  const toggleRowExpanded = (index) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <React.Fragment>
      <Text component={TextVariants.h3}>Data Sources</Text>
      <div style={{ width: '800px' }}>
        <Table aria-label="Data Sources Table">
          <Thead>
            <Tr>
              <Th />
              <Th>DataSource Name</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.fetchDatasourcesData.datasources.map((source, index) => (
              <Tr key={index}>
                <Td
                  expand={{
                    rowIndex: index,
                    isExpanded: !!expandedRows[index],
                    onToggle: () => toggleRowExpanded(index),
                  }}
                />
                <Td dataLabel="DataSource Name">
                  <div>{source.name}</div>
                  {expandedRows[index] && (
                    <div style={{ paddingTop: '10px', fontSize: 'smaller' }}>
                      URL: {source.url}
                    </div>
                  )}
                </Td>
                <Td isActionCell>
                  <OverflowMenu breakpoint="lg">
                    <OverflowMenuContent>
                      <OverflowMenuGroup groupType="button">
                        <OverflowMenuItem>
                          <Button variant="secondary" onClick={() => handleImportMetadata(source.name)}>
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
      </div>
      <br /> <br />
      {clusterGroupData ? (
        <>
          <TextContent> Cluster Groups Table </TextContent>
          <ClusterGroupTables clusterGroupData={clusterGroupData} />
        </>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export { DatasourceTable };
