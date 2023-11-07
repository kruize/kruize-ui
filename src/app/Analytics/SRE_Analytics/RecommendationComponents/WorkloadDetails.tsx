import { TextContent, TextVariants, Text } from '@patternfly/react-core';
import React from 'react';

export const WorkloadDetails = ({ experimentData }) => {
  return (
    <TextContent>
      <Text component={TextVariants.h3}>Recommendations</Text>
      <Text component={TextVariants.h5}>{experimentData.container_name}</Text>
      <Text component={TextVariants.p} id="Workload_details">
        Cluster name: {experimentData.cluster_name}
        <br />
        Project name: {experimentData.namespace}
        <br />
        Workload type: {experimentData.type}
        <br />
        Workload name: {experimentData.name}
      </Text>
    </TextContent>
  );
};
