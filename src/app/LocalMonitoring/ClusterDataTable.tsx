import {
  TextContent,
  OverflowMenu,
  OverflowMenuContent,
  OverflowMenuGroup,
  OverflowMenuItem,
  Button
} from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import React, { useState } from 'react';

const ClusterDataTable = (props: { clusterSpecificData }) => {
  const clusterSpecificData = props.clusterSpecificData;
  // console.log(clusterSpecificData)
  // const cluterData = Object.entries(clusterSpecificData).forEach([key,  => {
  //     console.log(key)

  //     return

  // })
  // console.log(cluterData)
  return (
    <React.Fragment>
      <TextContent> Cluster Table</TextContent>
      <Table aria-label="Cluster Table">
        <Thead>
          <Tr>
            <Th>Cluster Name</Th>
            <Th>Namespace</Th>
            <Th>Workloads</Th>
            <Th>Containers</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* {clusterSpecificData &&
            Object.keys(clusterSpecificData).map((clusterName, index) => (
              // console.log(clusterName)
              // console.log(source)
              <Tr key={index}>
                <Td dataLabel="Cluster Name">{clusterSpecificData[clusterName]}</Td>
              </Tr>
            ))} */}

          {/*  {   Object.values(source.namespaces).map((namespace : any) => (
            <React.Fragment key={namespace.namespace}>
            <Td dataLabel="Namespace">{namespace.namespace}</Td>
           
           { Object.values(namespace.workloads).map((workload : any) => (
            <React.Fragment key={workload.workload_name}>
                <Td dataLabel="Workloads">{workload.workload_name}</Td>

            {
                Object.values(workload.containers).map((container : any) => (
                    <React.Fragment key={container.container_name}>
                    <Td dataLabel="Containers">{container.container_name}</Td>

                    </React.Fragment>   ))}
                </React.Fragment>  ))}
              </React.Fragment>))}
              </Tr>
          ))} */}
          {/* <Td isActionCell>
              <OverflowMenu breakpoint="lg">
                  <OverflowMenuContent>
                    <OverflowMenuGroup groupType="button">
                      <OverflowMenuItem>
                        <Button variant="secondary">Create Experiment</Button>
                      </OverflowMenuItem>
                      <OverflowMenuItem>
                        <Button variant="secondary" isDisabled>View Experiment</Button>
                      </OverflowMenuItem>
                      </OverflowMenuGroup>
                      </OverflowMenuContent>
                      </OverflowMenu>
              </Td> */}
        </Tbody>
      </Table>
    </React.Fragment>
  );
};

export { ClusterDataTable };
