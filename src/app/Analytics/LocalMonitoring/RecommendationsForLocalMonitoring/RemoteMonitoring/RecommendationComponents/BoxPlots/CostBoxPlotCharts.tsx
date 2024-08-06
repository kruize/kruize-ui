import React, { useState } from 'react';
import {
  Chart,
  ChartAxis,
  ChartGroup,
  ChartLine,
  ChartThemeColor,
  ChartThreshold,
  ChartVoronoiContainer
} from '@patternfly/react-charts';
import { formatTimestamps, filterDataByTerm, formatNumber } from './../ChatDataPreparation';
import { Card, Grid, GridItem } from '@patternfly/react-core';
import BoxPlot from './BoxPlot/BoxPlot';

import chart_color_blue_300 from '@patternfly/react-tokens/dist/esm/chart_color_blue_300';

const CostBoxPlotCharts = (props: { boxPlotData; limitRequestData}) => {
  const limit = props.limitRequestData
  console.log(limit)
  const cpuDataLimit = props.limitRequestData?.limits?.cpu.amount

  return (
    <Card>
      <BoxPlot
        data={props.boxPlotData}
        requestLimitsData={props.limitRequestData}
        chartTitle="CPU"
        ariaDesc="CPU"
        domain={{ y: [0,0.1] }}
        themeColor={ChartThemeColor.orange}
        legendData={[{ name: 'CPU' }]}
      />

    </Card>
  );
};

export { CostBoxPlotCharts };
