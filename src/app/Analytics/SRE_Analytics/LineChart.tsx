import React, { useEffect, useState, useContext } from 'react';
import { Chart, ChartAxis, ChartGroup, ChartLine, ChartThemeColor, ChartLegendTooltip, createContainer } from '@patternfly/react-charts';


const LineChart = (props: { chartData; setChartData}) => {

    const CursorVoronoiContainer = createContainer("voronoi", "cursor");
    const legendData = [{ childName: 'avg', name: 'Average' }, { childName: 'max', name: 'Max', symbol: { type: '' }}];
  
  return (
  <div style={{ height: '275px', width: '450px' }}>
    <Chart
      ariaDesc="CPU Usage"
      ariaTitle="CPU Usage"
      containerComponent={
        <CursorVoronoiContainer
          cursorDimension="x"
          labels={({ datum }) => `${datum.y}`}
          labelComponent={<ChartLegendTooltip legendData={legendData} title={(datum) => datum.x}/>}
          mouseFollowTooltips
          voronoiDimension="x"
          voronoiPadding={100}
        />
      }
      legendData={legendData}
      legendPosition="bottom"
      height={275}
      maxDomain={{y: 4}}
      minDomain={{y: 0}}
      name="CPU Usage"
      padding={{
        bottom: 75, // Adjusted to accommodate legend
        left: 50,
        right: 50,
        top: 50
      }}
      themeColor={ChartThemeColor.blue}
      width={450}
    >
    <ChartAxis tickValues={[0,1,2,3,4,5,6,7,8]} />
    <ChartAxis dependentAxis showGrid tickValues={[0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0]} />
      <ChartGroup>
        
        <ChartLine
                data={props.chartData.chartMetrics.map(item => ({ y:item.metrics.cpuUsage.avg, x: item.interval_end_time }))}
          name="avg"
        />
        <ChartLine
            data={props.chartData.chartMetrics.map(item => ({ y:item.metrics.cpuUsage.max , x: item.interval_end_time}))}
          name="max"
          
        />
      
      </ChartGroup>
    </Chart>
  </div>
);
}


// const legendData = [{ childName: 'avg', name: 'Average' },
// { childName: 'max', name: 'Max', symbol: { type: '' } },
// ];

// const formatTime = (dateTime) => {
// const options = { hour: 'numeric', minute: 'numeric' };
// return new Date(dateTime).toLocaleTimeString([], options);
// };

// const metricsName = ['cpuUsage', 'cpuThrottle', 'memoryUsage', 'memoryRSS'];

// return (
// <div style={{ height: '400px', width: '100%' }}>
//   {metricsName.map((name, index) => (
//     <div key={index} style={{ marginBottom: '1rem' }}>
        
//       <Chart
//         ariaDesc={name}
//         ariaTitle={name}
//         containerComponent={
//           <CursorVoronoiContainer
//             cursorDimension="x"
//             labels={({ datum }) => `${datum.y}`}
//             labelComponent={<ChartLegendTooltip legendData={legendData} title={(datum) => datum.x} />}
//             mouseFollowTooltips
//             voronoiDimension="x"
//             voronoiPadding={50}
//           />
//         }
//         legendData={legendData}
//         legendPosition="bottom"
//         height={275}
//         maxDomain={{
//           y:5
//         }}
//         minDomain={{ y: 0 }}
//         name={name}
//         padding={{
//           bottom: 75, // Adjusted to accommodate legend
//           left: 50,
//           right: 50,
//           top: 50,
//         }}
//         themeColor={ChartThemeColor.blue}
//         width={600} // Specify a valid width value here
//       >
//         <ChartAxis tickValues={[]} />
//         <ChartAxis
//           dependentAxis
//           showGrid
//           tickValues={[
//             0.0,
//             0.5,
//             1.0,
//             1.5,
//             2.0,
//             2.5,
//             3.0,
//             // Math.max(
//             //   ...Object.values(chart.metrics).flatMap((metric) => [metric.avg, metric.max])
//             // ),
//           ]}
//         />
//         <ChartGroup>
//           {Object.entries(props.chartData.chartMetrics).map(([metricData]) => (
//             <>
//             {console.log(metricData[interval_end_time])}
//               {/* <ChartLine
//                 key={`${metricData.metrics}-avg`}
//                 data={[{ y: metricData.interval_end_time, x: metricData.metricName.avg }]}
//                 name="avg"
//               />
//               <ChartLine
//                 key={`${metricData.metricName}-max`}
//                 data={[{ y: metricData.interval_end_time, x: metricData.metricName.max }]}
//                 name="max"
//               /> */}
//             </>
//           ))}
//         </ChartGroup>
//       </Chart>
//     </div>
//   ))}
// </div>
// );
// };
export {LineChart};