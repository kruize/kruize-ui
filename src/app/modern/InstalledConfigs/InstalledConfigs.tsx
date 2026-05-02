import React, { useState, useEffect } from 'react';
import {
  PageSection,
  PageSectionVariants,
  Card,
  CardBody,
  CardTitle,
  Spinner,
  Text,
  TextContent,
  TextVariants,
  Tabs,
  Tab,
  TabTitleText,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  Button,
  CodeBlock,
  CodeBlockCode,
  Pagination,
} from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td, ExpandableRowContent } from '@patternfly/react-table';
import { CubeIcon, AngleDownIcon, AngleRightIcon } from '@patternfly/react-icons';
import { getBaseUrl } from '@app/CentralConfig';
import './InstalledConfigs.css';

interface MetadataProfile {
  apiVersion?: string;
  kind?: string;
  metadata?: {
    name: string;
  };
  profile_version?: number;
  k8s_type?: string;
  datasource?: string;
  query_variables?: any[];
  layer_name?: string;
}

interface MetricProfile {
  apiVersion?: string;
  kind?: string;
  metadata?: {
    name: string;
  };
  profile_version?: number;
  k8s_type?: string;
  slo?: {
    sloClass?: string;
    direction?: string;
    function_variables?: any[];
  };
}

interface Layer {
  apiVersion?: string;
  kind?: string;
  metadata?: {
    name: string;
  };
  layer_name?: string;
  details?: string;
  layer_presence?: any;
  tunables?: any[];
}

export const InstalledConfigs: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTabKey, setActiveTabKey] = useState<string | number>(0);
  const [metadataProfiles, setMetadataProfiles] = useState<MetadataProfile[]>([]);
  const [metricProfiles, setMetricProfiles] = useState<MetricProfile[]>([]);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  
  // Pagination states for each tab
  const [metadataPage, setMetadataPage] = useState(1);
  const [metadataPerPage, setMetadataPerPage] = useState(10);
  const [metricPage, setMetricPage] = useState(1);
  const [metricPerPage, setMetricPerPage] = useState(10);
  const [layerPage, setLayerPage] = useState(1);
  const [layerPerPage, setLayerPerPage] = useState(10);

  useEffect(() => {
    fetchAllConfigs();
  }, []);

  const fetchAllConfigs = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchMetadataProfiles(),
        fetchMetricProfiles(),
        fetchLayers(),
      ]);
    } catch (error) {
      console.error('Error fetching configs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMetadataProfiles = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/listMetadataProfiles?verbose=true`);
      const data = await response.json();
      if (data && Array.isArray(data)) {
        setMetadataProfiles(data);
      }
    } catch (error) {
      console.error('Error fetching metadata profiles:', error);
      setMetadataProfiles([]);
    }
  };

  const fetchMetricProfiles = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/listMetricProfiles?verbose=true`);
      const data = await response.json();
      if (data && Array.isArray(data)) {
        setMetricProfiles(data);
      }
    } catch (error) {
      console.error('Error fetching metric profiles:', error);
      setMetricProfiles([]);
    }
  };

  const fetchLayers = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/listLayers`);
      const data = await response.json();
      if (data && Array.isArray(data)) {
        setLayers(data);
      }
    } catch (error) {
      console.error('Error fetching layers:', error);
      setLayers([]);
    }
  };

  const handleTabClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    tabIndex: string | number
  ) => {
    setActiveTabKey(tabIndex);
  };

  const toggleRowExpansion = (rowId: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(rowId)) {
      newExpandedRows.delete(rowId);
    } else {
      newExpandedRows.add(rowId);
    }
    setExpandedRows(newExpandedRows);
  };

  const renderEmptyState = (title: string, description: string) => (
    <EmptyState>
      <EmptyStateIcon icon={CubeIcon} />
      <TextContent>
        <Text component={TextVariants.h2}>{title}</Text>
      </TextContent>
      <EmptyStateBody>{description}</EmptyStateBody>
    </EmptyState>
  );

  const renderMetadataProfiles = () => {
    if (metadataProfiles.length === 0) {
      return renderEmptyState(
        'No Metadata Profiles',
        'No metadata profiles are currently installed.'
      );
    }

    return (
      <div>
        <Table aria-label="Metadata Profiles table" variant="compact">
          <Thead>
            <Tr>
              <Th width={10}></Th>
              <Th>Profile Name</Th>
              <Th>K8s Type</Th>
              <Th>Datasource</Th>
              <Th>Version</Th>
              <Th>Query Variables</Th>
            </Tr>
          </Thead>
          <Tbody>
            {metadataProfiles
              .slice((metadataPage - 1) * metadataPerPage, metadataPage * metadataPerPage)
              .map((profile, index) => {
                const actualIndex = (metadataPage - 1) * metadataPerPage + index;
                const rowId = `metadata-${actualIndex}`;
                const isExpanded = expandedRows.has(rowId);
                const profileName = profile.metadata?.name || profile.layer_name || '-';
                
                return (
                  <React.Fragment key={actualIndex}>
                    <Tr>
                      <Td>
                        <Button
                          variant="plain"
                          onClick={() => toggleRowExpansion(rowId)}
                          aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                        >
                          {isExpanded ? <AngleDownIcon /> : <AngleRightIcon />}
                        </Button>
                      </Td>
                      <Td>{profileName}</Td>
                      <Td>{profile.k8s_type || 'N/A'}</Td>
                      <Td>{profile.datasource || 'N/A'}</Td>
                      <Td>{profile.profile_version || 'N/A'}</Td>
                      <Td>{profile.query_variables?.length || 0}</Td>
                    </Tr>
                    {isExpanded && (
                      <Tr isExpanded={true}>
                        <Td colSpan={6}>
                          <ExpandableRowContent>
                            <div style={{ padding: '1rem' }}>
                              <CodeBlock>
                                <CodeBlockCode>
                                  {JSON.stringify(profile, null, 2)}
                                </CodeBlockCode>
                              </CodeBlock>
                            </div>
                          </ExpandableRowContent>
                        </Td>
                      </Tr>
                    )}
                  </React.Fragment>
                );
              })}
          </Tbody>
        </Table>
        {metadataProfiles.length > 0 && (
          <Pagination
            itemCount={metadataProfiles.length}
            perPage={metadataPerPage}
            page={metadataPage}
            onSetPage={(_event, pageNumber) => setMetadataPage(pageNumber)}
            onPerPageSelect={(_event, newPerPage) => {
              setMetadataPerPage(newPerPage);
              setMetadataPage(1);
            }}
            variant="bottom"
            style={{ marginTop: '1rem' }}
          />
        )}
      </div>
    );
  };

  const renderMetricProfiles = () => {
    if (metricProfiles.length === 0) {
      return renderEmptyState(
        'No Metric Profiles',
        'No metric profiles are currently installed.'
      );
    }

    return (
      <div>
        <Table aria-label="Metric Profiles table" variant="compact">
          <Thead>
            <Tr>
              <Th width={10}></Th>
              <Th>Profile Name</Th>
              <Th>K8s Type</Th>
              <Th>SLO Class</Th>
              <Th>Version</Th>
              <Th>Function Variables</Th>
            </Tr>
          </Thead>
          <Tbody>
            {metricProfiles
              .slice((metricPage - 1) * metricPerPage, metricPage * metricPerPage)
              .map((profile, index) => {
                const actualIndex = (metricPage - 1) * metricPerPage + index;
                const rowId = `metric-${actualIndex}`;
                const isExpanded = expandedRows.has(rowId);
                const profileName = profile.metadata?.name || '-';
                
                return (
                  <React.Fragment key={actualIndex}>
                    <Tr>
                      <Td>
                        <Button
                          variant="plain"
                          onClick={() => toggleRowExpansion(rowId)}
                          aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                        >
                          {isExpanded ? <AngleDownIcon /> : <AngleRightIcon />}
                        </Button>
                      </Td>
                      <Td>{profileName}</Td>
                      <Td>{profile.k8s_type || 'N/A'}</Td>
                      <Td>{profile.slo?.sloClass || 'N/A'}</Td>
                      <Td>{profile.profile_version || 'N/A'}</Td>
                      <Td>{profile.slo?.function_variables?.length || 0}</Td>
                    </Tr>
                    {isExpanded && (
                      <Tr isExpanded={true}>
                        <Td colSpan={6}>
                          <ExpandableRowContent>
                            <div style={{ padding: '1rem' }}>
                              <CodeBlock>
                                <CodeBlockCode>
                                  {JSON.stringify(profile, null, 2)}
                                </CodeBlockCode>
                              </CodeBlock>
                            </div>
                          </ExpandableRowContent>
                        </Td>
                      </Tr>
                    )}
                  </React.Fragment>
                );
              })}
          </Tbody>
        </Table>
        {metricProfiles.length > 0 && (
          <Pagination
            itemCount={metricProfiles.length}
            perPage={metricPerPage}
            page={metricPage}
            onSetPage={(_event, pageNumber) => setMetricPage(pageNumber)}
            onPerPageSelect={(_event, newPerPage) => {
              setMetricPerPage(newPerPage);
              setMetricPage(1);
            }}
            variant="bottom"
            style={{ marginTop: '1rem' }}
          />
        )}
      </div>
    );
  };

  const renderLayers = () => {
    if (layers.length === 0) {
      return renderEmptyState(
        'No Layers',
        'No layers are currently installed.'
      );
    }

    return (
      <div>
        <Table aria-label="Layers table" variant="compact">
          <Thead>
            <Tr>
              <Th width={10}></Th>
              <Th>Layer Name</Th>
              <Th>Details</Th>
              <Th>Tunables Count</Th>
              <Th>Presence Detection</Th>
            </Tr>
          </Thead>
          <Tbody>
            {layers
              .slice((layerPage - 1) * layerPerPage, layerPage * layerPerPage)
              .map((layer, index) => {
                const actualIndex = (layerPage - 1) * layerPerPage + index;
                const rowId = `layer-${actualIndex}`;
                const isExpanded = expandedRows.has(rowId);
                const layerName = layer.metadata?.name || layer.layer_name || '-';
                const presenceType = layer.layer_presence?.presence 
                  ? 'Always' 
                  : layer.layer_presence?.queries 
                    ? `Query-based (${layer.layer_presence.queries.length} queries)` 
                    : 'N/A';
                
                return (
                  <React.Fragment key={actualIndex}>
                    <Tr>
                      <Td>
                        <Button
                          variant="plain"
                          onClick={() => toggleRowExpansion(rowId)}
                          aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                        >
                          {isExpanded ? <AngleDownIcon /> : <AngleRightIcon />}
                        </Button>
                      </Td>
                      <Td>{layerName}</Td>
                      <Td>{layer.details || 'No description'}</Td>
                      <Td>{layer.tunables?.length || 0}</Td>
                      <Td>{presenceType}</Td>
                    </Tr>
                    {isExpanded && (
                      <Tr isExpanded={true}>
                        <Td colSpan={5}>
                          <ExpandableRowContent>
                            <div style={{ padding: '1rem' }}>
                              <CodeBlock>
                                <CodeBlockCode>
                                  {JSON.stringify(layer, null, 2)}
                                </CodeBlockCode>
                              </CodeBlock>
                            </div>
                          </ExpandableRowContent>
                        </Td>
                      </Tr>
                    )}
                  </React.Fragment>
                );
              })}
          </Tbody>
        </Table>
        {layers.length > 0 && (
          <Pagination
            itemCount={layers.length}
            perPage={layerPerPage}
            page={layerPage}
            onSetPage={(_event, pageNumber) => setLayerPage(pageNumber)}
            onPerPageSelect={(_event, newPerPage) => {
              setLayerPerPage(newPerPage);
              setLayerPage(1);
            }}
            variant="bottom"
            style={{ marginTop: '1rem' }}
          />
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <PageSection variant={PageSectionVariants.light} style={{ backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <Spinner size="xl" />
          <Text style={{ marginLeft: '1rem' }}>Loading installed configurations...</Text>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection variant={PageSectionVariants.light} style={{ backgroundColor: '#ffffff' }}>
      <TextContent>
        <Text component={TextVariants.h1}>Installed Configs</Text>
        <Text component={TextVariants.p}>
          View all installed metadata profiles, metric profiles, and layers. Click on any row to view full details.
        </Text>
      </TextContent>

      {/* Summary Cards - Moved to top */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
        <Card>
          <CardTitle>Metadata Profiles</CardTitle>
          <CardBody>
            <Text component={TextVariants.h1} style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0066cc' }}>
              {metadataProfiles.length}
            </Text>
            <Text component={TextVariants.p} style={{ marginTop: '0.5rem', color: '#6a6e73' }}>
              Total installed metadata profiles
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardTitle>Metric Profiles</CardTitle>
          <CardBody>
            <Text component={TextVariants.h1} style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0066cc' }}>
              {metricProfiles.length}
            </Text>
            <Text component={TextVariants.p} style={{ marginTop: '0.5rem', color: '#6a6e73' }}>
              Total installed metric profiles
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardTitle>Layers</CardTitle>
          <CardBody>
            <Text component={TextVariants.h1} style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0066cc' }}>
              {layers.length}
            </Text>
            <Text component={TextVariants.p} style={{ marginTop: '0.5rem', color: '#6a6e73' }}>
              Total installed layers
            </Text>
          </CardBody>
        </Card>
      </div>

      {/* Tabs Section */}
      <Card style={{ marginTop: '2rem' }}>
        <CardBody>
          <Tabs
            activeKey={activeTabKey}
            onSelect={handleTabClick}
            aria-label="Installed configs tabs"
          >
            <Tab
              eventKey={0}
              title={<TabTitleText>Metadata Profiles</TabTitleText>}
              aria-label="Metadata Profiles tab"
            >
              <div style={{ padding: '1rem' }}>
                {renderMetadataProfiles()}
              </div>
            </Tab>
            <Tab
              eventKey={1}
              title={<TabTitleText>Metric Profiles</TabTitleText>}
              aria-label="Metric Profiles tab"
            >
              <div style={{ padding: '1rem' }}>
                {renderMetricProfiles()}
              </div>
            </Tab>
            <Tab
              eventKey={2}
              title={<TabTitleText>Layers</TabTitleText>}
              aria-label="Layers tab"
            >
              <div style={{ padding: '1rem' }}>
                {renderLayers()}
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </PageSection>
  );
};

// Made with Bob