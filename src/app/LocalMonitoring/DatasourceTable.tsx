import { Button, OverflowMenu, OverflowMenuContent, OverflowMenuGroup, OverflowMenuItem, TextContent } from "@patternfly/react-core";
import { Table, Thead, Tr, Th, Tbody, Td } from "@patternfly/react-table";
import React, { useState } from "react";
import ClusterData from './ImportMeta.json';
import { ClusterGroupTables } from "./ClusterGroupTables";


const DatasourceTable = (props: {fetchDatasourcesData}) => {


   const [clusterGroupData, setClusteGroupData] = useState<any>();
   const handleImportMetadata = async (dataSourceName) => {
       // const payload = {
       //   version: "v1.0",
       //   datasource: dataSourceName
       // };


       // const response = await fetch('YOUR_API_ENDPOINT', {
       // method: 'POST',
       // headers: {
       //   'Content-Type': 'application/json',
       // },
       // body: JSON.stringify(payload)
       // });
  
       // const data = await response.json();
       const data = ClusterData;
       setClusteGroupData(ClusterData);
    //    console.log(data);
      
     };
  
  
   return(
       <React.Fragment>    
        <TextContent> 
        Data Sources Table</TextContent>
     <Table aria-label="Data Sources Table">
       <Thead>
         <Tr>
           <Th>DataSource Name</Th>
           <Th>Provider</Th>
           <Th>Service Name</Th>
           <Th>Namespace</Th>
           <Th>URL</Th>
           <Th>Actions</Th>
         </Tr>
       </Thead>
  <Tbody>
         {props.fetchDatasourcesData.datasources.map((source, index) => (
           <Tr key={index}>
             <Td dataLabel="DataSource Name">{source.name}</Td>
             <Td dataLabel="Provider">{source.provider}</Td>
             <Td dataLabel="Service Name">{source.serviceName}</Td>
             <Td dataLabel="Namespace">{source.namespace}</Td>
             <Td dataLabel="URL">{source.url}</Td>
             <Td isActionCell>
             <OverflowMenu breakpoint="lg">
                 <OverflowMenuContent>
                   <OverflowMenuGroup groupType="button">
                     <OverflowMenuItem>
                       <Button variant="secondary">View Datasource</Button>
                     </OverflowMenuItem>
                     <OverflowMenuItem>
                       <Button variant="secondary" onClick={() => handleImportMetadata(source.name)}>Import Metadata</Button>
                     </OverflowMenuItem>
                     </OverflowMenuGroup>
                     </OverflowMenuContent>
                     </OverflowMenu>
             </Td>
           </Tr>
         ))}
       </Tbody>
  
     </Table>
     <br /> <br/>
     {clusterGroupData ? <>
      <TextContent> Cluster Groups Table </TextContent>
     <ClusterGroupTables clusterGroupData = {clusterGroupData}/>
     </> : <></>}
   </React.Fragment>
   )


}


export {DatasourceTable};
