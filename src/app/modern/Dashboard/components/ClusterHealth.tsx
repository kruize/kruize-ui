import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getDatasourceMetadataURL } from '@app/CentralConfig';

interface ClusterHealthProps {
  datasources: any[];
}

const ClusterHealth: React.FC<ClusterHealthProps> = ({ datasources }) => {
  const [healthData, setHealthData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClusterHealth = async () => {
      if (!datasources || datasources.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const healthPromises = datasources.map(async (ds) => {
          try {
            const response = await fetch(getDatasourceMetadataURL(ds.name));
            const data = await response.json();
            return {
              name: ds.name,
              status: 'healthy',
              data: data,
            };
          } catch {
            return {
              name: ds.name,
              status: 'error',
            };
          }
        });

        const results = await Promise.all(healthPromises);
        setHealthData(results);
      } catch (error) {
        console.error('Error fetching cluster health:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClusterHealth();
  }, [datasources]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading cluster health...</div>;
  }

  if (healthData.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
        No cluster data available
      </div>
    );
  }

  const healthyCount = healthData.filter(h => h.status === 'healthy').length;
  const errorCount = healthData.filter(h => h.status === 'error').length;

  const chartData = [
    { name: 'Healthy', value: healthyCount, color: '#10b981' },
    { name: 'Issues', value: errorCount, color: '#ef4444' },
  ].filter(d => d.value > 0);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Total Clusters: {healthData.length}
        </div>
      </div>
    </div>
  );
};

export { ClusterHealth };

// Made with Bob
