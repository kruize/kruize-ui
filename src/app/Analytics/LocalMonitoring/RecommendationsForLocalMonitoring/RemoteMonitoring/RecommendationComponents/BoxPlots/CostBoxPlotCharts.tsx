import React from 'react';
import { ChartThemeColor } from '@patternfly/react-charts';
import { Grid, Text, GridItem, PageSection, PageSectionVariants, TextContent, TextVariants, StackItem, Stack } from '@patternfly/react-core';
import BoxPlot from './BoxPlot';

export const convertMmrData = (day, data: any[], unitVal) => {
  return data?.map((item) => ({
    ...item,
    x: day === 'short_term' ? item.x.substring(11, 16) : item.x.split('T')[0],
    y: item?.y?.map((value: number) => Math.floor(value / 1024 ** unitVal))
  }));
};

export const getMaxValueFromConvertedData = (day, data: any[], requestValue, cpuTrue, unitVal) => {
  const convertedData = cpuTrue ? data : convertMmrData(day, data, unitVal);
  const allValues = convertedData.flatMap((item) => item.y || []);

  const maxV = Math.max(...allValues, requestValue);
  const buffer = 0.1 * maxV;
  const maxValue = Math.max(...allValues, requestValue) + buffer;
  const minVal = Math.min(...allValues, requestValue) - buffer;
  return { maxValue, minVal };
};

const CostBoxPlotCharts = (props: { unitValueforMemory, boxPlotData; showCostBoxPlot; day; limitRequestData }) => {
  const cpuDataLimit = props.limitRequestData?.limits?.cpu?.amount;
  const cpuDataRequest = props.limitRequestData?.requests?.cpu?.amount;

  const mmrDataLimit = Math.floor(props.limitRequestData?.limits?.memory?.amount / 1024 ** props.unitValueforMemory);
  const mmrDataRequest = Math.floor(props.limitRequestData?.requests?.memory?.amount / 1024 ** props.unitValueforMemory);

  const cpulimitsChart = props.boxPlotData?.cpu?.map((dict) => {
    return {
      ...dict,
      x: props.day === 'short_term' ? dict.x.substring(11, 16) : dict.x.split('T')[0],
      y: cpuDataLimit
    };
  });
  const cpurequestChart = props.boxPlotData?.cpu?.map((dict) => {
    return {
      ...dict,
      x: props.day === 'short_term' ? dict.x.substring(11, 16) : dict.x.split('T')[0],
      y: cpuDataRequest
    };
  });

  const mmrlimitsChart = props.boxPlotData?.mmr?.map((dict) => {
    return {
      ...dict,
      x: props.day === 'short_term' ? dict.x.substring(11, 16) : dict.x.split('T')[0],
      y: mmrDataLimit
    };
  });
  const mmrrequestChart = props.boxPlotData?.mmr?.map((dict) => {
    return {
      ...dict,
      x: props.day === 'short_term' ? dict.x.substring(11, 16) : dict.x.split('T')[0],
      y: mmrDataRequest
    };
  });

  const { maxValue: maxcpuValue, minVal: mincpuVal } = props.boxPlotData?.cpu
    ? getMaxValueFromConvertedData(props.day, props.boxPlotData?.cpu, cpuDataRequest, true, props.unitValueforMemory)
    : { maxValue: 1, minVal: 0 };

  const { maxValue, minVal } = props.boxPlotData?.mmr
    ? getMaxValueFromConvertedData(props.day, props.boxPlotData?.mmr, mmrDataRequest, false, props.unitValueforMemory)
    : { maxValue: 1, minVal: 0 };

  const mmr_cost_boxplot_data = convertMmrData(props.day, props.boxPlotData?.mmr, props.unitValueforMemory);

  const cpu_cost_boxplot_data = props.boxPlotData?.cpu?.map((dict) => {
    return { 
      ...dict, 
      x: props.day === 'short_term' ? dict.x.substring(11, 16) : dict.x.split('T')[0] ,
      y: dict.y?.map((value: number) => Math.round(value * 1000) / 1000) 
    };
  });

  // cpu and mmr box plots for cost
  return (
    <Grid hasGutter>
      <GridItem span={6} rowSpan={8}>
      <TextContent>
        <Text component={TextVariants.h3}>CPU Utilization</Text>
      </TextContent>
        {props.showCostBoxPlot ? (
          <BoxPlot
            data={cpu_cost_boxplot_data}
            limitsThresholdChartData={cpulimitsChart}
            requestThresholdChartData={cpurequestChart}
            chartTitle="CPU"
            ariaDesc="CPU"
            domain={{ y: [mincpuVal, maxcpuValue] }}
            themeColor={ChartThemeColor.orange}
            legendData={[{ name: 'CPU' }]}
            isCpuPlot={true}
          />
        ) : (
          <BoxPlot
            data={cpu_cost_boxplot_data}
            limitsThresholdChartData={cpulimitsChart}
            requestThresholdChartData={cpurequestChart}
            chartTitle="CPU"
            ariaDesc="CPU"
            domain={{ y: [0, 1] }}
            themeColor={ChartThemeColor.orange}
            legendData={[{ name: 'CPU' }]}
            isCpuPlot={true}
          />
        )}
      </GridItem>
      <GridItem span={6} rowSpan={8}>
      <TextContent>
        <Text component={TextVariants.h3}>Memory Utilization</Text>
      </TextContent>
        <BoxPlot
          data={mmr_cost_boxplot_data}
          limitsThresholdChartData={mmrlimitsChart}
          requestThresholdChartData={mmrrequestChart}
          chartTitle="Memory"
          ariaDesc="Memory"
          domain={{ y: [minVal, maxValue] }}
          themeColor={ChartThemeColor.orange}
          legendData={[{ name: 'Memory' }]}
          isCpuPlot={false}
        />
      </GridItem>
    </Grid>
  );
};

export { CostBoxPlotCharts };
