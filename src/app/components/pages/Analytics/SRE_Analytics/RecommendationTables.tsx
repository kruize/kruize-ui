import nodeContext from '@app/components/common/ContextStore/nodeContext';
import { duration } from '@material-ui/core';
import {
  TextContent,
  TextVariants,
  Flex,
  FlexItem,
  FormSelect,
  FormSelectOption,
  Text,
  Form,
  FormGroup
} from '@patternfly/react-core';
import { end } from '@patternfly/react-core/dist/esm/helpers/Popper/thirdparty/popper-core';
import { TableComposable, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';
import React, { useContext, useEffect, useState } from 'react';

const WorkloadTable = ({ experimentData }) => {
  const columnNames = {
    exp_name: 'Experiment Name',
    workload: 'Workload',
    namespace: 'Namespace',
    name: 'Name',
    type: 'Type'
  };

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
            <Td dataLabel={columnNames.exp_name} textCenter>
              {experimentData.experiment_name}
            </Td>
            <Td dataLabel={columnNames.namespace} textCenter>
              {experimentData.namespace}
            </Td>
            <Td dataLabel={columnNames.name} textCenter>
              {experimentData.name}
            </Td>
            <Td dataLabel={columnNames.type} textCenter>
              {experimentData.type}
            </Td>
          </Tr>
        </Tbody>
      </TableComposable>
    </React.Fragment>
  );
};

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
                {parameter.dataA[index]?.duration_based?.short_term?.config.requests.cpu.amount.toPrecision(2) +
                  parameter.dataA[index]?.duration_based?.short_term?.config.requests.cpu.format}{' '}
              </Td>
              <Td dataLabel={columnNames.mmrRequestS} textCenter>
                {parameter.dataA[index]?.duration_based?.short_term?.config?.requests?.memory.amount +
                  parameter.dataA[index]?.duration_based?.short_term?.config?.requests?.memory.format}{' '}
              </Td>
              <Td dataLabel={columnNames.cpuRequestM} textCenter>
                {parameter.dataA[index]?.duration_based?.medium_term?.config?.requests?.cpu?.amount.toPrecision(2) +
                  parameter.dataA[index]?.duration_based?.medium_term?.config?.requests?.cpu?.format}{' '}
              </Td>
              <Td dataLabel={columnNames.mmrRequestM} textCenter>
                {parameter.dataA[index]?.duration_based?.medium_term?.config?.requests.memory.amount +
                  parameter.dataA[index]?.duration_based?.medium_term?.config?.requests?.memory?.format}{' '}
              </Td>
              <Td dataLabel={columnNames.cpuRequestL} textCenter>
                {parameter.dataA[index]?.duration_based?.long_term?.config?.requests.cpu.amount.toPrecision(2) +
                  parameter.dataA[index]?.duration_based?.long_term?.config?.requests?.cpu?.format}{' '}
              </Td>
              <Td dataLabel={columnNames.mmrRequestL} textCenter>
                {parameter.dataA[index]?.duration_based?.long_term?.config?.requests.memory.amount +
                  parameter.dataA[index]?.duration_based?.long_term?.config?.requests?.memory?.format}{' '}
              </Td>
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
  let k_url: string;

  if (ip) {
    k_url = ip + ':' + port;
  } else {
    k_url = 'kruize';
  }
  const list_recommendations_url =
    'http://' +
    k_url +
    '/listRecommendations?experiment_name=' +
    sessionStorage.getItem('Experiment Name') +
    '&latest=false';
  const [endtime, setEndtime] = useState<any | null>('');
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const fetchData = async (value) => {
    const response = await fetch(list_recommendations_url);
    const data = await response.json();
    const arr: any = [];

    data[0].kubernetes_objects[0].containers.map((container_name, index) => {
      arr.push(data[0].kubernetes_objects[0].containers[index].recommendations?.data[value]);
    });

    setData(arr);
  };

  const onChange = async (value: string) => {
    setEndtime(value);
    fetchData(value);
  };
  useEffect(() => {
    if (props.endTimeArray === null || props.endTimeArray.length === 1) {
      console.log(props.endTimeArray, 'no time stamps');
      setShow(false);
      return () => {
        <TextContent>
          <Text component={TextVariants.h3}>No time stamp no recommendation</Text>
        </TextContent>;
      };
    } else {
      console.log(props.endTimeArray, 'time spant');
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
      <br />
      <TextContent>
        <Text component={TextVariants.h1}>Recommendations</Text>
      </TextContent>
      <br />
      <WorkloadTable
        experimentData={{
          experiment_name: props.SREdata.experiment_name,
          namespace: props.SREdata.namespace,
          name: props.SREdata.name,
          type: props.SREdata.type
        }}
      />
      <br />

      {show ? (
        <>
          <Flex>
            <FlexItem>
              <TextContent>
                <Text component={TextVariants.h3}>Monitoring End Time</Text>
              </TextContent>
              <br />
              <FormSelect value={endtime} onChange={onChange} aria-label="FormSelect Input">
                {props.endTimeArray != null ? (
                  props.endTimeArray.map((option, index) => (
                    <FormSelectOption key={index} value={option} label={option} />
                  ))
                ) : (
                  <></>
                )}
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
      ) : (
        <></>
      )}
    </>
  );
};

export { RecommendationTables };
