import { TextContent, TextVariants, Text, CardTitle, CardBody, Card } from '@patternfly/react-core';
import React from 'react';

export const WorkloadDetails = ({ experimentData }) => {
  return (
    <TextContent>
      <Text component={TextVariants.h3}>Recommendations</Text>
      <Card style={{ width: '500px'}}>
        <CardBody>
      <Text component={TextVariants.h5}>{experimentData.container_name ? experimentData.container_name : experimentData.namespace}</Text>
      <Text component={TextVariants.p}>
        Cluster name: {experimentData.cluster_name}
        <br />
        Project name: {experimentData.namespace}
        <br />
        {experimentData.type && (
            <>
              Workload type: {experimentData.type}
              <br />
            </>
          )}
        {experimentData.name && (
            <>
              Workload name: {experimentData.name}
              <br />
            </>
          )}
        Experiment type: {experimentData.experiment_type}
      </Text>
      </CardBody>
      </Card>
    </TextContent>
  );
};
