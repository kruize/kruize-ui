import React from 'react';
import { ChartThemeColor } from '@patternfly/react-charts';
import { Grid, GridItem } from '@patternfly/react-core';
import BoxPlot from './BoxPlot';

// conversion values needs to be fixed here as well
export const convertMmrData = (day, data: any[]) => {
  // let displaykey =  day === 'short_term' ? key.split(' ')[1] : key.split(' ')[0];

  return data?.map((item) => ({
    ...item,
    x: day === 'short_term' ? item.x.substring(11, 16) : item.x.split('T')[0],
    y: item?.y?.map((value: number) => value / 1024 ** 3)
  }));
};

export const getMaxValueFromConvertedData = (day, data: any[], requestValue, cpuTrue) => {
  const convertedData = cpuTrue ? data : convertMmrData(day, data);
  const allValues = convertedData.flatMap((item) => item.y || []);

  // once buffer value is known we can add that here
  const maxV = Math.max(...allValues, requestValue);
  const buffer = 0.1 * maxV;
  const maxValue = Math.max(...allValues, requestValue) + buffer;
  const minVal = Math.min(...allValues, requestValue) - buffer;
  return { maxValue, minVal };
};

const CostBoxPlotCharts = (props: { boxPlotData; showCostBoxPlot; day; limitRequestData }) => {
  const cpuDataLimit = props.limitRequestData?.limits?.cpu?.amount;
  const cpuDataRequest = props.limitRequestData?.requests?.cpu?.amount;

  // this needs to be fixed the conversion values
  const mmrDataLimit = props.limitRequestData?.limits?.memory?.amount / 1024 ** 3;
  const mmrDataRequest = props.limitRequestData?.requests?.memory?.amount / 1024 ** 3;

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
    ? getMaxValueFromConvertedData(props.day, props.boxPlotData?.cpu, cpuDataRequest, true)
    : { maxValue: 1, minVal: 0 };

  // console.log(maxcpuValue, mincpuVal);
  const { maxValue, minVal } = props.boxPlotData?.mmr
    ? getMaxValueFromConvertedData(props.day, props.boxPlotData?.mmr, mmrDataRequest, false)
    : { maxValue: 1, minVal: 0 };

  console.log(maxcpuValue, mincpuVal);
  console.log(maxValue, minVal);
  const mmr_cost_boxplot_data = convertMmrData(props.day, props.boxPlotData?.mmr);
  const cpu_cost_boxplot_data = props.boxPlotData?.cpu?.map((dict) => {
    return { ...dict, x: props.day === 'short_term' ? dict.x.substring(11, 16) : dict.x.split('T')[0] };
  });

  // cpu and mmr box plots for cost
  return (
    <Grid hasGutter>
      <GridItem span={6} rowSpan={8}>
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
          />
        )}
      </GridItem>
      <GridItem span={6} rowSpan={8}>
        <BoxPlot
          data={mmr_cost_boxplot_data}
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

export { CostBoxPlotCharts };
