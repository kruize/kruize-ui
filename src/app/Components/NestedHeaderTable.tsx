import React from 'react';
import { Thead, Tr, Th, Tbody, Td, InnerScrollContainer, Table } from '@patternfly/react-table';
import {
  Drawer,
  DrawerActions,
  DrawerCloseButton,
  DrawerContent,
  DrawerContentBody,
  DrawerHead,
  DrawerPanelContent,
  PageSection,
  PageSectionVariants,
  TextContent
} from '@patternfly/react-core';
// import { DrawerBasic } from './Drawerr';

const NestedHeaderTable = ({ data }) => {
  const chartContainerStyle = {
    height: '250px', // You can adjust the height as well if needed
    width: '800px' // Set the fixed width here
  };

  const [isDrawerExpanded, setIsDrawerExpanded] = React.useState(false);
  const [selectedRowData, setSelectedRowData] = React.useState(null);

  const handleRowClick = () => {
    setIsDrawerExpanded(true);

    // setSelectedRowData(rowData.data);
  };
  const onCloseClick = () => {
    setIsDrawerExpanded(false);
  };

  const pageContent = (
    <>
      <TextContent>C1</TextContent>
      <InnerScrollContainer style={chartContainerStyle}>
        <Table aria-label="Nested column headers table" gridBreakPoint="">
          <Thead hasNestedHeader>
            <Tr>
              <Th colSpan={1}>Cluster Name</Th>
              <Th colSpan={3}>CPU</Th>
              <Th colSpan={3}>MMR</Th>
            </Tr>
            <Tr>
              <Th />
              <Th isSubheader>Increase</Th>
              <Th isSubheader>Decrease</Th>
              <Th isSubheader>Variation</Th>
              <Th isSubheader>Increase</Th>
              <Th isSubheader>Decrease</Th>
              <Th isSubheader>Variation</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr onRowClick={handleRowClick}>
              <Td dataLabel="Cluster Name">{data.cluster_name}</Td>
              <Td dataLabel="CPU Increase">
                {
                  data.summary.data['2023-07-11T14:00:50.511Z'].duration_based.short_term.change.increase.requests.cpu
                    .amount
                }
              </Td>
              <Td dataLabel="CPU Decrease">
                {
                  data.summary.data['2023-07-11T14:00:50.511Z'].duration_based.short_term.change.decrease.requests.cpu
                    .amount
                }
              </Td>
              <Td dataLabel="CPU Variation">
                {
                  data.summary.data['2023-07-11T14:00:50.511Z'].duration_based.short_term.change.variation.requests.cpu
                    .amount
                }
              </Td>
              <Td dataLabel="MMR Increase">
                {
                  data.summary.data['2023-07-11T14:00:50.511Z'].duration_based.short_term.change.increase.requests
                    .memory.amount
                }
              </Td>
              <Td dataLabel="MMR Decrease">
                {
                  data.summary.data['2023-07-11T14:00:50.511Z'].duration_based.short_term.change.decrease.requests
                    .memory.amount
                }
              </Td>
              <Td dataLabel="MMR Variation">
                {
                  data.summary.data['2023-07-11T14:00:50.511Z'].duration_based.short_term.change.variation.requests
                    .memory.amount
                }
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </InnerScrollContainer>
    </>
  );

  const panelContent = (
    <DrawerPanelContent>
      <DrawerHead>
        drawer-panel
        <DrawerActions>
          <DrawerCloseButton onClick={onCloseClick} />
        </DrawerActions>
      </DrawerHead>
    </DrawerPanelContent>
  );

  return (
    <>
      <Drawer isExpanded={isDrawerExpanded}>
        <DrawerContent data-ouia-component-id="instance-drawer" panelContent={panelContent}>
          {pageContent}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NestedHeaderTable;
