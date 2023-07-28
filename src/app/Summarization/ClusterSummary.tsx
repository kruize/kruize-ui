import {
    ExpandableSection, PageSection, PageSectionVariants, TextContent, TextVariants, Text
  } from '@patternfly/react-core';
import React from 'react';
// import {ClusterSummarySettings} from './ClusterSummarySettings';
import { ClusterSummaryCharts } from './ClusterSumaryCharts';
import { ClusterSummarySettings } from './ClusterSummarySettings';
const ClusterSummary = () => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const onToggle = (isExpanded: boolean) => {
      setIsExpanded(isExpanded);
    };
  
    return (
        <PageSection variant={PageSectionVariants.light}>
             <TextContent>
    <Text component={TextVariants.h1}>Summarization Charts</Text>
    </TextContent>
      <ExpandableSection toggleText={isExpanded ? 'Hide Settings' : 'Settings'} onToggle={onToggle} isExpanded={isExpanded}>
        <ClusterSummarySettings/>
      </ExpandableSection>

      <ClusterSummaryCharts />
     </PageSection>
    );
}

export { ClusterSummary };
