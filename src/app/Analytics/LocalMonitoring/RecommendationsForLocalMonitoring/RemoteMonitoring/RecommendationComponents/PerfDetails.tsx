import React, { useEffect, useState } from 'react';
import {
  Card,
  CardTitle,
  CardBody,
  PageSection,
  Grid,
  GridItem,
  Text,
  TextVariants,
  PageSectionVariants,
  AlertGroup
} from '@patternfly/react-core';
import ReusableCodeBlock from './ReusableCodeBlock';
import { PerfHistoricCharts } from './LinePlot/PerfHistoricCharts';
import { PerfBoxPlotCharts } from './BoxPlots/PerfBoxPlotCharts';
import { NumberFormatP, MemoryFormatP , MemoryFormat, NumberFormat, useMemoryUnit} from './CostDetails';
import { alertIconMap } from '../RecommendationTables';
type AlertType = 'info' | 'danger' | 'warning';

interface Alert {
  message: string;
  type: AlertType;
  icon: React.ReactNode;
}

const PerfDetails = (props: {
  recommendedData;
  currentData;
  chartData;
  day;
  endtime;
  displayChart;
  tab;
  boxPlotData;
}) => {
  const limits = props.recommendedData[0]?.recommendation_engines?.performance?.config?.limits;
  const config_keys = limits ? Object.keys(limits) : [];
  const [showPerfBoxPlot, setShowPerfBoxPlot] = useState(true);
  const { mmrUnit, unitVal } = useMemoryUnit(props.recommendedData, 'performance');

  let gpu_val;
  let nvidiaKey = config_keys.find((key) => key.toLowerCase().includes('nvidia'));

  if (nvidiaKey) {
    gpu_val = limits[nvidiaKey]?.amount;
  } else {
    console.log("No 'nvidia' key found.");
  }

  const current_code = `resources: 
  requests:  
    cpu: ${NumberFormat(props.currentData[0]?.requests?.cpu?.amount)}
    memory: ${MemoryFormat(props.currentData[0]?.requests?.memory?.amount)} 
  limits:  
    cpu: ${NumberFormat(props.currentData[0]?.limits?.cpu?.amount)}
    memory: ${MemoryFormat(props.currentData[0]?.limits?.memory?.amount)}`;

  const recommended_code = `resources: 
  requests: 
    cpu: ${NumberFormat(
      props.recommendedData[0]?.recommendation_engines?.performance?.config?.requests?.cpu?.amount
    )}          # ${NumberFormatP(
      props.recommendedData[0]?.recommendation_engines?.performance?.variation?.requests?.cpu?.amount
    )}
    memory: ${MemoryFormat(
      props.recommendedData[0]?.recommendation_engines?.performance?.config?.requests?.memory?.amount
    )}      # ${MemoryFormatP(
      props.recommendedData[0]?.recommendation_engines?.performance?.variation?.requests?.memory?.amount , unitVal, mmrUnit
    )}
  limits:    
    cpu: ${NumberFormat(
      props.recommendedData[0]?.recommendation_engines?.performance?.config?.limits?.cpu?.amount
    )}          # ${NumberFormatP(
      props.recommendedData[0]?.recommendation_engines?.performance?.variation?.limits?.cpu?.amount
    )}
    memory: ${MemoryFormat(
      props.recommendedData[0]?.recommendation_engines?.performance?.config?.limits?.memory?.amount
    )}      # ${MemoryFormatP(
      props.recommendedData[0]?.recommendation_engines?.performance?.variation?.limits?.memory?.amount, unitVal, mmrUnit
    )}`;

  // Code for Alert / Notifications

  useEffect(() => {
    if (props.recommendedData !== null) {
      NotificationsAtPerfLevel(props.recommendedData);
    }
  }, [props.tab, props.day, props.endtime, props.recommendedData]);

  const [alerts, setAlerts] = useState<Alert[]>([]);

  const NotificationsAtPerfLevel = (recommendation) => {
    const notifications = recommendation[0]?.recommendation_engines?.performance?.notifications;
    if (notifications?.hasOwnProperty(323001)) {
      setShowPerfBoxPlot(false);
    }
    console.log('perfn', notifications);
    try {
      if (!notifications) {
        console.warn('No notifications found.');
        return;
      }
      const newAlerts: Alert[] = [];
      Object.values(notifications).forEach((notification: any, index) => {
        const message = `${notification.message}`;
        let type: AlertType = 'info';

        if (notification.type == 'notice' || notification.type == 'info') {
          type = 'info';
        } else if (notification.type == 'error' || notification.type == 'critical') {
          type = 'danger';
        } else if (notification.type == 'warning') {
          type = 'warning';
        }

        const Icon = alertIconMap[type];
        newAlerts.push({ message, type, icon: Icon });
      });

      setAlerts(newAlerts);
    } catch (error) {
      console.error('Error during data import:', error);
      setAlerts([]);
    }
  };

  const renderNotifications = (notifications: any) => (
    <AlertGroup>
      {Object.keys(notifications || {}).map((key) => {
        const notification = notifications[key];
        const alertType = notification.type || 'info';
        const Icon = alertIconMap[alertType];

        return (
          <div key={notification.code} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            {Icon}
            <span style={{ marginLeft: '8px', color: 'black', fontWeight: 'normal' }}>{notification.message}</span>
          </div>
        );
      })}
    </AlertGroup>
  );

  return (
    <>
      <Grid hasGutter>
        {renderNotifications(alerts)}
        <GridItem span={6} rowSpan={8}>
          <Card ouiaId="BasicCard" isFullHeight>
            <CardTitle>Current State</CardTitle>
            <CardBody>
              <Text component={TextVariants.h5}>Current Configuration</Text>
              <ReusableCodeBlock code={current_code} includeActions={false} />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem span={6} rowSpan={8}>
          <Card ouiaId="BasicCard">
            <CardTitle>Recommendation</CardTitle>
            <CardBody>
              <Text component={TextVariants.h5}>Recommended Configuration + #Delta</Text>
              {config_keys && config_keys.length === 3 ? (
                <ReusableCodeBlock code={`${recommended_code}\n    ${nvidiaKey}: ${gpu_val}`} includeActions={true} />
              ) : (
                <ReusableCodeBlock code={recommended_code} includeActions={true} />
              )}
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
      <br></br>
      <PerfBoxPlotCharts
        unitValueforMemory={unitVal}
        boxPlotData={props.boxPlotData}
        showPerfBoxPlot={showPerfBoxPlot}
        day={props.day}
        limitRequestData={props.recommendedData[0]?.recommendation_engines?.performance?.config}
      />
      <br></br>
      {props.displayChart && <PerfHistoricCharts chartData={props.chartData} day={props.day} endtime={props.endtime} />}{' '}
      </>
  );
};

export { PerfDetails };
