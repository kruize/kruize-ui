import React, { useState } from 'react';
import {
  ChartThemeColor,

} from '@patternfly/react-charts';
import { Flex, FlexItem } from '@patternfly/react-core';
import BoxPlot from './BoxPlot';
import chart_color_blue_300 from '@patternfly/react-tokens/dist/esm/chart_color_blue_300';
import { getMaxValueFromConvertedData, convertMmrData } from './CostBoxPlotCharts';

const PerfBoxPlotCharts = (props: { boxPlotData; limitRequestData }) => {
  const cpuDataLimit = props.limitRequestData?.limits?.cpu?.amount;
  const cpuDataRequest = props.limitRequestData?.requests?.cpu?.amount;

  const mmrDataLimit = (props.limitRequestData?.limits?.memory?.amount)/1024 ** 2;
  const mmrDataRequest = (props.limitRequestData?.requests?.memory?.amount)/1024 ** 2;
console.log(mmrDataLimit)
console.log(mmrDataRequest)
  const cpulimitsChart = props.boxPlotData?.cpu?.map((dict) => {
    return { ...dict, y: cpuDataLimit };
  });
  const cpurequestChart = props.boxPlotData?.cpu?.map((dict) => {
    return { ...dict, y: cpuDataRequest };
  });

  const mmrlimitsChart = props.boxPlotData?.mmr?.map((dict) => {
    return { ...dict, y: mmrDataLimit };
  });
  const mmrrequestChart = props.boxPlotData?.mmr?.map((dict) => {
    return { ...dict, y: mmrDataRequest };
  });

  const { maxValue: maxcpuValue, minVal: mincpuVal } = props.boxPlotData?.cpu  ? getMaxValueFromConvertedData(props.boxPlotData?.cpu, true)   : { maxValue: 1, minVal: 0 };

  const { maxValue, minVal } =  props.boxPlotData?.mmr ? getMaxValueFromConvertedData(props.boxPlotData?.mmr, false):{ maxValue: 1, minVal: 0 }
  const ab = convertMmrData(props.boxPlotData?.mmr)

  // cpu and mmr box plots for performance
  return (
    <Flex direction={{ default: 'row' }} >
      <FlexItem style={{ width: '50%' }}>
      <BoxPlot
        data={props.boxPlotData?.cpu}
        limitsThresholdChartData={cpulimitsChart}
        requestThresholdChartData={cpurequestChart}
        chartTitle="CPU"
        ariaDesc="CPU"
        domain={{ y: [mincpuVal, maxcpuValue] }}
        themeColor={ChartThemeColor.orange}
        legendData={[{ name: 'CPU' }]}
      />
</FlexItem>

<FlexItem>
      <BoxPlot
        data={ab}
        limitsThresholdChartData={mmrlimitsChart}
        requestThresholdChartData={mmrrequestChart}
        chartTitle="Memory"
        ariaDesc="Memory"
        domain={{ y: [minVal, maxValue] }}
        themeColor={ChartThemeColor.orange}
        legendData={[{ name: 'Memory' }]}
      />
    </FlexItem>
    </Flex>
  );
};

export { PerfBoxPlotCharts };
