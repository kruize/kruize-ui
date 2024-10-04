import React, { useState } from 'react';
import { ChartThemeColor } from '@patternfly/react-charts';
import { Flex, FlexItem, Grid, GridItem } from '@patternfly/react-core';
import BoxPlot from './BoxPlot';
import chart_color_blue_300 from '@patternfly/react-tokens/dist/esm/chart_color_blue_300';
import { getMaxValueFromConvertedData, convertMmrData } from './CostBoxPlotCharts';

const PerfBoxPlotCharts = (props: { unitValueforMemory ,boxPlotData; day; showPerfBoxPlot; limitRequestData }) => {
  const cpuDataLimit = props.limitRequestData?.limits?.cpu?.amount;
  const cpuDataRequest = props.limitRequestData?.requests?.cpu?.amount;

  const mmrDataLimit = props.limitRequestData?.limits?.memory?.amount / 1024 ** props.unitValueforMemory;
  const mmrDataRequest = props.limitRequestData?.requests?.memory?.amount / 1024 ** props.unitValueforMemory;

  const cpulimitsChart = props.boxPlotData?.cpu?.map((dict) => {
    return {
      ...dict,
      x: props.day === 'short_term' ? dict.x.substring(11, 16): dict.x.split('T')[0],
      y: cpuDataLimit
    };
  });
  const cpurequestChart = props.boxPlotData?.cpu?.map((dict) => {
    return {
      ...dict,
      x: props.day === 'short_term' ? dict.x.substring(11, 16): dict.x.split('T')[0],
      y: cpuDataRequest
    };
  });

  const mmrlimitsChart = props.boxPlotData?.mmr?.map((dict) => {
    return {
      ...dict,
      x: props.day === 'short_term' ? dict.x.substring(11, 16): dict.x.split('T')[0],
      y: mmrDataLimit
    };
  });

  const mmrrequestChart = props.boxPlotData?.mmr?.map((dict) => {
    return {
      ...dict,
      x: props.day === 'short_term' ? dict.x.substring(11, 16): dict.x.split('T')[0],
      y: mmrDataRequest
    };
  });

  const { maxValue: maxcpuValue, minVal: mincpuVal } = props.boxPlotData?.cpu
    ? getMaxValueFromConvertedData(props.day, props.boxPlotData?.cpu, cpuDataRequest, true, props.unitValueforMemory)
    : { maxValue: 1, minVal: 0 };

  const { maxValue, minVal } = props.boxPlotData?.mmr
    ? getMaxValueFromConvertedData(props.day, props.boxPlotData?.mmr, mmrDataRequest, false, props.unitValueforMemory)
    : { maxValue: 1, minVal: 0 };

  const mmr_perf_boxplot_data = convertMmrData(props.day, props.boxPlotData?.mmr, props.unitValueforMemory);
  const cpu_perf_boxplot_data = props.boxPlotData?.cpu?.map((dict) => {
    return { ...dict, x: props.day === 'short_term' ? dict.x.substring(11, 16) : dict.x.split('T')[0] };
  });
  // cpu and mmr box plots for performance
  return (
    <Grid hasGutter>
      <GridItem span={6} rowSpan={8}>
     {props.showPerfBoxPlot?
        <BoxPlot
          data={cpu_perf_boxplot_data}
          limitsThresholdChartData={cpulimitsChart}
          requestThresholdChartData={cpurequestChart}
          chartTitle="CPU"
          ariaDesc="CPU"
          domain={{ y: [mincpuVal, maxcpuValue] }}
          themeColor={ChartThemeColor.orange}
          legendData={[{ name: 'CPU' }]}
        /> :
        <BoxPlot
          data={cpu_perf_boxplot_data}
          limitsThresholdChartData={cpulimitsChart}
          requestThresholdChartData={cpurequestChart}
          chartTitle="CPU"
          ariaDesc="CPU"
          domain={{ y: [0,1] }}
          themeColor={ChartThemeColor.orange}
          legendData={[{ name: 'CPU' }]}
        />
     }
      </GridItem>
      <GridItem span={6} rowSpan={8}>
        <BoxPlot
          data={mmr_perf_boxplot_data}
          limitsThresholdChartData={mmrlimitsChart}
          requestThresholdChartData={mmrrequestChart}
          chartTitle="Memory"
          ariaDesc="Memory"
          domain={{ y: [minVal, maxValue] }}
          themeColor={ChartThemeColor.orange}
          legendData={[{ name: 'Memory' }]}
        />
      </GridItem>
    </Grid>
  );
};

export { PerfBoxPlotCharts };
