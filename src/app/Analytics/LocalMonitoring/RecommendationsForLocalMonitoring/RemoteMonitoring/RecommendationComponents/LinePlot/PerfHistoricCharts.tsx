import React from 'react';
import { Chart, ChartAxis, ChartGroup, ChartLine, ChartVoronoiContainer } from '@patternfly/react-charts';
import { formatTimestamps, filterDataByTerm, formatNumber } from './ChartDataPreparation';
import {
  Grid,
  Text,
  GridItem,
  PageSection,
  PageSectionVariants,
  TextContent,
  TextVariants
} from '@patternfly/react-core';

const PerfHistoricCharts = (props: { chartData; day; endtime }) => {
  const termFilteredData = filterDataByTerm(props.chartData, props.endtime, props.day);
  const timeStampFormattedData = formatTimestamps(termFilteredData);

  const cpuChart = () => {
    const historicdata = Object.entries(timeStampFormattedData).map(([key, value]) => {
      const cpuAmount = formatNumber(
        (value as any).recommendation_terms[props.day]?.recommendation_engines?.performance?.config?.requests?.cpu
          ?.amount
      );
      const displayKey = props.day === 'short_term' ? key.split(' ')[1] : key.split(' ')[0];
      return {
        name: 'CPU',
        x: displayKey,
        y: cpuAmount
      };
    });

    const filteredhistoricdata = historicdata.filter((dataPoint) => typeof dataPoint.y === 'number');

    return (
      <PageSection variant={PageSectionVariants.light}>
        <div style={{ height: '250px', width: '600px' }}>
          <TextContent>
            <Text component={TextVariants.h3}>Historic CPU Recommendations</Text>
          </TextContent>
          <Chart
            ariaDesc="CPU Recommendations"
            ariaTitle="Recommendation Values"
            containerComponent={
              <ChartVoronoiContainer
                labels={({ datum }) => `${datum.name}: ${datum.y} : ${datum.x}`}
                constrainToVisibleArea
              />
            }
            legendData={[{ name: 'CPU' }]}
            legendOrientation="vertical"
            legendPosition="right"
            height={250}
            name="Performance CPU Recommendations"
            domainPadding={{ y: [30, 25], x: [30, 25] }}
            padding={{
              bottom: 70,
              left: 100,
              right: 100,
              top: 50
            }}
            width={600}
          >
            <ChartAxis
              tickCount={7}
              style={{
                tickLabels: {
                  angle: -45,
                  transform: 'translate(-20, 10)',
                  textAnchor: 'end',
                  fontSize: 12,
                  margin: '50px 0',
                  paddingTop: '10px'
                } // Add margin to adjust distance
              }}
            />
            <ChartAxis
              dependentAxis
              showGrid
              label="cores"
              tickFormat={(d) => formatNumber(d)}
              style={{
                axisLabel: { padding: 60 } // Adjust the value to control the padding
              }}
            />

            <ChartGroup>
              <ChartLine data={filteredhistoricdata} />
            </ChartGroup>
          </Chart>
        </div>
      </PageSection>
    );
  };
  const memoryChart = () => {
    const historicdata = Object.entries(timeStampFormattedData).map(([key, value]) => {
      const memoryAmount = formatNumber(
        (value as any).recommendation_terms[props.day]?.recommendation_engines?.performance?.config?.requests?.memory
          ?.amount
      );
      const displayKey = props.day === 'short_term' ? key.split(' ')[1] : key.split(' ')[0];
      return {
        name: 'Memory',
        x: displayKey,
        y: memoryAmount
      };
    });

    const filteredhistoricdata = historicdata.filter((dataPoint) => typeof dataPoint.y === 'number');

    return (
      <PageSection variant={PageSectionVariants.light}>
        <div style={{ height: '250px', width: '600px' }}>
          <TextContent>
            <Text component={TextVariants.h3}>Historic Memory Recommendations</Text>
          </TextContent>
          <Chart
            ariaDesc="Memory Recommendations"
            ariaTitle="Recommendation Values"
            containerComponent={
              <ChartVoronoiContainer
                labels={({ datum }) => `${datum.name}: ${datum.y} : ${datum.x}`}
                constrainToVisibleArea
              />
            }
            legendData={[{ name: 'Memory' }]}
            legendOrientation="vertical"
            legendPosition="right"
            height={250}
            name="Performance Memory Recommendations"
            domainPadding={{ y: [30, 25], x: [30, 25] }}
            padding={{
              bottom: 70,
              left: 100,
              right: 100,
              top: 50
            }}
            width={600}
          >
            <ChartAxis
              tickCount={7}
              style={{
                tickLabels: {
                  angle: -45,
                  transform: 'translate(-20, 10)',
                  textAnchor: 'end',
                  fontSize: 12,
                  margin: '50px 0',
                  paddingTop: '10px'
                } // Add margin to adjust distance
              }}
            />
            <ChartAxis
              dependentAxis
              showGrid
              label="Mibs"
              tickFormat={(d) => formatNumber(d)}
              style={{
                axisLabel: { padding: 60 } // Adjust the value to control the padding
              }}
            />

            <ChartGroup>
              <ChartLine data={filteredhistoricdata} />
            </ChartGroup>
          </Chart>
        </div>
      </PageSection>
    );
  };

  return (
    <Grid hasGutter>
      <GridItem span={6} rowSpan={8}>
        {cpuChart()}
      </GridItem>
      <GridItem span={6} rowSpan={8}>
        {memoryChart()}
      </GridItem>
    </Grid>
  );
};

export { PerfHistoricCharts };
