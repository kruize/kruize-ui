import {
  TextContent,
  OverflowMenu,
  OverflowMenuContent,
  OverflowMenuGroup,
  OverflowMenuItem,
  Button,
  CodeBlockAction,
  ClipboardCopyButton,
  CodeBlock,
  CodeBlockCode
} from '@patternfly/react-core';
import { PlayIcon } from '@patternfly/react-icons';
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
  {/* {clusterSpecificData && Object.keys(clusterSpecificData).map((clusterGroupName, index) => (
    Object.keys(clusterSpecificData[clusterGroupName].clusters).map((clusterName, clusterIndex) => (
      Object.values(clusterSpecificData[clusterGroupName].clusters[clusterName].namespaces).map((namespace: any) => (
        <Tr key={`${index}-${clusterIndex}-${namespace.namespace}`}>
          <Td dataLabel="Cluster Group Name">{clusterGroupName}</Td>
          <Td dataLabel="Cluster Name">{clusterName}</Td>
          <Td dataLabel="Namespace">{namespace.namespace}</Td>
          {Object.values(namespace.workloads).map((workload: any, workloadIndex) => (
            <React.Fragment key={`${index}-${clusterIndex}-${namespace.namespace}-${workloadIndex}`}>
              <Td dataLabel="Workload Name">{workload.workload_name}</Td>
              {Object.values(workload.containers).map((container: any, containerIndex) => (
                <Td key={`${index}-${clusterIndex}-${namespace.namespace}-${workloadIndex}-${containerIndex}`} dataLabel="Container Name">{container.container_name}</Td>
              ))}
            </React.Fragment>
          ))}
        </Tr>
      ))
    ))
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
