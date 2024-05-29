import React from 'react';
import {
  Card,
  CardTitle,
  CardBody,
  PageSection,
  Grid,
  GridItem,
  Text,
  TextVariants,
  PageSectionVariants
} from '@patternfly/react-core';
import ReusableCodeBlock from './ReusableCodeBlock';
import { PerfHistoricCharts } from './PerfHistoricCharts';
import { addPlusSign } from './ChatDataPreparation';

const PerfDetails = (props: { recommendedData; currentData; chartData; day; endtime; displayChart }) => {
  //console.log(props.recommendedData[0]?.recommendation_engines.performance);

  const convertBytes = (bytes: string): string => {
    let value: any = parseFloat(bytes);
    let unit = 'Bytes';

    if (value >= 1024 ** 3) {
      value = (value / 1024 ** 3).toFixed(2);
      unit = 'Gi';
    } else if (value >= 1024 ** 2) {
      value = (value / 1024 ** 2).toFixed(2);
      unit = 'Mi';
    } else if (value >= 1024) {
      value = (value / 1024).toFixed(2);
      unit = 'Ki';
    }

    return `${value} ${unit}`;
  };

  const MemoryFormat = (number) => {
    if (!number) return '';
    return convertBytes(number);
  };

  const NumberFormat = (number) => {
    let parsedNo = parseFloat(number);
    if (!isNaN(parsedNo) && isFinite(parsedNo)) {
      if (Math.floor(parsedNo) !== parsedNo) {
        return parsedNo.toFixed(2);
      }
      return parsedNo.toString();
    }
    return '';
  };

  const current_code = `resources: 
  requests: 
    memory: "${MemoryFormat(props.currentData[0]?.requests?.memory?.amount)}" 
    cpu: "${NumberFormat(props.currentData[0]?.requests?.cpu?.amount)}" 
  limits: 
    memory: "${MemoryFormat(props.currentData[0]?.limits?.memory?.amount)}" 
    cpu: "${NumberFormat(props.currentData[0]?.limits?.cpu?.amount)}"`;

  const recommended_code = `resources: 
  requests: 
    memory: "${MemoryFormat(
      props.recommendedData[0]?.recommendation_engines?.performance?.config.requests.memory.amount
    )}"    # ${addPlusSign(
      MemoryFormat(props.recommendedData[0]?.recommendation_engines?.performance?.variation.requests.memory.amount)
    )}
    cpu: "${NumberFormat(
      props.recommendedData[0]?.recommendation_engines?.performance?.config.requests.cpu.amount
    )}"            # ${addPlusSign(
      NumberFormat(props.recommendedData[0]?.recommendation_engines?.performance?.variation.requests.cpu.amount)
    )}
  limits: 
    memory: "${MemoryFormat(
      props.recommendedData[0]?.recommendation_engines?.performance?.config.limits.memory.amount
    )}"    # ${addPlusSign(
      MemoryFormat(props.recommendedData[0]?.recommendation_engines?.performance?.variation.limits.memory.amount)
    )}   
    cpu: "${NumberFormat(
      props.recommendedData[0]?.recommendation_engines?.performance?.config.limits.cpu.amount
    )}"            # ${addPlusSign(
      NumberFormat(props.recommendedData[0]?.recommendation_engines?.performance?.variation.limits.cpu.amount)
    )}`;

  return (
    <PageSection variant={PageSectionVariants.light}>
      <Grid hasGutter>
        <GridItem span={6} rowSpan={8}>
          <Card ouiaId="BasicCard" isFullHeight>
            <CardTitle>Current State</CardTitle>
            <CardBody>
              <Text component={TextVariants.h5}>Current Configuration</Text>
              <ReusableCodeBlock code={current_code} includeActions={false} />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem span={6} rowSpan={8}>
          <Card ouiaId="BasicCard">
            <CardTitle>Recommendation</CardTitle>
            <CardBody>
              <Text component={TextVariants.h5}>Recommended Configuration + #Delta</Text>
              <ReusableCodeBlock code={recommended_code} includeActions={true} />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
      {props.displayChart && <PerfHistoricCharts chartData={props.chartData} day={props.day} endtime={props.endtime} />}{' '}
    </PageSection>
  );
};
export { PerfDetails };
