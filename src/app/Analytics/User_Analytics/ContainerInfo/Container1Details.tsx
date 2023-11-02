import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionToggle,
  Text,
  TextVariants,
  TextContent,
  NotificationDrawerListItem,
  NotificationDrawerListItemBody,
  NotificationDrawerListItemHeader,
  NotificationDrawer,
  PageSection,
  PageSectionVariants,
  Divider,
  Icon
} from '@patternfly/react-core';
import { CostTable } from './CostTable';
import { VerticalSlider } from './VerticalSlider';
import { BalanceTable } from './BalanceTable';
import { PerformanceTable } from './PerformanceTable';
import { WrenchIcon } from '@patternfly/react-icons';

const Container1Details = () => {
  const [expanded, setExpanded] = React.useState('');

  const onToggle = (id: string) => {
    if (id === expanded) {
      setExpanded('');
    } else {
      setExpanded(id);
    }
  };
  const [expanded2, setExpanded2] = React.useState('');

  const onTogglee = (id: string) => {
    if (id === expanded2) {
      setExpanded2('');
    } else {
      setExpanded2(id);
    }
  };
  const detailedRecommendationsTable = () => {
    return (
      <Accordion asDefinitionList={false}>
        <AccordionItem>
          <AccordionToggle
            onClick={() => {
              onToggle('ex-toggle1');
            }}
            isExpanded={expanded === 'ex-toggle1'}
            id="ex-toggle1"
          >
            <TextContent>
              <Text component={TextVariants.h2}>Short Term</Text>
            </TextContent>
          </AccordionToggle>
          <AccordionContent id="ex-expand1" isHidden={expanded !== 'ex-toggle1'}>
            <CostTable />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          <AccordionToggle
            onClick={() => {
              onToggle('ex-toggle2');
            }}
            isExpanded={expanded === 'ex-toggle2'}
            id="ex-toggle2"
          >
            <TextContent>
              <Text component={TextVariants.h2}>Medium Term</Text>
            </TextContent>
          </AccordionToggle>
          <AccordionContent id="ex-expand2" isHidden={expanded !== 'ex-toggle2'}>
            <BalanceTable />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          <AccordionToggle
            onClick={() => {
              onToggle('ex-toggle3');
            }}
            isExpanded={expanded === 'ex-toggle3'}
            id="ex-toggle3"
          >
            <TextContent>
              <Text component={TextVariants.h2}>Long Term</Text>
            </TextContent>
          </AccordionToggle>
          <AccordionContent id="ex-expand3" isHidden={expanded !== 'ex-toggle3'}>
            <PerformanceTable />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  };

  const detectedIssues = () => {
    return (
      <NotificationDrawer>
        <NotificationDrawerListItem variant="info">
          <NotificationDrawerListItemHeader
            variant="info"
            title="Info Notification"
            srTitle="Info notification:"
          ></NotificationDrawerListItemHeader>
          <NotificationDrawerListItemBody>Recommendation valid for 24hrs</NotificationDrawerListItemBody>
        </NotificationDrawerListItem>
        <NotificationDrawerListItem variant="warning">
          <NotificationDrawerListItemHeader
            variant="warning"
            title="Warning Notification"
            srTitle="Warning notification:"
          />
          <NotificationDrawerListItemBody>CPU requests not set</NotificationDrawerListItemBody>
        </NotificationDrawerListItem>
        <NotificationDrawerListItem variant="danger">
          <NotificationDrawerListItemHeader
            variant="danger"
            title="Critical Notification"
            srTitle="Danger notification:"
          />
          <NotificationDrawerListItemBody>Memory requests not set</NotificationDrawerListItemBody>
        </NotificationDrawerListItem>
      </NotificationDrawer>
    );
  };
  const suggestions = () => {
    return (
      <Accordion asDefinitionList={false}>
        <AccordionItem>
          <AccordionToggle
            onClick={() => {
              onTogglee('ex-toggle1');
            }}
            isExpanded={expanded2 === 'ex-toggle1'}
            id="ex-toggle1"
          >
            <TextContent>
              <Text component={TextVariants.h2}>Short Term</Text>
            </TextContent>
          </AccordionToggle>
          <AccordionContent id="ex-expand1" isHidden={expanded2 !== 'ex-toggle1'}>
            <TextContent>
              <Text>Decrease Memory Request by 21.2 MiB </Text>
              <Text>Decrease CPU Request by 2.2 cores</Text>
            </TextContent>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          <AccordionToggle
            onClick={() => {
              onTogglee('ex-toggle2');
            }}
            isExpanded={expanded2 === 'ex-toggle2'}
            id="ex-toggle2"
          >
            <TextContent>
              <Text component={TextVariants.h2}>Medium Term</Text>
            </TextContent>
          </AccordionToggle>
          <AccordionContent id="ex-expand2" isHidden={expanded2 !== 'ex-toggle2'}>
            <TextContent>
              <Text>Decrease Memory Request by 21.2 MiB </Text>
              <Text>Decrease CPU Request by 2.2 cores</Text>
            </TextContent>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          <AccordionToggle
            onClick={() => {
              onTogglee('ex-toggle3');
            }}
            isExpanded={expanded2 === 'ex-toggle3'}
            id="ex-toggle3"
          >
            <TextContent>
              <Text component={TextVariants.h2}>Long Term</Text>
            </TextContent>
          </AccordionToggle>
          <AccordionContent id="ex-expand3" isHidden={expanded2 !== 'ex-toggle3'}>
            <TextContent>
              <Text>Decrease Memory Request by 21.2 MiB </Text>
              <Text>Decrease CPU Request by 2.2 cores</Text>
            </TextContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  };
  return (
    <PageSection variant={PageSectionVariants.light}>
      <TextContent>
        <Text component={TextVariants.h1}>Detected Issues</Text>
      </TextContent>
      <br />
      {detectedIssues()}
      <Divider />
      <br />
      <TextContent>
        <Text component={TextVariants.h1}>
          <Icon>
            <WrenchIcon />
          </Icon>{' '}
          Suggestions
        </Text>
      </TextContent>
      <br />
      {suggestions()}
      <br />
      <Divider />
      <br />
      <TextContent>
        <Text component={TextVariants.h1}>Detailed Recommendations Table</Text>
      </TextContent>
      <br />
      {detailedRecommendationsTable()}
      <Divider />
      <br />
    </PageSection>
  );
};

export { Container1Details };
