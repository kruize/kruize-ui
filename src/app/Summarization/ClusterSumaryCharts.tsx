import {
  PageSection,
  PageSectionVariants,
  TextContent,
  TextVariants,
  Text,
  Flex,
  FlexItem
} from '@patternfly/react-core';
import React from 'react';
import { BarChart } from '@app/Components/BarChart';
import jsonData from '@app/Data/data.json';

const ClusterSummaryCharts = () => {
  const firstTimestamp = Object.keys(jsonData.summary.data)[0];

  // Extracting the values for increase, decrease, and variation amounts for CPU for the first timestamp
  const increaseAmountCPU =
    jsonData.summary.data[firstTimestamp].duration_based.short_term.change.increase.requests.cpu.amount;
  const decreaseAmountCPU =
    jsonData.summary.data[firstTimestamp].duration_based.short_term.change.decrease.requests.cpu.amount;
  const variationAmountCPU =
    jsonData.summary.data[firstTimestamp].duration_based.short_term.change.variation.requests.cpu.amount;

  const data = [
    { name: 'increase', x: 'C1', y: increaseAmountCPU },

    { name: 'decrease', x: 'C1', y: decreaseAmountCPU }
  ];
  const legendData = [{ name: 'increase' }, { name: 'decrease' }];

  const domain = { y: [0, 8] };

  const domainPadding = { x: [30, 25] };

  return (
    <div>
      <h1>{jsonData.cluster_name} - C1</h1>
      <Flex>
        <FlexItem>
          <BarChart
            data={data}
            title="inc-dec"
            legendData={legendData}
            domain={domain}
            domainPadding={domainPadding}
            width={350}
            height={300}
          />
        </FlexItem>
        <FlexItem>
          <BarChart
            data={[{ name: 'variation', x: 'C1', y: variationAmountCPU }]}
            title="variation"
            legendData={[{ name: 'variation' }]}
            domain={domain}
            domainPadding={domainPadding}
            width={350}
            height={300}
          />
        </FlexItem>
      </Flex>
    </div>
  );
};

export { ClusterSummaryCharts };
