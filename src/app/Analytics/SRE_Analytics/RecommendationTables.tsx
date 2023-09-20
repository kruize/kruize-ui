import { TextContent, TextVariants, Flex, FlexItem, FormSelect, FormSelectOption, Text } from '@patternfly/react-core';
import { TableComposable, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import React, { useEffect, useState } from 'react';
import { getRecommendationsURL, getRecommendationsURLWithParams } from '@app/CentralConfig';
import { WorkloadDetails } from './ReccomendationComponents/WorkloadDetails';

const TableShort = ({ parameter }) => {
  const columnNames = {
    containers: 'Containers',
    short_term: 'Short Term',
    medium_term: 'Medium Term',
    long_term: 'Long Term',
    cpuRequestS: 'CPU Request',
    mmrRequestS: 'Mem Request',
    cpuRequestM: 'CPU Request',
    mmrRequestM: 'Mem Request',
    cpuRequestL: 'CPU Request',
    mmrRequestL: 'Mem Request'
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
              <Td dataLabel={columnNames.containers} textCenter>
                {containerName}
              </Td>

              <Td dataLabel={columnNames.cpuRequestS} textCenter>
                {parameter.dataA[index]?.duration_based?.short_term?.config.requests.cpu.amount !== undefined &&
                parameter.dataA[index]?.duration_based?.short_term?.config.requests.cpu.format !== undefined
                  ? parameter.dataA[index]?.duration_based?.short_term?.config.requests.cpu.amount.toFixed(3) +
                    ' ' +
                    parameter.dataA[index]?.duration_based?.short_term?.config.requests.cpu.format
                  : NaN}{' '}
              </Td>

              <Td dataLabel={columnNames.mmrRequestS} textCenter>
                {parameter.dataA[index]?.duration_based?.short_term?.config?.requests?.memory.amount !== undefined &&
                parameter.dataA[index]?.duration_based?.short_term?.config?.requests?.memory.format !== undefined
                  ? parameter.dataA[index]?.duration_based?.short_term?.config?.requests?.memory.amount.toFixed(3) +
                    ' ' +
                    parameter.dataA[index]?.duration_based?.short_term?.config?.requests?.memory.format
                  : NaN}{' '}
              </Td>
              <Td dataLabel={columnNames.cpuRequestM} textCenter>
                {parameter.dataA[index]?.duration_based?.medium_term?.config?.requests?.cpu?.amount !== undefined &&
                parameter.dataA[index]?.duration_based?.medium_term?.config?.requests?.cpu?.format !== undefined
                  ? parameter.dataA[index]?.duration_based?.medium_term?.config?.requests?.cpu?.amount.toFixed(3) +
                    ' ' +
                    parameter.dataA[index]?.duration_based?.medium_term?.config?.requests?.cpu?.format
                  : NaN}{' '}
              </Td>
              <Td dataLabel={columnNames.mmrRequestM} textCenter>
                {parameter.dataA[index]?.duration_based?.medium_term?.config?.requests.memory.amount !== undefined &&
                parameter.dataA[index]?.duration_based?.medium_term?.config?.requests.memory.format !== undefined
                  ? parameter.dataA[index]?.duration_based?.medium_term?.config?.requests.memory.amount.toFixed(3) +
                    ' ' +
                    parameter.dataA[index]?.duration_based?.medium_term?.config?.requests?.memory?.format
                  : NaN}{' '}
              </Td>
              <Td dataLabel={columnNames.cpuRequestL} textCenter>
                {parameter.dataA[index]?.duration_based?.long_term?.config?.requests.cpu.amount !== undefined &&
                parameter.dataA[index]?.duration_based?.long_term?.config?.requests.cpu.format !== undefined
                  ? parameter.dataA[index]?.duration_based?.long_term?.config?.requests.cpu.amount.toFixed(3) +
                    ' ' +
                    parameter.dataA[index]?.duration_based?.long_term?.config?.requests?.cpu?.format
                  : NaN}{' '}
              </Td>
              <Td dataLabel={columnNames.mmrRequestL} textCenter>
                {parameter.dataA[index]?.duration_based?.long_term?.config?.requests.memory.amount !== undefined &&
                parameter.dataA[index]?.duration_based?.long_term?.config?.requests.memory.format !== undefined
                  ? parameter.dataA[index]?.duration_based?.long_term?.config?.requests.memory.amount.toFixed(3) +
                    ' ' +
                    parameter.dataA[index]?.duration_based?.long_term?.config?.requests?.memory?.format
                  : NaN}{' '}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </TableComposable>
    </React.Fragment>
  );
};

const RecommendationTables = (props: { endTimeArray; setEndTimeArray; SREdata; setSREdata }) => {
  // @ts-ignore
  const list_recommendations_url: string = getRecommendationsURLWithParams(
    sessionStorage.getItem('Experiment Name') || '',
    'false'
  );

  const [endtime, setEndtime] = useState<any | null>('');

  const [data, setdata] = useState<any | null>('');

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (props.endTimeArray) {
      fetchRecommendationData(props.endTimeArray[0]);
    }
  }, [props.endTimeArray]);

  const onChange = async (value: string) => {
    setEndtime(value);
    fetchRecommendationData(value);
  };

  const fetchRecommendationData = async (value) => {
    const response = await fetch(list_recommendations_url);
    const data = await response.json();
    const arr: any = [];

    data[0].kubernetes_objects[0].containers.map((container_name, index) => {
      arr.push(data[0].kubernetes_objects[0].containers[index].recommendations?.data[value]);
    });

    setdata(arr);
  };

  useEffect(() => {
    if (props.endTimeArray === null) {
      setShow(false);
      return () => {
        <TextContent>
          <Text component={TextVariants.h3}>No time stamp no recommendation</Text>
        </TextContent>;
      };
    } else {
      setShow(true);
      return () => {
        <TextContent>
          <Text component={TextVariants.h3}>recommendation avaliable</Text>
        </TextContent>;
      };
    }
  }, [props.endTimeArray]);

  return (
    <>
      <WorkloadDetails
        experimentData={{
          experiment_name: props.SREdata.experiment_name,
          namespace: props.SREdata.namespace,
          name: props.SREdata.name,
          type: props.SREdata.type,
          cluster_name: props.SREdata.cluster_name,
          container_name: props.SREdata.container_name
        }}
      />
      <br />

      {show && (
        <>
          <Flex>
            <FlexItem>
              <TextContent>
                <Text component={TextVariants.h3}>Monitoring End Time</Text>
              </TextContent>
              <br />
              <FormSelect value={endtime} onChange={onChange} aria-label="FormSelect Input">
                {props.endTimeArray &&
                  props.endTimeArray.map((option, index) => (
                    <FormSelectOption key={index} value={option} label={option} />
                  ))}
              </FormSelect>
            </FlexItem>
          </Flex>
          <br /> <br />
          <TextContent>
            <Text component={TextVariants.h3}>Duration Based Recommendations</Text>
          </TextContent>
          <br />
          <TableShort
            parameter={{
              containerArray: props.SREdata.containerArray,
              dataA: data
            }}
          />
        </>
      )}
    </>
  );
};

export { RecommendationTables };
