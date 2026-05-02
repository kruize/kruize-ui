import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  PageSection,
  PageSectionVariants,
  Title,
  Card,
  CardBody,
  Button,
  Spinner,
  Alert,
  FormSelect,
  FormSelectOption,
  SearchInput,
  Flex,
  FlexItem,
  Badge,
  Pagination
} from '@patternfly/react-core';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@patternfly/react-table';
import { getListOfExperiments } from '../../../store/actions/ExperimentActionCreator';
import './ViewRecommendations.css';

interface ExperimentData {
  experiment_name: string;
  cluster_name: string;
  datasource?: string;
  experiment_type?: string;
  kubernetes_objects: Array<{
    namespace: string;
    name: string;
    type: string;
    containers?: Array<{
      container_name: string;
      container_image_name: string;
    }>;
  }>;
}

const ViewRecommendations: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const experiments = useSelector((state: any) => state.experiments?.listOfExperiments || []);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [error, setError] = useState<string | null>(null);
  const [namespaceFilter, setNamespaceFilter] = useState<string>('all');
  const [datasourceFilter, setDatasourceFilter] = useState<string>('all');
  const [experimentTypeFilter, setExperimentTypeFilter] = useState<string>('all');
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    loadExperiments();
  }, []);

  const loadExperiments = async () => {
    setLoading(true);
    setError(null);
    try {
      // @ts-ignore
      await dispatch(getListOfExperiments());
    } catch (err) {
      setError('Failed to load experiments. Please try again.');
      console.error('Error loading experiments:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get unique namespaces from experiments
  const getUniqueNamespaces = (): string[] => {
    const namespaces = new Set<string>();
    experiments.forEach((exp: ExperimentData) => {
      exp.kubernetes_objects?.forEach(obj => {
        if (obj.namespace) {
          namespaces.add(obj.namespace);
        }
      });
    });
    return Array.from(namespaces).sort();
  };

  // Get unique datasources from experiments
  const getUniqueDatasources = (): string[] => {
    const datasources = new Set<string>();
    experiments.forEach((exp: ExperimentData) => {
      // Extract datasource from experiment name (format: datasource|cluster|namespace|workload(type)|container)
      const parts = exp.experiment_name.split('|');
      if (parts.length > 0 && parts[0]) {
        datasources.add(parts[0]);
      }
    });
    return Array.from(datasources).sort();
  };

  // Filter experiments based on datasource, namespace, experiment type and search
  const getFilteredExperiments = () => {
    let filtered = experiments;

    // Filter by datasource
    if (datasourceFilter !== 'all') {
      filtered = filtered.filter((exp: ExperimentData) => {
        const parts = exp.experiment_name.split('|');
        return parts.length > 0 && parts[0] === datasourceFilter;
      });
    }

    // Filter by namespace
    if (namespaceFilter !== 'all') {
      filtered = filtered.filter((exp: ExperimentData) =>
        Array.isArray(exp.kubernetes_objects) && exp.kubernetes_objects.some(obj => obj.namespace === namespaceFilter)
      );
    }

    // Filter by experiment type
    if (experimentTypeFilter !== 'all') {
      filtered = filtered.filter((exp: ExperimentData) => {
        const expType = exp.experiment_type || 'container';
        return expType === experimentTypeFilter;
      });
    }

    // Filter by search
    if (searchValue) {
      const search = searchValue.toLowerCase();
      filtered = filtered.filter((exp: ExperimentData) =>
        exp.experiment_name.toLowerCase().includes(search) ||
        exp.cluster_name.toLowerCase().includes(search) ||
        (Array.isArray(exp.kubernetes_objects) && exp.kubernetes_objects.some(obj =>
          obj.name?.toLowerCase().includes(search) ||
          obj.namespace?.toLowerCase().includes(search) ||
          (Array.isArray(obj.containers) && obj.containers.some(c => c.container_name?.toLowerCase().includes(search)))
        ))
      );
    }

    return filtered;
  };

  const handleViewRecommendations = (experimentName: string) => {
    history.push(`/listExperiments?experiment_name=${encodeURIComponent(experimentName)}`);
  };

  const filteredExperiments = getFilteredExperiments();
  const uniqueNamespaces = getUniqueNamespaces();
  const uniqueDatasources = getUniqueDatasources();

  return (
    <PageSection variant={PageSectionVariants.light} className="view-recommendations-page">
      <Title headingLevel="h1" size="2xl" className="page-title">
        View Recommendations
      </Title>
      <p className="page-description">
        Browse all experiments and view their recommendations
      </p>

      {error && (
        <Alert variant="danger" title="Error" isInline className="error-alert">
          {error}
        </Alert>
      )}

      <Card className="experiments-card">
        <CardBody>
          <div className="filters-section">
            <Flex>
              <FlexItem flex={{ default: 'flex_1' }}>
                <SearchInput
                  placeholder="Search by experiment name, cluster, workload, or container..."
                  value={searchValue}
                  onChange={(_event, value) => {
                    setSearchValue(value);
                    setPage(1);
                  }}
                  onClear={() => {
                    setSearchValue('');
                    setPage(1);
                  }}
                  style={{ width: '100%' }}
                />
              </FlexItem>
              <FlexItem>
                <FormSelect
                  value={datasourceFilter}
                  onChange={(_event, value) => {
                    setDatasourceFilter(value as string);
                    setPage(1);
                  }}
                  aria-label="Filter by datasource"
                  style={{ minWidth: '200px' }}
                >
                  <FormSelectOption key="all" value="all" label="All Datasources" />
                  {uniqueDatasources.map(ds => (
                    <FormSelectOption key={ds} value={ds} label={ds} />
                  ))}
                </FormSelect>
              </FlexItem>
              <FlexItem>
                <FormSelect
                  value={namespaceFilter}
                  onChange={(_event, value) => {
                    setNamespaceFilter(value as string);
                    setPage(1);
                  }}
                  aria-label="Filter by namespace"
                  style={{ minWidth: '200px' }}
                >
                  <FormSelectOption key="all" value="all" label="All Namespaces" />
                  {uniqueNamespaces.map(ns => (
                    <FormSelectOption key={ns} value={ns} label={ns} />
                  ))}
                </FormSelect>
              </FlexItem>
              <FlexItem>
                <FormSelect
                  value={experimentTypeFilter}
                  onChange={(_event, value) => {
                    setExperimentTypeFilter(value as string);
                    setPage(1);
                  }}
                  aria-label="Filter by experiment type"
                  style={{ minWidth: '200px' }}
                >
                  <FormSelectOption key="all" value="all" label="All Types" />
                  <FormSelectOption key="container" value="container" label="Container" />
                  <FormSelectOption key="namespace" value="namespace" label="Namespace" />
                </FormSelect>
              </FlexItem>
            </Flex>
          </div>

          {loading ? (
            <div className="loading-container">
              <Spinner size="lg" />
              <p>Loading experiments...</p>
            </div>
          ) : filteredExperiments.length === 0 ? (
            <Alert variant="info" title="No experiments found" isInline>
              {experiments.length === 0
                ? 'No experiments have been created yet.'
                : 'No experiments match your search criteria.'}
            </Alert>
          ) : (
            <Table variant="compact" borders>
              <Thead>
                <Tr>
                  <Th>Experiment Name</Th>
                  <Th>Datasource</Th>
                  <Th>Cluster</Th>
                  <Th>Namespace</Th>
                  <Th>Experiment Type</Th>
                  <Th>Workload</Th>
                  <Th>Container</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredExperiments
                  .slice((page - 1) * perPage, page * perPage)
                  .map((exp: ExperimentData, idx: number) => {
                    const kubeObj = exp.kubernetes_objects?.[0];
                    const container = kubeObj?.containers?.[0];
                    // Extract datasource and container from experiment name
                    // Format: datasource|cluster|namespace|workload(type)|container
                    const parts = exp.experiment_name.split('|');
                    const datasource = parts[0] || 'N/A';
                    const containerName = parts[4] || container?.container_name || 'N/A';
                    const experimentType = exp.experiment_type || 'container';
                    
                    return (
                      <Tr key={`${exp.experiment_name}-${idx}`}>
                        <Td>{exp.experiment_name}</Td>
                        <Td>
                          <Badge isRead>{datasource}</Badge>
                        </Td>
                        <Td>{exp.cluster_name || 'N/A'}</Td>
                        <Td>{kubeObj?.namespace || 'N/A'}</Td>
                        <Td>
                          <Badge isRead>{experimentType}</Badge>
                        </Td>
                        <Td>{experimentType === 'namespace' ? 'N/A' : (kubeObj?.name || 'N/A')}</Td>
                        <Td>{experimentType === 'namespace' ? 'N/A' : containerName}</Td>
                        <Td>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleViewRecommendations(exp.experiment_name)}
                          >
                            View Recommendations
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          )}

          {filteredExperiments.length > 0 && (
            <Pagination
              itemCount={filteredExperiments.length}
              perPage={perPage}
              page={page}
              onSetPage={(_event, pageNumber) => setPage(pageNumber)}
              onPerPageSelect={(_event, newPerPage) => {
                setPerPage(newPerPage);
                setPage(1);
              }}
              variant="bottom"
            />
          )}
        </CardBody>
      </Card>
    </PageSection>
  );
};

export { ViewRecommendations };

// Made with Bob
