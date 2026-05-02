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
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
  Button,
} from '@patternfly/react-core';
import { CubesIcon } from '@patternfly/react-icons';
import Tree from 'react-d3-tree';
import { useDispatch, useSelector } from 'react-redux';
import { getListOfDataSources, importDataSourceMetaData } from '@actions/DataSourceActionCreator';
import { getListOfExperiments } from '@actions/ExperimentActionCreator';
import './ImportMetadata.css';

interface TreeNode {
  name: string;
  attributes?: {
    type: string;
    count?: number;
  };
  children?: TreeNode[];
}

export const ImportMetadata: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [selectedDataSource, setSelectedDataSource] = useState<string>('');

  const datasources = useSelector((state: any) => state.dataSource?.datasources || []);
  const dataSourceMetadata = useSelector((state: any) => state.dataSource?.dataSourceMetaData || {});
  const experiments = useSelector((state: any) => state.experiments?.listOfExperiments || []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(getListOfDataSources() as any),
          dispatch(getListOfExperiments() as any),
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (datasources.length > 0 && !selectedDataSource) {
      setSelectedDataSource(datasources[0].datasource_name || datasources[0].name);
    }
  }, [datasources, selectedDataSource]);

  useEffect(() => {
    if (selectedDataSource) {
      dispatch(importDataSourceMetaData(selectedDataSource) as any);
    }
  }, [selectedDataSource, dispatch]);

  useEffect(() => {
    // Build tree structure from metadata
    if (dataSourceMetadata && Object.keys(dataSourceMetadata).length > 0) {
      const tree = buildTreeFromMetadata(dataSourceMetadata, experiments);
      setTreeData(tree);
    }
  }, [dataSourceMetadata, experiments]);

  const buildTreeFromMetadata = (metadata: any, exps: any[]): TreeNode => {
    const root: TreeNode = {
      name: 'Clusters',
      attributes: { type: 'root' },
      children: [],
    };

    // Group experiments by cluster and namespace
    const clusterMap = new Map<string, Map<string, any[]>>();

    exps.forEach((exp) => {
      const clusterName = exp.cluster_name || 'default-cluster';
      const namespace = exp.kubernetes_objects?.[0]?.namespace || 'default';

      if (!clusterMap.has(clusterName)) {
        clusterMap.set(clusterName, new Map());
      }

      const namespaceMap = clusterMap.get(clusterName)!;
      if (!namespaceMap.has(namespace)) {
        namespaceMap.set(namespace, []);
      }

      namespaceMap.get(namespace)!.push(exp);
    });

    // Build tree structure
    clusterMap.forEach((namespaceMap, clusterName) => {
      // Count total experiments in cluster
      let totalExperiments = 0;
      namespaceMap.forEach((workloads) => {
        totalExperiments += workloads.length;
      });
      
      const clusterNode: TreeNode = {
        name: clusterName,
        attributes: { type: 'cluster', count: totalExperiments },
        children: [],
      };

      namespaceMap.forEach((workloads, namespace) => {
        const namespaceNode: TreeNode = {
          name: namespace,
          attributes: { type: 'namespace', count: workloads.length },
          children: [],
        };

        workloads.forEach((workload) => {
          const workloadNode: TreeNode = {
            name: workload.experiment_name || 'Unnamed Workload',
            attributes: { type: 'workload' },
            children: [],
          };

          // Show experiment created status
          workloadNode.children!.push({
            name: 'Experiment Created',
            attributes: { type: 'experiment' },
          });

          namespaceNode.children!.push(workloadNode);
        });

        clusterNode.children!.push(namespaceNode);
      });

      root.children!.push(clusterNode);
    });

    return root;
  };

  const renderCustomNode = ({ nodeDatum }: any) => {
    const getNodeColor = (type: string) => {
      switch (type) {
        case 'root':
          return '#0066cc';
        case 'cluster':
          return '#2e7d32';
        case 'namespace':
          return '#f57c00';
        case 'workload':
          return '#7b1fa2';
        case 'experiment':
          return '#388e3c';
        default:
          return '#757575';
      }
    };

    return (
      <g>
        <circle r={15} fill={getNodeColor(nodeDatum.attributes?.type)} />
        <text
          fill="black"
          strokeWidth="0"
          x={20}
          dy=".31em"
          fontSize="14"
          fontWeight={nodeDatum.attributes?.type === 'root' ? 'bold' : 'normal'}
        >
          {nodeDatum.name}
          {nodeDatum.attributes?.count &&
            (nodeDatum.attributes.type === 'cluster' || nodeDatum.attributes.type === 'namespace')
            ? ` (${nodeDatum.attributes.count} Experiment${nodeDatum.attributes.count !== 1 ? 's' : ''})`
            : nodeDatum.attributes?.count ? ` (${nodeDatum.attributes.count})` : ''
          }
        </text>
      </g>
    );
  };

  if (loading) {
    return (
      <PageSection variant={PageSectionVariants.light} style={{ backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <Spinner size="xl" />
          <Text style={{ marginLeft: '1rem' }}>Loading metadata...</Text>
        </div>
      </PageSection>
    );
  }

  if (!treeData || !treeData.children || treeData.children.length === 0) {
    return (
      <PageSection variant={PageSectionVariants.light} style={{ backgroundColor: '#ffffff' }}>
        <TextContent>
          <Text component={TextVariants.h1}>Import Metadata</Text>
          <Text component={TextVariants.p}>
            Visualize your cluster structure with workloads and recommendations
          </Text>
        </TextContent>

        <Card style={{ marginTop: '2rem' }}>
          <CardBody>
            <EmptyState>
              <EmptyStateIcon icon={CubesIcon} />
              <TextContent>
                <Text component={TextVariants.h2}>No Metadata Available</Text>
              </TextContent>
              <EmptyStateBody>
                No workloads or experiments found. Create experiments to see the cluster structure.
              </EmptyStateBody>
            </EmptyState>
          </CardBody>
        </Card>
      </PageSection>
    );
  }

  return (
    <PageSection variant={PageSectionVariants.light} style={{ backgroundColor: '#ffffff' }}>
      <TextContent>
        <Text component={TextVariants.h1}>Import Metadata</Text>
        <Text component={TextVariants.p}>
          Visualize your cluster structure with workloads and recommendations
        </Text>
      </TextContent>

      <Card style={{ marginTop: '2rem' }}>
        <CardTitle>Cluster Hierarchy</CardTitle>
        <CardBody>
          <div style={{ width: '100%', height: '600px' }}>
            <Tree
              data={treeData}
              orientation="vertical"
              pathFunc="step"
              translate={{ x: 400, y: 50 }}
              nodeSize={{ x: 200, y: 100 }}
              renderCustomNodeElement={renderCustomNode}
              separation={{ siblings: 1.5, nonSiblings: 2 }}
              zoom={0.8}
            />
          </div>
        </CardBody>
      </Card>

      <Card style={{ marginTop: '1rem' }}>
        <CardTitle>Legend</CardTitle>
        <CardBody>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#0066cc' }} />
              <Text>Root</Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#2e7d32' }} />
              <Text>Cluster</Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#f57c00' }} />
              <Text>Namespace</Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#7b1fa2' }} />
              <Text>Workload</Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#388e3c' }} />
              <Text>Experiment Created</Text>
            </div>
          </div>
        </CardBody>
      </Card>
    </PageSection>
  );
};

// Made with Bob