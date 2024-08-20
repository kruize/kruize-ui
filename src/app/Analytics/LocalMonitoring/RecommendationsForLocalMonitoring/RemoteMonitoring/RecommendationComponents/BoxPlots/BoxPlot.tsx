import React from 'react';
import {
  Chart,
  ChartAxis,
  ChartBoxPlot,
  ChartCursorFlyout,
  ChartCursorTooltip,
  ChartLine,
  ChartThreshold,
  createContainer
} from '@patternfly/react-charts';
import chart_color_orange_300 from '@patternfly/react-tokens/dist/esm/chart_color_orange_300';
import chart_color_blue_300 from '@patternfly/react-tokens/dist/esm/chart_color_blue_300';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
const formatNumber = (number, decimals = 2) => {
  if (isNaN(number)) {
    return ''; // Return an empty string or some default value if the value is not a number
  }
  return number.toFixed(decimals);
};


interface BoxPlotProps {
  data: Array<{
    name: string;
    x: string;
    y: number[];
  }>;
  limitsThresholdChartData:  Array<{
    name: string;
    x: string;
    y: number[];
  }>;
  requestThresholdChartData:  Array<{
    name: string;
    x: string;
    y: string;
  }>;
  chartTitle: string;
  ariaDesc: string;
  domain: { y: [number, number] };
  themeColor: string; 
  legendData: Array<{ name: string }>;
}

const BoxPlot: React.FC<BoxPlotProps> = ({ data, limitsThresholdChartData, requestThresholdChartData, chartTitle, ariaDesc, domain, themeColor, legendData }) => {

  const CursorVoronoiContainer = createContainer('voronoi', 'cursor');
  const HtmlLegendContent = ({ datum, text, title, x, y}) => (
    <g>
       <foreignObject height="50%" width="100%" x={x+20} y={y-60}>
        {/* <div style={{ fontSize: '12px',  maxHeight: '150px', overflowY: 'auto' }}> */}
        <table style={{  whiteSpace: 'nowrap'  ,color: '#f0f0f0',}}>

          <thead>
            <tr>
               <th colSpan={2} style={{ color: '#f0f0f0', fontWeight: 700}}>
                {title(datum)}
              </th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <td>Max</td>
              <td>{formatNumber(datum._max)}</td>
            </tr>
            <tr>
              <td>Median</td>
              <td>{formatNumber(datum._median)}</td>
            </tr>
            <tr>
              <td>Min</td>
              <td>{formatNumber(datum._min)}</td>
            </tr>
            <tr>
              <td>Q1</td>
              <td>{formatNumber(datum._q1)}</td>
            </tr>
            <tr>
              <td>Q3</td>
              <td>{formatNumber(datum._q3)}</td>
            </tr>
          </tbody>
        </table>
    </foreignObject>
  </g>
  );



  return (
    <div style={{ height: '300px', width: '800px' }}>
      <Chart
        ariaDesc={ariaDesc}
        ariaTitle={chartTitle}
        containerComponent={
          <CursorVoronoiContainer
            cursorDimension="x"
            labels={({ datum }) => `${formatDate(datum.x)}: ${formatNumber(datum.y)}`}
            labelComponent={
              <ChartCursorTooltip
              flyoutHeight={130}
              flyoutWidth={170}
              constrainToVisibleArea
                labelComponent={<HtmlLegendContent title={(datum) => formatDate(datum.x)} datum={undefined} text={undefined} x={undefined} y={undefined} />}
              />
            }
            mouseFollowTooltips
            voronoiDimension="x"
            // voronoiPadding={50}
            flyoutStyle={{ pointerEvents: 'none',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '150px',
            padding: 1}}
          />
        }
        domain={domain}
        domainPadding={{ x: [30, 25] }}
        legendData={legendData}
        legendOrientation="vertical"
        legendPosition="right"
        height={300}
        name="chart4"
        padding={{
          bottom: 75, 
          left: 50,
          right: 50,
          top: 50
        }}
        maxDomain={{ y: 9 }}
        themeColor={themeColor}
        width={600}
      >
        <ChartAxis tickFormat={(tick) => formatDate(tick)} 
           style={{
            tickLabels: {
              angle: -45,
              transform: 'translate(-20, 10)',
              textAnchor: 'end',
              fontSize: 12,
              margin: '50px 0',
              paddingTop: '10px'
            } // Add margin to adjust distance
          }}/>
        <ChartAxis 
         style={{
          axisLabel: { padding: 60 } // Adjust the value to control the padding
        }}
        dependentAxis tickFormat={(tick) => formatNumber(tick)} 
        showGrid />
        <ChartBoxPlot data={data} />
        <ChartThreshold
            data={limitsThresholdChartData}
            name="limit"
            style={{
              data: {
                stroke: chart_color_orange_300.var
              }
            }}
          />
          <ChartThreshold
            data={requestThresholdChartData}
            name="request"
            style={{
              data: {
                stroke: chart_color_blue_300.var
              }
            }}
          />
      </Chart>
    </div>
  );
};

export default BoxPlot;

