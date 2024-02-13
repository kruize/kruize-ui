import React from 'react';
import { Chart, ChartAxis, ChartBoxPlot, ChartCursorFlyout, ChartCursorTooltip, ChartThemeColor, createContainer } from '@patternfly/react-charts';

const BoxPlot = () => {
  const baseStyles = {
    color: '#f0f0f0',
    fontFamily: 'RedHatText, Overpass, overpass, helvetica, arial, sans-serif',
    fontSize: '14px'
 };

 const leftColumn = {
    paddingLeft: '10px',
    width: '50%'
 };

 const rightColumn = {
    paddingRight: '20px',
    textAlign: 'right',
    width: '50%'
 };
 const CursorVoronoiContainer = createContainer("voronoi", "cursor");
  const legendData = [{ name: 'Cats' }];

    const HtmlLegendContent = ({datum, text, title, x, y, ...rest}) => (
      <g>
        <foreignObject height="100%" width="100%" x={x - 30} y={y - 62} >
          <table>
            <thead>
              <tr>
                <th colSpan={2} style={{...baseStyles, ...leftColumn, fontWeight: 700}}>{title(datum)}</th>
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
          ariaDesc="Average number of pets - possibly more information to summarize the data in the chart."
          ariaTitle="Embedded html example chart title"
          containerComponent={
            <CursorVoronoiContainer
              cursorDimension="x"
              labels={({ datum }) => `${datum.y}`}
              labelComponent={
                <ChartCursorTooltip
                  centerOffset={{x: ({ center, flyoutWidth, width, offset = flyoutWidth / 2 + 10 }) => width > center.x + flyoutWidth + 10 ? offset : -offset}}
                  flyout={<ChartCursorFlyout />}
                  flyoutHeight={145}
                  flyoutWidth={110}
                  labelComponent={<HtmlLegendContent title={(datum) => datum.x} />}
                />
              }
              mouseFollowTooltips
              voronoiDimension="x"
              voronoiPadding={50}
            />
          }
          domain={{y: [0, 12]}}
          domainPadding={{ x: [30, 25] }}
          legendData={legendData}
          legendPosition="bottom"
          height={300}
          name="chart4"
          padding={{
            bottom: 75, // Adjusted to accommodate legend
            left: 50,
            right: 50,
            top: 50,
          }}
          maxDomain={{y: 9}}
          themeColor={ChartThemeColor.orange}
          width={600}
        >
          <ChartAxis />
          <ChartAxis dependentAxis showGrid />
          <ChartBoxPlot 
            data={[
              { name: 'Cats', x: '2015', y: [1, 2, 3, 5] },
              { name: 'Cats', x: '2016', y: [3, 2, 8, 10] },
              { name: 'Cats', x: '2017', y: [2, 8, 6, 5] },
              { name: 'Cats', x: '2018', y: [1, 3, 2, 9] }
            ]}
          />
        </Chart>
      </div>
    );
  };
export default BoxPlot;
