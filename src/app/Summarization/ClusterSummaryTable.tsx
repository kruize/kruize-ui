import NestedHeaderTable from '@app/Components/NestedHeaderTable';
import React from 'react';
import jsonData from '@app/Data/data.json';

const ClusterSummaryTable = () => {
  return (
    <>
      <NestedHeaderTable data={jsonData} />
    </>
  );
};

export { ClusterSummaryTable };
