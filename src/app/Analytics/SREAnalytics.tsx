import * as React from 'react';
import { PageSection, PageSectionVariants, TextContent, Text, TextVariants, Title, FormFieldGroupExpandable, FormFieldGroupHeader, FormGroup, TextInput, Button, Form, FormFieldGroup, Flex } from '@patternfly/react-core';
import { TableIcon } from '@patternfly/react-icons';
import { Table } from './Table';
const MonitoringUseCase = () => {
  return (
    <FormFieldGroupExpandable
      isExpanded
      toggleAriaLabel="Details"
      header={
        <FormFieldGroupHeader
          titleText={{ text: 'Monitoring', id: 'field-group1-titleText-id' }}
        />
      }
    >
      <FormFieldGroupExpandable
        isExpanded
        toggleAriaLabel="Details"
        header={
          <FormFieldGroupHeader
            titleText={{ text: 'Remote', id: 'nested-field-group1-titleText-id' }}
            actions={
              <Button variant="plain" aria-label="Remove">
                <TableIcon />
              </Button>
            }
          />
        }
      >
        <Table />


      </FormFieldGroupExpandable>
      <FormFieldGroupExpandable
        toggleAriaLabel="Details"
        header={
          <FormFieldGroupHeader
            titleText={{ text: 'Local', id: 'nested-field-group2-titleText-id' }}
            actions={
              <Button variant="plain" aria-label="Remove">
                <TableIcon />
              </Button>
            }
          />
        }
      >
      </FormFieldGroupExpandable>
    </FormFieldGroupExpandable>
  );
};

const AutotuneUseCase = () => {
  return (
    <FormFieldGroupExpandable
      isExpanded={false}
      toggleAriaLabel="Details"
      header={
        <FormFieldGroupHeader
          titleText={{ text: 'Autotune', id: 'field-group1-titleText-id' }}
        />
      }
    >
    </FormFieldGroupExpandable>

  )
}

const SREAnalytics = () => {
  return (
    <PageSection variant={PageSectionVariants.light}>
      <TextContent>
        <Text component={TextVariants.h1}>Analytics - SRE View</Text>
      </TextContent>
      <Flex direction={{ default: 'column' }}>
        <Form onSubmit={(e) => e.preventDefault()}>
          {MonitoringUseCase()}
          {AutotuneUseCase()}
        </Form>
      </Flex>
    </PageSection>
  )
};

export { SREAnalytics };
