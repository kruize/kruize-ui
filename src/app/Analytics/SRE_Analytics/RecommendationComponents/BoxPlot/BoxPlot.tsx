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

interface BoxPlotProps {
  data: Array<{
    name: string;
    x: string;
    y: number[];
  }>;
  requestLimitsData:  Array<{
    name: string;
    x: string;
    y: number[];
  }>;
  chartTitle: string;
  ariaDesc: string;
  domain: { y: [number, number] };
  themeColor: string; 
  legendData: Array<{ name: string }>;
}

const BoxPlot: React.FC<BoxPlotProps> = ({ data, requestLimitsData, chartTitle, ariaDesc, domain, themeColor, legendData }) => {
  const baseStyles = {
    color: '#f0f0f0',
    fontFamily: 'RedHatText, Overpass, overpass, helvetica, arial, sans-serif',
    fontSize: '14px'
  };

  const leftColumn = { paddingLeft: '10px', width: '50%' };
  const rightColumn = { paddingRight: '20px', textAlign: 'right', width: '50%' };
  const CursorVoronoiContainer = createContainer('voronoi', 'cursor');

  const HtmlLegendContent = ({ datum, text, title, x, y, ...rest }) => (
    <g>
      <foreignObject height="100%" width="100%" x={x+60} y={y-50}>
        <table>
          <thead>
            <tr>
              <th colSpan={2} style={{ ...baseStyles, ...leftColumn, fontWeight: 700 }}>
                {title(datum)}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={baseStyles}>
              <td style={leftColumn}>Max</td>
              <td style={rightColumn}>{datum._max}</td>
            </tr>
            <tr style={baseStyles}>
              <td style={leftColumn}>Median</td>
              <td style={rightColumn}>{datum._median}</td>
            </tr>
            <tr style={baseStyles}>
              <td style={leftColumn}>Min</td>
              <td style={rightColumn}>{datum._min}</td>
            </tr>
            <tr style={baseStyles}>
              <td style={leftColumn}>Q1</td>
              <td style={rightColumn}>{datum._q1}</td>
            </tr>
            <tr style={baseStyles}>
              <td style={leftColumn}>Q3</td>
              <td style={rightColumn}>{datum._q3}</td>
            </tr>
          </tbody>
        </table>
      </foreignObject>
    </g>
  );

  return (
    <div style={{ height: '300px', width: '600px' }}>
      <Chart
        ariaDesc={ariaDesc}
        ariaTitle={chartTitle}
        containerComponent={
          <CursorVoronoiContainer
            cursorDimension="x"
            labels={({ datum }) => `${datum.y}`}
            labelComponent={
              <ChartCursorTooltip
                flyout={<ChartCursorFlyout />}
                flyoutHeight={145}
                flyoutWidth={210}
                labelComponent={<HtmlLegendContent title={(datum) => datum.x} datum={undefined} text={undefined} x={undefined} y={undefined} />}
              />
            }
            mouseFollowTooltips
            voronoiDimension="x"
            voronoiPadding={50}
          />
        }
        domain={domain}
        domainPadding={{ x: [30, 25] }}
        legendData={legendData}
        legendPosition="bottom"
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
        <ChartAxis />
        <ChartAxis dependentAxis showGrid />
        <ChartBoxPlot data={data} />
        {/* <ChartLine
       data={requestLimitsData}
        name="limit"
        style={{
          data: {
            stroke: chart_color_orange_300.var
          }
        }}
      /> */}
      </Chart>
    </div>
  );
};

export default BoxPlot;
