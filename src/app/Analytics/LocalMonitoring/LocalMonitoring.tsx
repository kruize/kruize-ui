import React, { useEffect, useState } from 'react';
import {
  PageSection,
  Title,
  Card,
  CardBody,
  Button,
  Alert,
  Spinner,
  Badge,
  Flex,
  FlexItem,
  Tabs,
  Tab,
  TabTitleText,
  SearchInput,
  FormSelect,
  FormSelectOption,
  Pagination,
} from '@patternfly/react-core';
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getListOfDataSources } from '../../../store/actions/DataSourceActionCreator';
import { getListOfExperiments } from '../../../store/actions/ExperimentActionCreator';
import { getBaseUrl } from '../../CentralConfig';
import { 
  ChevronRightIcon, 
  ChevronDownIcon,
  CubeIcon,
  FolderIcon,
  BoxIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@patternfly/react-icons';
import './LocalMonitoring.css';

interface ContainerData {
  container_name: string;
  container_image_name?: string;
}

interface WorkloadData {
  workload_name: string;
  workload_type: string;
  has_recommendations: boolean;
  experiment_name?: string; // Store the experiment name for navigation
  containers?: ContainerData[]; // Container information for creating experiments
}

interface NamespaceData {
  workloads: WorkloadData[];
}

interface ClusterData {
  cluster_name: string;
  namespaces: {
    [namespace: string]: NamespaceData;
  };
}

interface FlatWorkload {
  cluster: string;
  namespace: string;
  workload: string;
  type: string;
  hasRecommendations: boolean;
  experimentName?: string;
}

const LocalMonitoring: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const datasources = useSelector((state: any) => state.dataSource?.datasources || []);
  const experiments = useSelector((state: any) => state.experiments?.listOfExperiments || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadataLoading, setMetadataLoading] = useState<string | null>(null);
  const [clusterData, setClusterData] = useState<ClusterData[]>([]);
  const [activeTab, setActiveTab] = useState<string | number>(0);
  const [currentDatasource, setCurrentDatasource] = useState<string>('');

  // State for collapsible tree (Interactive View)
  const [expandedClusters, setExpandedClusters] = useState<Set<string>>(new Set());
  const [expandedNamespace, setExpandedNamespace] = useState<string | null>(null);

  // State for table view filters
  const [searchValue, setSearchValue] = useState('');
  const [clusterFilter, setClusterFilter] = useState<string>('all');
  const [namespaceFilter, setNamespaceFilter] = useState<string>('all');
  
  // State for pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // @ts-ignore - Redux typing issue in original codebase
        await dispatch(getListOfDataSources());
        // @ts-ignore - Fetch experiments to check which workloads have recommendations
        await dispatch(getListOfExperiments());
      } catch (err) {
        setError('Failed to load datasources');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  // Create experiment name using Kruize naming convention
  const createExperimentName = (datasource: string, cluster: string, namespace: string, workload: string, workloadType: string, container: string) => {
    // Format: datasource|cluster|namespace|workload(type)|container
    return `${datasource}|${cluster}|${namespace}|${workload}(${workloadType})|${container}`;
  };

  // Check if experiment exists in the experiments list
  const checkExperimentExists = (experimentName: string): boolean => {
    if (!experiments || experiments.length === 0) {
      console.log('No experiments found');
      return false;
    }
    const exists = experiments.some((exp: any) => exp.experiment_name === experimentName);
    console.log(`Checking experiment: ${experimentName}, exists: ${exists}`);
    return exists;
  };

  const handleImportMetadata = async (datasourceName: string) => {
    setMetadataLoading(datasourceName);
    setCurrentDatasource(datasourceName);
    setError(null);
    
    try {
      const baseUrl = getBaseUrl();
      const response = await fetch(`${baseUrl}/dsmetadata?datasource=${datasourceName}&verbose=true`);
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `Failed to import metadata for "${datasourceName}": ${response.statusText}`;
        
        if (response.status === 400) {
          errorMessage = `No metadata available for datasource "${datasourceName}". The datasource may not have been configured or may not have any workloads yet.`;
        } else if (response.status === 404) {
          errorMessage = `Datasource "${datasourceName}" not found. Please check if the datasource exists.`;
        }
        
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      // Parse the API response and create experiment names
      const transformedData: ClusterData[] = [];
      
      if (data && data.datasources && typeof data.datasources === 'object') {
        Object.values(data.datasources).forEach((datasourceInfo: any) => {
          if (datasourceInfo && datasourceInfo.clusters && typeof datasourceInfo.clusters === 'object') {
            Object.entries(datasourceInfo.clusters).forEach(([clusterName, clusterInfo]: [string, any]) => {
              if (clusterInfo && clusterInfo.namespaces && typeof clusterInfo.namespaces === 'object') {
                const transformedNamespaces: { [key: string]: NamespaceData } = {};
                
                Object.entries(clusterInfo.namespaces).forEach(([nsName, nsInfo]: [string, any]) => {
                  const workloads: WorkloadData[] = [];
                  
                  if (nsInfo && nsInfo.workloads && typeof nsInfo.workloads === 'object') {
                    Object.values(nsInfo.workloads).forEach((workload: any) => {
                      if (workload && workload.workload_name) {
                        // Get first container name for the experiment name
                        let firstContainerName = '';
                        const containers: ContainerData[] = [];
                        
                        if (workload.containers && typeof workload.containers === 'object') {
                          const containerNames = Object.keys(workload.containers);
                          if (containerNames.length > 0) {
                            firstContainerName = containerNames[0];
                          }
                          
                          // Extract container data for creating experiments
                          Object.entries(workload.containers).forEach(([containerName, containerInfo]: [string, any]) => {
                            containers.push({
                              container_name: containerName,
                              container_image_name: containerInfo?.container_image_name || 'unknown'
                            });
                          });
                        }
                        
                        // Create experiment name
                        const experimentName = createExperimentName(
                          datasourceName,
                          clusterName,
                          nsName,
                          workload.workload_name,
                          workload.workload_type || 'unknown',
                          firstContainerName
                        );
                        
                        console.log('Created experiment name:', experimentName);
                        console.log('First container:', firstContainerName);
                        
                        // Check if this experiment exists
                        const hasExperiment = checkExperimentExists(experimentName);
                        console.log('Has experiment:', hasExperiment);
                        
                        workloads.push({
                          workload_name: workload.workload_name,
                          workload_type: workload.workload_type || 'unknown',
                          has_recommendations: hasExperiment,
                          experiment_name: hasExperiment ? experimentName : undefined,
                          containers: containers
                        });
                      }
                    });
                  }
                  
                  transformedNamespaces[nsName] = { workloads };
                });
                
                transformedData.push({
                  cluster_name: clusterName,
                  namespaces: transformedNamespaces
                });
              }
            });
          }
        });
      }
      
      console.log('Transformed Data:', transformedData);
      setClusterData(transformedData);
      
      if (transformedData.length === 0) {
        setError('No cluster data found in the response');
      }
    } catch (err) {
      console.error('Import metadata error:', err);
      setError(err instanceof Error ? err.message : 'Failed to import metadata');
      setClusterData([]);
    } finally {
      setMetadataLoading(null);
    }
  };

  // Navigate to experiment recommendations or create experiment page
  const handleWorkloadClick = (workload: WorkloadData, datasource: string, cluster: string, namespace: string) => {
    console.log('Workload clicked:', workload.workload_name);
    
    if (workload.has_recommendations && workload.experiment_name) {
      // Navigate to existing experiment recommendations
      const url = `/listExperiments?experiment_name=${encodeURIComponent(workload.experiment_name)}`;
      console.log('Navigating to experiment:', url);
      history.push(url);
    } else {
      // Navigate to create experiment page with pre-filled data via state
      // Get the first container name from the workload
      const containerName = workload.containers && workload.containers.length > 0
        ? workload.containers[0].container_name
        : 'container';
      const containerImageName = workload.containers && workload.containers.length > 0
        ? workload.containers[0].container_image_name || 'unknown'
        : 'unknown';
      
      console.log('Navigating to create experiment with state:', {
        datasourceName: datasource,
        clusterName: cluster,
        projectName: namespace,
        workloadName: workload.workload_name,
        workloadType: workload.workload_type,
        containerName,
        containerImageName
      });
      
      history.push('/createExperiment', {
        datasourceName: datasource,
        clusterName: cluster,
        projectName: namespace,
        workloadName: workload.workload_name,
        workloadType: workload.workload_type,
        containerName: containerName,
        containerImageName: containerImageName
      });
    }
  };

  const toggleCluster = (clusterName: string) => {
    const newExpanded = new Set(expandedClusters);
    if (newExpanded.has(clusterName)) {
      newExpanded.delete(clusterName);
      if (expandedNamespace?.startsWith(clusterName)) {
        setExpandedNamespace(null);
      }
    } else {
      newExpanded.add(clusterName);
    }
    setExpandedClusters(newExpanded);
  };

  const toggleNamespace = (clusterName: string, namespaceName: string) => {
    const namespaceKey = `${clusterName}::${namespaceName}`;
    if (expandedNamespace === namespaceKey) {
      setExpandedNamespace(null);
    } else {
      setExpandedNamespace(namespaceKey);
    }
  };

  const isClusterExpanded = (clusterName: string) => expandedClusters.has(clusterName);
  const isNamespaceExpanded = (clusterName: string, namespaceName: string) => 
    expandedNamespace === `${clusterName}::${namespaceName}`;

  const countWorkloads = (namespaces: ClusterData['namespaces']) => {
    let total = 0;
    let withRecs = 0;
    if (namespaces && typeof namespaces === 'object') {
      Object.values(namespaces).forEach(ns => {
        if (ns && ns.workloads && Array.isArray(ns.workloads)) {
          total += ns.workloads.length;
          withRecs += ns.workloads.filter(w => w && w.has_recommendations).length;
        }
      });
    }
    return { total, withRecs };
  };

  // Flatten data for table view
  const getFlattenedWorkloads = (): FlatWorkload[] => {
    const flattened: FlatWorkload[] = [];
    if (clusterData && Array.isArray(clusterData)) {
      clusterData.forEach(cluster => {
        if (cluster && cluster.namespaces && typeof cluster.namespaces === 'object') {
          Object.entries(cluster.namespaces).forEach(([namespace, nsData]) => {
            if (nsData && nsData.workloads && Array.isArray(nsData.workloads)) {
              nsData.workloads.forEach(workload => {
                if (workload) {
                  flattened.push({
                    cluster: cluster.cluster_name || 'Unknown',
                    namespace: namespace || 'Unknown',
                    workload: workload.workload_name || 'Unknown',
                    type: workload.workload_type || 'Unknown',
                    hasRecommendations: workload.has_recommendations || false,
                    experimentName: workload.experiment_name
                  });
                }
              });
            }
          });
        }
      });
    }
    return flattened;
  };

  // Get unique clusters and namespaces for filters
  const getUniqueClusters = () => {
    return Array.from(new Set(clusterData.map(c => c.cluster_name)));
  };

  const getUniqueNamespaces = () => {
    const namespaces = new Set<string>();
    clusterData.forEach(cluster => {
      Object.keys(cluster.namespaces).forEach(ns => namespaces.add(ns));
    });
    return Array.from(namespaces);
  };

  // Filter workloads based on search and filters
  const getFilteredWorkloads = (): FlatWorkload[] => {
    let filtered = getFlattenedWorkloads();

    if (clusterFilter !== 'all') {
      filtered = filtered.filter(w => w.cluster === clusterFilter);
    }

    if (namespaceFilter !== 'all') {
      filtered = filtered.filter(w => w.namespace === namespaceFilter);
    }

    if (searchValue) {
      const search = searchValue.toLowerCase();
      filtered = filtered.filter(w => 
        w.workload.toLowerCase().includes(search) ||
        w.type.toLowerCase().includes(search)
      );
    }

    return filtered;
  };

  return (
    <PageSection className="local-monitoring-page">
      <Title headingLevel="h1" size="2xl" className="page-title">
        Explore Cluster
      </Title>
      <p className="page-description">
        View and manage your Kubernetes datasources and explore cluster metadata
      </p>

      {error && (
        <Alert variant="danger" title="Error" isInline className="error-alert">
          {error}
        </Alert>
      )}

      <Card className="datasources-card">
        <CardBody>
          <Title headingLevel="h2" size="xl" className="section-title">
            Available Datasources
          </Title>
          
          {loading ? (
            <div className="loading-container">
              <Spinner size="lg" />
              <p>Loading datasources...</p>
            </div>
          ) : datasources.length === 0 ? (
            <Alert variant="info" title="No datasources found" isInline>
              No datasources are currently configured. Please add a datasource to get started.
            </Alert>
          ) : (
            <Table variant="compact" borders>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Provider</Th>
                  <Th>Service Name</Th>
                  <Th>Namespace</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {datasources.map((ds: any) => (
                  <Tr
                    key={ds.name}
                    className={currentDatasource === ds.name ? 'active-datasource-row' : ''}
                  >
                    <Td>{ds.name}</Td>
                    <Td>
                      <Badge isRead>{ds.provider || 'Unknown'}</Badge>
                    </Td>
                    <Td>{ds.serviceName || 'N/A'}</Td>
                    <Td>{ds.namespace || 'default'}</Td>
                    <Td>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleImportMetadata(ds.name)}
                        isLoading={metadataLoading === ds.name}
                        isDisabled={metadataLoading !== null}
                      >
                        {metadataLoading === ds.name ? 'Importing...' : 'Import Metadata'}
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </CardBody>
      </Card>

      {clusterData.length > 0 && (
        <Card className="cluster-view-card">
          <CardBody>
            <Tabs
              activeKey={activeTab}
              onSelect={(event, tabIndex) => setActiveTab(tabIndex)}
              aria-label="Cluster view tabs"
            >
              <Tab eventKey={0} title={<TabTitleText>Interactive View</TabTitleText>}>
                <div className="tab-content">
                  <p className="tree-description">
                    Click on clusters to expand, then click on namespaces to view workloads. Click on workloads with recommendations to view details.
                  </p>

                  <div className="collapsible-tree">
                    {clusterData.map((cluster) => {
                      const isExpanded = isClusterExpanded(cluster.cluster_name);
                      const namespaceCount = Object.keys(cluster.namespaces).length;
                      const { total, withRecs } = countWorkloads(cluster.namespaces);

                      return (
                        <div key={cluster.cluster_name} className="tree-node cluster-node">
                          <div 
                            className="tree-node-header cluster-header"
                            onClick={() => toggleCluster(cluster.cluster_name)}
                          >
                            <Flex alignItems={{ default: 'alignItemsCenter' }}>
                              <FlexItem>
                                {isExpanded ? (
                                  <ChevronDownIcon className="chevron-icon" />
                                ) : (
                                  <ChevronRightIcon className="chevron-icon" />
                                )}
                              </FlexItem>
                              <FlexItem>
                                <CubeIcon className="node-icon cluster-icon" />
                              </FlexItem>
                              <FlexItem className="node-label">
                                <strong>{cluster.cluster_name}</strong>
                              </FlexItem>
                              <FlexItem>
                                <Badge isRead>{namespaceCount} namespaces</Badge>
                              </FlexItem>
                              <FlexItem>
                                <Badge className="workload-badge">{total} workloads</Badge>
                              </FlexItem>
                              <FlexItem>
                                <Badge className="success-badge">
                                  <CheckCircleIcon /> {withRecs} experiments
                                </Badge>
                              </FlexItem>
                            </Flex>
                          </div>

                          {isExpanded && (
                            <div className="tree-children">
                              {Object.entries(cluster.namespaces).map(([namespaceName, namespaceData]) => {
                                const nsExpanded = isNamespaceExpanded(cluster.cluster_name, namespaceName);
                                const workloadCount = namespaceData.workloads?.length || 0;
                                const recsCount = namespaceData.workloads?.filter(w => w.has_recommendations).length || 0;
                                
                                // Check if namespace experiment exists
                                const namespaceExperimentName = `${currentDatasource}|${cluster.cluster_name}|${namespaceName}`;
                                const hasNamespaceExperiment = experiments.some((exp: any) =>
                                  exp.experiment_name === namespaceExperimentName
                                );

                                return (
                                  <div key={namespaceName} className="tree-node namespace-node">
                                    <div
                                      className="tree-node-header namespace-header"
                                      onClick={(e) => {
                                        // Prevent toggle when clicking button
                                        if (!(e.target as HTMLElement).closest('button')) {
                                          toggleNamespace(cluster.cluster_name, namespaceName);
                                        }
                                      }}
                                    >
                                      <Flex alignItems={{ default: 'alignItemsCenter' }}>
                                        <FlexItem>
                                          {nsExpanded ? (
                                            <ChevronDownIcon className="chevron-icon" />
                                          ) : (
                                            <ChevronRightIcon className="chevron-icon" />
                                          )}
                                        </FlexItem>
                                        <FlexItem>
                                          <FolderIcon className="node-icon namespace-icon" />
                                        </FlexItem>
                                        <FlexItem className="node-label">
                                          {namespaceName}
                                        </FlexItem>
                                        <FlexItem>
                                          <Badge isRead>{workloadCount} workloads</Badge>
                                        </FlexItem>
                                        {recsCount > 0 && (
                                          <FlexItem>
                                            <Badge className="success-badge">
                                              <CheckCircleIcon /> {recsCount} experiments
                                            </Badge>
                                          </FlexItem>
                                        )}
                                        <FlexItem>
                                          {hasNamespaceExperiment ? (
                                            <Button
                                              variant="secondary"
                                              size="sm"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                history.push(`/listExperiments?experiment_name=${encodeURIComponent(namespaceExperimentName)}`);
                                              }}
                                              style={{ backgroundColor: '#d2d2d2', color: '#000000' }}
                                            >
                                              View Namespace Quota Recommendations
                                            </Button>
                                          ) : (
                                            <Button
                                              variant="secondary"
                                              size="sm"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                history.push('/createExperiment', {
                                                  datasourceName: currentDatasource,
                                                  clusterName: cluster.cluster_name,
                                                  namespaceName: namespaceName,
                                                  experimentType: 'namespace'
                                                });
                                              }}
                                              style={{ backgroundColor: '#d2d2d2', color: '#000000' }}
                                            >
                                              Create Namespace Experiment
                                            </Button>
                                          )}
                                        </FlexItem>
                                      </Flex>
                                    </div>

                                    {nsExpanded && namespaceData.workloads && (
                                      <div className="tree-children workload-list">
                                        {namespaceData.workloads.map((workload, idx) => (
                                          <div
                                            key={`${workload.workload_name}-${idx}`}
                                            className={`tree-node workload-node ${workload.has_recommendations ? 'has-recs' : 'no-recs'} clickable`}
                                            onClick={() => handleWorkloadClick(workload, currentDatasource, cluster.cluster_name, namespaceName)}
                                            style={{ cursor: 'pointer' }}
                                          >
                                            <Flex alignItems={{ default: 'alignItemsCenter' }}>
                                              <FlexItem>
                                                <BoxIcon className="node-icon workload-icon" />
                                              </FlexItem>
                                              <FlexItem className="node-label">
                                                {workload.workload_name}
                                              </FlexItem>
                                              <FlexItem>
                                                <Badge isRead>{workload.workload_type}</Badge>
                                              </FlexItem>
                                              <FlexItem>
                                                {workload.has_recommendations ? (
                                                  <Badge className="success-badge">
                                                    <CheckCircleIcon /> Experiment Created
                                                  </Badge>
                                                ) : (
                                                  <Badge className="warning-badge">
                                                    <ExclamationCircleIcon /> Experiment Not Created
                                                  </Badge>
                                                )}
                                              </FlexItem>
                                            </Flex>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Tab>

              <Tab eventKey={1} title={<TabTitleText>Table View</TabTitleText>}>
                <div className="tab-content">
                  <div className="table-filters">
                    <Flex>
                      <FlexItem flex={{ default: 'flex_1' }}>
                        <SearchInput
                          placeholder="Search workloads..."
                          value={searchValue}
                          onChange={(_event, value) => setSearchValue(value)}
                          onClear={() => setSearchValue('')}
                        />
                      </FlexItem>
                      <FlexItem>
                        <FormSelect
                          value={clusterFilter}
                          onChange={(event) => setClusterFilter(event.currentTarget.value)}
                          aria-label="Filter by cluster"
                        >
                          <FormSelectOption key="all" value="all" label="All Clusters" />
                          {getUniqueClusters().map(cluster => (
                            <FormSelectOption key={cluster} value={cluster} label={cluster} />
                          ))}
                        </FormSelect>
                      </FlexItem>
                      <FlexItem>
                        <FormSelect
                          value={namespaceFilter}
                          onChange={(event) => setNamespaceFilter(event.currentTarget.value)}
                          aria-label="Filter by namespace"
                        >
                          <FormSelectOption key="all" value="all" label="All Namespaces" />
                          {getUniqueNamespaces().map(ns => (
                            <FormSelectOption key={ns} value={ns} label={ns} />
                          ))}
                        </FormSelect>
                      </FlexItem>
                    </Flex>
                  </div>

                  <Table variant="compact" borders>
                    <Thead>
                      <Tr>
                        <Th>Cluster</Th>
                        <Th>Namespace</Th>
                        <Th>Workload</Th>
                        <Th>Type</Th>
                        <Th>Experiment Status</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {getFilteredWorkloads()
                        .slice((page - 1) * perPage, page * perPage)
                        .map((workload, idx) => {
                        const workloadData: WorkloadData = {
                          workload_name: workload.workload,
                          workload_type: workload.type,
                          has_recommendations: workload.hasRecommendations,
                          experiment_name: workload.experimentName
                        };
                        
                        return (
                          <Tr
                            key={`${workload.cluster}-${workload.namespace}-${workload.workload}-${idx}`}
                            className="clickable-row"
                            onClick={() => handleWorkloadClick(workloadData, currentDatasource, workload.cluster, workload.namespace)}
                            style={{ cursor: 'pointer' }}
                          >
                          <Td>{workload.cluster}</Td>
                          <Td>{workload.namespace}</Td>
                          <Td>{workload.workload}</Td>
                          <Td>
                            <Badge isRead>{workload.type}</Badge>
                          </Td>
                          <Td>
                            {workload.hasRecommendations ? (
                              <Badge className="success-badge">
                                <CheckCircleIcon /> Created
                              </Badge>
                            ) : (
                              <Badge className="warning-badge">
                                <ExclamationCircleIcon /> Not Created
                              </Badge>
                            )}
                          </Td>
                        </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>

                  {getFilteredWorkloads().length === 0 && (
                    <div className="no-results">
                      <p>No workloads found matching your filters.</p>
                    </div>
                  )}

                  {getFilteredWorkloads().length > 0 && (
                    <Pagination
                      itemCount={getFilteredWorkloads().length}
                      perPage={perPage}
                      page={page}
                      onSetPage={(_event, pageNumber) => setPage(pageNumber)}
                      onPerPageSelect={(_event, newPerPage) => {
                        setPerPage(newPerPage);
                        setPage(1);
                      }}
                      variant="bottom"
                      style={{ marginTop: '1rem' }}
                    />
                  )}
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      )}
    </PageSection>
  );
};

export { LocalMonitoring };

// Made with Bob
