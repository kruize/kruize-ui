import React from 'react';
import { Card, CardBody, Title, Text } from '@patternfly/react-core';
import { Chart, ChartAxis, ChartBar, ChartGroup, ChartVoronoiContainer } from '@patternfly/react-charts';

const BarChart = ({ data, title, legendData, domain, domainPadding, width, height }) => {
  return (
    <div style={{ height: `${height}px`, width: `${width}px` }}>
      <Chart
        ariaDesc={`Average number of ${title}`}
        ariaTitle="Bar chart example"
        containerComponent={
          <ChartVoronoiContainer labels={({ datum }) => `${datum.name}: ${datum.y}`} constrainToVisibleArea />
        }
        domain={domain}
        domainPadding={domainPadding}
        legendData={legendData}
        legendOrientation="vertical"
        legendPosition="bottom-left"
        height={height}
        name={`chart-${title}`}
        padding={{
          bottom: 100,
          left: 50,
          right: 100, // Adjusted to accommodate legend
          top: 50
        }}
        width={width}
      >
        <ChartGroup offset={11} horizontal>
          {legendData.map((legendItem) => (
            <ChartBar key={legendItem.name} data={data.filter((item) => item.name === legendItem.name)} />
          ))}
        </ChartGroup>
      </Chart>
    </div>
  );
};

export { BarChart };
