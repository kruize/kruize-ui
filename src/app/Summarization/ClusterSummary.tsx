import {
  ExpandableSection,
  PageSection,
  PageSectionVariants,
  TextContent,
  TextVariants,
  Text,
  FlexItem,
  Flex
} from '@patternfly/react-core';
import React from 'react';
import { ClusterSummaryCharts } from './ClusterSumaryCharts';
import { ClusterSummarySettings } from './ClusterSummarySettings';
import { ClusterSummaryTable } from './ClusterSummaryTable';

const ClusterSummary = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const onToggle = (isExpanded: boolean) => {
    setIsExpanded(isExpanded);
  };

  return (
    <PageSection variant={PageSectionVariants.light}>
      <Flex>
        <FlexItem>
          {' '}
          <TextContent>
            <Text component={TextVariants.h1}>Summarization Charts</Text>
          </TextContent>
        </FlexItem>
        <FlexItem>
          <ExpandableSection
            toggleText={isExpanded ? 'Hide Settings' : 'Settings'}
            onToggle={onToggle}
            isExpanded={isExpanded}
          >
            <ClusterSummarySettings />
          </ExpandableSection>
        </FlexItem>
      </Flex>
      <br />
      <Flex>
        <FlexItem>
          <ClusterSummaryTable />{' '}
        </FlexItem>
        <FlexItem>
          {' '}
          <ClusterSummaryCharts />
        </FlexItem>
      </Flex>
    </PageSection>
  );
};

export { ClusterSummary };
