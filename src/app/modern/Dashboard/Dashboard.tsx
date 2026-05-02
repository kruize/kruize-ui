import React, { useState, useEffect } from 'react';
import {
  PageSection,
  PageSectionVariants,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardTitle,
  Flex,
  FlexItem,
  Spinner,
  Text,
  TextContent,
  TextVariants,
} from '@patternfly/react-core';
import { useDispatch, useSelector } from 'react-redux';
import { getListOfDataSources } from '@actions/DataSourceActionCreator';
import { getListOfExperiments } from '@actions/ExperimentActionCreator';
import './Dashboard.css';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subtitle, trend, icon }) => {
  return (
    <Card className="metric-card">
      <CardTitle>
        <Flex alignItems={{ default: 'alignItemsCenter' }}>
          {icon && <FlexItem className="metric-icon">{icon}</FlexItem>}
          <FlexItem>{title}</FlexItem>
        </Flex>
      </CardTitle>
      <CardBody>
        <TextContent>
          <Text component={TextVariants.h1} className="metric-value">
            {value}
          </Text>
          {subtitle && (
            <Text component={TextVariants.small} className={`metric-subtitle ${trend ? `trend-${trend}` : ''}`}>
              {subtitle}
            </Text>
          )}
        </TextContent>
      </CardBody>
    </Card>
  );
};

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    datasources: 0,
    workloads: 0,
  });

  // Get data from Redux store
  const datasources = useSelector((state: any) => state.dataSource?.datasources || []);
  const experiments = useSelector((state: any) => state.experiments?.listOfExperiments || []);

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(getListOfDataSources() as any),
          dispatch(getListOfExperiments() as any),
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    // Update metrics when data changes - count experiments as workloads
    setMetrics({
      datasources: datasources.length || 0,
      workloads: experiments.length || 0,
    });
  }, [datasources, experiments]);

  if (loading) {
    return (
      <PageSection variant={PageSectionVariants.light} className="dashboard-loading">
        <Flex justifyContent={{ default: 'justifyContentCenter' }} alignItems={{ default: 'alignItemsCenter' }}>
          <Spinner size="xl" />
          <Text>Loading dashboard...</Text>
        </Flex>
      </PageSection>
    );
  }

  return (
    <PageSection variant={PageSectionVariants.light} style={{ backgroundColor: '#ffffff' }} className="modern-dashboard">
      <TextContent className="dashboard-header">
        <Text component={TextVariants.h1}>Kruize Dashboard</Text>
        <Text component={TextVariants.p}>
          Monitor your Kubernetes workloads and optimize resource usage
        </Text>
      </TextContent>

      <Grid hasGutter>
        <GridItem span={12} md={6}>
          <MetricCard
            title="Data Sources"
            value={metrics.datasources}
            subtitle="Connected clusters"
            icon="📊"
          />
        </GridItem>
        <GridItem span={12} md={6}>
          <MetricCard
            title="Workloads"
            value={metrics.workloads}
            subtitle="Active experiments"
            icon="⚙️"
          />
        </GridItem>
      </Grid>

      <Grid hasGutter style={{ marginTop: '2rem' }}>
        <GridItem span={12}>
          <Card>
            <CardTitle>Quick Actions</CardTitle>
            <CardBody>
              <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsLg' }}>
                <FlexItem>
                  <Text component={TextVariants.h3} style={{ marginBottom: '1rem' }}>Getting Started with Kruize</Text>
                  <Text component={TextVariants.p} style={{ marginBottom: '1.5rem', color: '#6a6e73' }}>
                    Kruize helps you optimize Kubernetes resource usage through intelligent recommendations. Navigate through the following sections:
                  </Text>
                </FlexItem>
                
                <FlexItem>
                  <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', marginBottom: '1rem' }}>
                    <Text component={TextVariants.h4} style={{ marginBottom: '0.5rem' }}>
                      📊 <strong>Explore Cluster</strong>
                    </Text>
                    <Text component={TextVariants.p} style={{ color: '#6a6e73' }}>
                      Browse your cluster structure, view workloads across namespaces, and check experiment status. Import metadata to visualize your cluster hierarchy as an interactive tree.
                    </Text>
                  </div>
                </FlexItem>

                <FlexItem>
                  <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', marginBottom: '1rem' }}>
                    <Text component={TextVariants.h4} style={{ marginBottom: '0.5rem' }}>
                      📈 <strong>View Recommendations</strong>
                    </Text>
                    <Text component={TextVariants.p} style={{ color: '#6a6e73' }}>
                      Access all experiment recommendations in one place. Filter by datasource, namespace, or search for specific workloads. View detailed cost and performance optimization suggestions.
                    </Text>
                  </div>
                </FlexItem>

                <FlexItem>
                  <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                    <Text component={TextVariants.h4} style={{ marginBottom: '0.5rem' }}>
                      ⚙️ <strong>Installed Configs</strong>
                    </Text>
                    <Text component={TextVariants.p} style={{ color: '#6a6e73' }}>
                      Review installed metadata profiles, metric profiles, and layers. View detailed configuration settings and query definitions for each profile.
                    </Text>
                  </div>
                </FlexItem>
              </Flex>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </PageSection>
  );
};

// Made with Bob
