import { PageSection, PageSectionVariants, TextContent, TextVariants, Text } from '@patternfly/react-core';
import React from 'react';
import { BarChart } from '@app/Components/BarChart';
import jsonData from '@app/Data/data.json';

const ClusterSummaryCharts = () => {
  // return (
  //     <PageSection variant={PageSectionVariants.light}>
  //          <TextContent>
  //             <Text component={TextVariants.h1}>
  //     Cluster name
  //             </Text>
  //         </TextContent>
  //       </PageSection>
  // )

  // Extracting the first timestamp from the data object
  const firstTimestamp = Object.keys(jsonData.summary.data)[0];

  // Extracting the values for increase, decrease, and variation amounts for CPU for the first timestamp
  const increaseAmountCPU =
    jsonData.summary.data[firstTimestamp].duration_based.short_term.change.increase.requests.cpu.amount;
  const decreaseAmountCPU =
    jsonData.summary.data[firstTimestamp].duration_based.short_term.change.decrease.requests.cpu.amount;
  const variationAmountCPU =
    jsonData.summary.data[firstTimestamp].duration_based.short_term.change.variation.requests.cpu.amount;

  const data = [
    { name: 'increase', x: jsonData.cluster_name, y: increaseAmountCPU },

    { name: 'decrease', x: jsonData.cluster_name, y: decreaseAmountCPU },

    { name: 'variation', x: jsonData.cluster_name, y: variationAmountCPU }
  ];
  const legendData = [{ name: 'increase' }, { name: 'decrease' }, { name: 'variation' }];

  const domain = { y: [0, 9] };

  const domainPadding = { x: [30, 25] };

  return (
    <div>
      <h1>{jsonData.cluster_name}</h1>
      <BarChart
        data={data}
        title="Pets"
        legendData={legendData}
        domain={domain}
        domainPadding={domainPadding}
        width={600}
        height={300}
      />
    </div>
  );
};

export { ClusterSummaryCharts };
