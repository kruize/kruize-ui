import nodeContext from '@app/ContextStore/nodeContext';
import { duration } from '@material-ui/core';
import { TextContent, TextVariants, Flex, FlexItem, FormSelect, FormSelectOption, Text, Form, FormGroup } from '@patternfly/react-core';
import { end } from '@patternfly/react-core/dist/esm/helpers/Popper/thirdparty/popper-core';
import { TableComposable, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import React, { useContext, useEffect, useState } from 'react'

interface ReccoTable {
  containers: string ;
  short_term: {
   cpuRequest: string | null;
   mmrRequest: string | null;
  };
  medium_term: {
   cpuRequest: string | null;
   mmrRequest: string | null;
  };
  long_term: {
   cpuRequest: string | null;
   mmrRequest: string | null;
  }
 }

const WorkloadTable = ({ experimentData}) => {

  const columnNames = {
    exp_name: 'Experiment Name',
    workload: 'Workload',
    namespace: 'Namespace',
    name: 'Name',
    type: 'Type'
  }

  return (
    <React.Fragment>
       <TableComposable aria-label="Nested column headers table" gridBreakPoint="" isStickyHeader>
        <Thead hasNestedHeader>
          <Tr>
            <Th hasRightBorder textCenter colSpan={1}>
              {columnNames.exp_name}
            </Th>
            <Th hasRightBorder textCenter colSpan={3}>
              {columnNames.workload}
            </Th>
            </Tr>
            
            <Tr>
            <Th hasRightBorder />
            <Th isSubheader hasRightBorder textCenter>
              {columnNames.namespace}
            </Th>
            <Th isSubheader hasRightBorder textCenter>
              {columnNames.name}
            </Th>
            <Th isSubheader hasRightBorder textCenter>
              {columnNames.type}
            </Th>
            </Tr>

            </Thead>
            <Tbody>
            <Tr key={experimentData.experiment_name}>
            <Td dataLabel={columnNames.exp_name} textCenter>{experimentData.experiment_name}</Td>
            <Td dataLabel={columnNames.namespace} textCenter>{experimentData.namespace}</Td>
            <Td dataLabel={columnNames.name} textCenter>{experimentData.name}</Td>
            <Td dataLabel={columnNames.type} textCenter>{experimentData.type}</Td>
            </Tr>
            </Tbody>
            </TableComposable>
            </React.Fragment>
  )
} 


const TableShort = ({ parameter }) => {

  const columnNames = {
    containers: 'Containers',
    short_term: 'Short Term Recommendations',
    medium_term: 'Medium Term Recommendations',
    long_term: 'Long Term Recommendations',
    cpuRequestS: 'CPU Request',
    mmrRequestS: 'Mem Request',
    cpuRequestM: 'CPU Request',
    mmrRequestM: 'Mem Request',
    cpuRequestL: 'CPU Request',
    mmrRequestL: 'Mem Request',
  };

  return (
    <React.Fragment>
       <TableComposable aria-label="Nested column headers table" gridBreakPoint="" isStickyHeader>
        <Thead hasNestedHeader>
          <Tr>
            <Th hasRightBorder textCenter colSpan={1}>
              {columnNames.containers}
            </Th>
            <Th hasRightBorder textCenter colSpan={2}>
              {columnNames.short_term}
            </Th>
            <Th hasRightBorder textCenter colSpan={2}>
              {columnNames.medium_term}
            </Th>
            <Th hasRightBorder textCenter colSpan={2}>
              {columnNames.long_term}
            </Th>
          </Tr>
          <Tr>
            <Th hasRightBorder />
            <Th isSubheader hasRightBorder textCenter>
              {columnNames.cpuRequestS}
            </Th>
            <Th isSubheader hasRightBorder textCenter>
              {columnNames.mmrRequestS}
            </Th>
            <Th isSubheader hasRightBorder textCenter>
              {columnNames.cpuRequestM}
            </Th>
            <Th isSubheader hasRightBorder textCenter>
              {columnNames.mmrRequestM}
            </Th>
            <Th isSubheader hasRightBorder textCenter>
              {columnNames.cpuRequestL}
            </Th>
            <Th isSubheader hasRightBorder textCenter>
              {columnNames.mmrRequestL}
            </Th>
           
       </Tr>   
        </Thead>
        <Tbody>
        {parameter.containerArray.map((containerName, index) => (
          <Tr key={index}>
            <Td dataLabel={columnNames.containers} textCenter>{containerName}</Td>
            <Td dataLabel={columnNames.cpuRequestS} textCenter>{parameter.s_cpu_req} </Td>
            <Td dataLabel={columnNames.mmrRequestS} textCenter>{parameter.s_mmr_req} </Td>
            <Td dataLabel={columnNames.cpuRequestM} textCenter>{parameter.m_cpu_req} </Td>
            <Td dataLabel={columnNames.mmrRequestM} textCenter>{parameter.m_mmr_req} </Td>
            <Td dataLabel={columnNames.cpuRequestL} textCenter>{parameter.l_cpu_req} </Td>
            <Td dataLabel={columnNames.mmrRequestL} textCenter>{parameter.l_mmr_req} </Td>
          </Tr>
        ))}
        </Tbody>
      </TableComposable>
    </React.Fragment>
  );
};

const RecommendationTables = (props: { endTimeArray; setEndTimeArray; SREdata; setSREdata }) => {

  const Context = useContext(nodeContext);
  const ip = Context['cluster'];
  const port = Context['autotune'];
  const list_recommendations_url = 'http://' + ip + ':' + port + '/listRecommendations?experiment_name=' + sessionStorage.getItem('Experiment Name') + '&latest=false';
  const [endtime, setEndtime] = useState<any | null>('');
const [recommendationKind, setRecommendationKind] = useState(sessionStorage.getItem('Recommendation Type'))
const [contName, setContName] = useState(props.SREdata.containerArray)

  const onChange = async (value: string) => {
    setEndtime(value)
    
    // try {
      
    // const response = await fetch(list_recommendations_url);
  //   const dataArray1 : any[] = [];
  //   const data = await response.json();
  //   data.forEach(item => {
  //     dataArray1.push(item);
  //   });
  //   const dataArray = dataArray1[0].kubernetes_objects[0].containers[0].recommendations.data[value]

  //   console.log(dataArray);
  // } catch (error) {
  //   console.error(error);
  // }


  const data = await (await fetch(list_recommendations_url)).json()

// var experiment_name = data[0].experiment_name


    var recommendation_data = data[0].kubernetes_objects[0].containers[0]
    var recommendation_type = recommendation_data.recommendations.notifications[0].message

   var short_term_cpu = recommendation_data.recommendations.data[value].duration_based.short_term.config.requests.cpu.amount + ' cores'
    var short_term_mmr = recommendation_data.recommendations.data[value].duration_based.short_term.config.requests.memory.amount + ' MiB'
   
    let medium_term_cpu, medium_term_mmr, long_term_cpu: string, long_term_mmr : string ;
try{
      medium_term_cpu = recommendation_data.recommendations.data[value].duration_based.medium_term.config.requests.cpu.amount + ' cores'
      medium_term_mmr = recommendation_data.recommendations.data[value].duration_based.medium_term.config.requests.memory.amount + ' MiB'
    }
    catch {
      medium_term_mmr = '-'
      medium_term_cpu = '-'
    }
   
try{
       long_term_cpu = recommendation_data.recommendations.data[value].duration_based.long_term.config.requests.cpu.amount + ' cores'
    long_term_mmr = recommendation_data.recommendations.data[value].duration_based.long_term.config.requests.memory.amount + ' MiB'
    }

    catch {
      long_term_cpu = '-'
      long_term_mmr = '-'
    }
    props.setSREdata({ ...{ ...props.SREdata }, recommendation_type: recommendation_type })
    props.setSREdata({ ...{ ...props.SREdata }, short_term_cpu_req: short_term_cpu, short_term_mmr_req: short_term_mmr
                                              , medium_term_cpu_req: medium_term_cpu, medium_term_mmr_req: medium_term_mmr
                                              , long_term_cpu_req: long_term_cpu, long_term_mmr_req: long_term_mmr
                                            })




 sessionStorage.setItem('Recommendation Type', recommendation_type);
  };

 
      return (
    <>
    <br />  
      <TextContent>
        <Text component={TextVariants.h1}>Recommendations</Text>
      </TextContent>  
      <br />  
      <WorkloadTable experimentData={{
        experiment_name: props.SREdata.experiment_name,
        namespace: props.SREdata.namespace,
        name: props.SREdata.name,
        type: props.SREdata.type

       } }/>
      <br /> 
      <Flex>
        <FlexItem>
          <TextContent>
            <Text component={TextVariants.h3}>Monitoring End Time</Text>
          </TextContent>
          <FormSelect value={endtime} onChange={onChange} aria-label="FormSelect Input">
            {props.endTimeArray != null ? props.endTimeArray.map((option, index) => (
              <FormSelectOption key={index} value={option} label={option} />
            ))

              :
              <></>}

          </FormSelect>
        </FlexItem>
      </Flex>

      <br />  <br />
      <TextContent>
        <Text component={TextVariants.h3}>{recommendationKind}</Text>
      </TextContent> 
   
<br/>


        <TableShort parameter={{
          containerArray: props.SREdata.containerArray,
          s_cpu_req: props.SREdata.short_term_cpu_req,
          s_mmr_req: props.SREdata.short_term_mmr_req,
          m_cpu_req: props.SREdata.medium_term_cpu_req,
          m_mmr_req: props.SREdata.medium_term_mmr_req,
          l_cpu_req: props.SREdata.long_term_cpu_req,
          l_mmr_req: props.SREdata.long_term_mmr_req
        }} />

    </>
  );
}

export { RecommendationTables }


