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
import { CostHistoricCharts } from './CostHistoricCharts';
import { addPlusSign } from './ChartDataPreparation';
import BoxPlot from './BoxPlot/BoxPlot';
import { ChartThreshold } from '@patternfly/react-charts';
import { CostBoxPlotCharts } from './CostBoxPlotCharts';

const CostDetails = (props: { recommendedData; currentData; chartData; day; endtime; displayChart; boxPlotData }) => {
  console.log(props.recommendedData);

  const NumberFormat = (number) =>
    typeof number === 'number' && !isNaN(number) ? (number % 1 !== 0 ? number.toFixed(3) : number) : '';

  const UnitFormat = (unit) => unit || '';

  const current_code = `resources: 
  requests: 
    memory: "${NumberFormat(props.currentData[0]?.requests?.memory?.amount)}${UnitFormat(
      props.currentData[0]?.requests?.memory?.format
    )}" 
    cpu: "${NumberFormat(props.currentData[0]?.requests?.cpu?.amount)}" 
  limits: 
    memory: "${NumberFormat(props.currentData[0]?.limits?.memory?.amount)}${UnitFormat(
      props.currentData[0]?.limits?.memory?.format
    )}" 
    cpu: "${NumberFormat(props.currentData[0]?.limits?.cpu?.amount)}"`;

  const recommended_code = `resources: 
  requests: 
    memory: "${NumberFormat(
      props.recommendedData[0]?.recommendation_engines?.cost?.config?.requests?.memory?.amount
    )}${UnitFormat(
      props.recommendedData[0]?.recommendation_engines?.cost?.config?.requests?.memory?.format
    )}"    # ${addPlusSign(
      NumberFormat(props.recommendedData[0]?.recommendation_engines?.cost?.variation?.requests?.memory?.amount)
    )}${UnitFormat(props.recommendedData[0]?.recommendation_engines?.cost?.variation?.requests?.memory?.format)}
    cpu: "${NumberFormat(
      props.recommendedData[0]?.recommendation_engines?.cost?.config?.requests?.cpu?.amount
    )}"            # ${addPlusSign(
      NumberFormat(props.recommendedData[0]?.recommendation_engines?.cost?.variation?.requests?.cpu?.amount)
    )}
  limits: 
    memory: "${NumberFormat(
      props.recommendedData[0]?.recommendation_engines?.cost?.config?.limits?.memory?.amount
    )}${UnitFormat(
      props.recommendedData[0]?.recommendation_engines?.cost?.config?.limits?.memory?.format
    )}"    # ${addPlusSign(
      NumberFormat(props.recommendedData[0]?.recommendation_engines?.cost?.variation?.limits?.memory?.amount)
    )}${UnitFormat(props.recommendedData[0]?.recommendation_engines?.cost?.variation?.limits?.memory?.format)}   
    cpu: "${NumberFormat(
      props.recommendedData[0]?.recommendation_engines?.cost?.config?.limits?.cpu?.amount
    )}"            # ${addPlusSign(
      NumberFormat(props.recommendedData[0]?.recommendation_engines?.cost?.variation?.limits?.cpu?.amount)
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
      <CostBoxPlotCharts boxPlotData={props.boxPlotData} limitRequestData={props.recommendedData[0]?.recommendation_engines?.cost?.config} />

      {props.displayChart && <CostHistoricCharts chartData={props.chartData} day={props.day} endtime={props.endtime} />}
    </PageSection>
  );
};

export { CostDetails };
