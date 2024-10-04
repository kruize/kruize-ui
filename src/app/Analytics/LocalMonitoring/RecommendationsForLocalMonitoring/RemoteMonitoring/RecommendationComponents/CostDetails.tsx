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
import { CostHistoricCharts } from './LinePlot/CostHistoricCharts';
import { addPlusSign } from './LinePlot/ChartDataPreparation';
import { CostBoxPlotCharts } from './BoxPlots/CostBoxPlotCharts';
import { alertIconMap } from '../RecommendationTables';

type AlertType = 'info' | 'danger' | 'warning';

interface Alert {
  message: string;
  type: AlertType;
  icon: React.ReactNode;
}
 
const convertBytes = (value) => {
  let unit = 'Bytes';
  let sign = value[0]
  let absValue = Math.abs(value);
  let valueFinal = absValue;
 
  if (absValue >= 1024 ** 3) {
    valueFinal = absValue / 1024 ** 3;
    unit = 'Gi';
  } else if (absValue >= 1024 ** 2) {
    valueFinal = absValue / 1024 ** 2;
    unit = 'Mi';
  } else if (absValue >= 1024) {
    valueFinal = absValue / 1024;
    unit = 'Ki';
  }

  valueFinal = value < 0 ? -valueFinal : valueFinal;

  // console.log(value, "converted value:", valueFinal, " sign", sign);
  return {
    valueFinal: parseFloat(valueFinal.toFixed(2)).toString(),
    unit
  };
};

export const MemoryFormat = (number) => {
  let parsedNo = parseFloat(number);
  if (!parsedNo) return '';

  const { valueFinal, unit } = convertBytes(parsedNo);
  return `${valueFinal} ${unit}`;
};

export const MemoryFormatP = (number) => {
  let parsedNo = parseFloat(number);
  if (!parsedNo) return '';

  const { valueFinal, unit } = convertBytes(parsedNo);
  const formattedValue =valueFinal
  // console.log(formattedValue);
  return `${formattedValue} ${unit}`; 
};

export const NumberFormatP = (number) => {
  let parsedNo = parseFloat(number);
  if (!isNaN(parsedNo) && isFinite(parsedNo)) {
    if (Math.floor(parsedNo) !== parsedNo) {
      return addPlusSign(parseFloat(parsedNo.toFixed(3)).toString())
    }
    return addPlusSign(parsedNo.toString());
  }
  return '';
};
export const NumberFormat = (number) => {
  let parsedNo = parseFloat(number);
  if (!isNaN(parsedNo) && isFinite(parsedNo)) {
    if (Math.floor(parsedNo) !== parsedNo) {
      return parseFloat(parsedNo.toFixed(3)).toString()
    }
    return parsedNo.toString();
  }
  return '';
};

export const useMemoryUnit = (recommendedData, profile) => {
  const [mmrUnit, setMmrUnit] = useState('');
  const [unitVal, setUnitVal] = useState(0); 

  useEffect(() => {
    if (recommendedData?.length > 0) {
      const mmr_recc_unit = convertBytes(recommendedData[0]?.recommendation_engines?.[profile]?.config?.requests?.memory?.amount);
      setMmrUnit(mmr_recc_unit.unit);

      // Set unitVal based on the mmr_recc_unit.unit
      if (mmr_recc_unit.unit === 'Mi') {
        setUnitVal(2);
      } else if (mmr_recc_unit.unit === 'Gi') {
        setUnitVal(3);
      } else if (mmr_recc_unit.unit === 'Ki') {
        setUnitVal(1);
      } else {
        setUnitVal(0); // Default case if needed
      }
    }
  }, [recommendedData]);

  return { mmrUnit, unitVal };
};


const CostDetails = (props: { recommendedData; currentData; chartData; day; endtime; displayChart; boxPlotData }) => {
  const limits = props.recommendedData[0]?.recommendation_engines?.cost?.config?.limits;
  const config_keys = limits ? Object.keys(limits) : [];
  const [showCostBoxPlot, setShowCostBoxPlot] = useState(true);
  const { mmrUnit, unitVal } = useMemoryUnit(props.recommendedData, 'cost');

  let gpu_val;
  let nvidiaKey = config_keys.find((key) => key.toLowerCase().includes('nvidia'));

  if (nvidiaKey) {
    gpu_val = limits[nvidiaKey]?.amount;
  } else {
    console.log("No 'nvidia' key found.");
  }

  const current_code = `resources: 
  requests: 
    memory: "${MemoryFormat(props.currentData[0]?.requests?.memory?.amount)}" 
    cpu: "${NumberFormat(props.currentData[0]?.requests?.cpu?.amount)}" 
  limits: 
    memory: "${MemoryFormat(props.currentData[0]?.limits?.memory?.amount)}" 
    cpu: "${NumberFormat(props.currentData[0]?.limits?.cpu?.amount)}"`;

  const recommended_code = `resources: 
  requests: 
    memory: "${MemoryFormat(
      props.recommendedData[0]?.recommendation_engines?.cost?.config?.requests?.memory?.amount
    )}"    # ${MemoryFormatP(
      props.recommendedData[0]?.recommendation_engines?.cost?.variation?.requests?.memory?.amount
    )}
    cpu: "${NumberFormat(
      props.recommendedData[0]?.recommendation_engines?.cost?.config?.requests?.cpu?.amount
    )}"           # ${NumberFormatP(
      props.recommendedData[0]?.recommendation_engines?.cost?.variation?.requests?.cpu?.amount
    )}
  limits: 
    memory: "${MemoryFormat(
      props.recommendedData[0]?.recommendation_engines?.cost?.config?.limits?.memory?.amount
    )}"    # ${MemoryFormatP(
      props.recommendedData[0]?.recommendation_engines?.cost?.variation?.limits?.memory.amount
    )}  
    cpu: "${NumberFormat(
      props.recommendedData[0]?.recommendation_engines?.cost?.config?.limits?.cpu?.amount
    )}"           # ${NumberFormatP(
      props.recommendedData[0]?.recommendation_engines?.cost?.variation?.limits?.cpu?.amount
    )}`;

  // Notifications
  useEffect(() => {
    if (props.recommendedData !== null) {
      NotificationsAtCostLevel(props.recommendedData);
    }
  }, [props.recommendedData, props.day, props.endtime]);

  const [alerts, setAlerts] = useState<Alert[]>([]);

  const NotificationsAtCostLevel = (recommendation) => {
    const notifications = recommendation[0]?.recommendation_engines?.cost?.notifications;
    if (notifications?.hasOwnProperty(323001)) {
      setShowCostBoxPlot(false);
    }
    try {
      if (!notifications) {
        console.warn('No notifications found.');
        return;
      }
      const newAlerts: Alert[] = [];

      Object.keys(notifications).forEach((key) => {
        const message = `${notifications[key].message}`;
        let type: AlertType = 'info';

        if (notifications.type == 'notice' || notifications.type == 'info') {
          type = 'info';
        } else if (notifications.type == 'error' || notifications.type == 'critical') {
          type = 'danger';
        } else if (notifications.type == 'warning') {
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
    <PageSection variant={PageSectionVariants.light}>
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
                <ReusableCodeBlock code={`${recommended_code}\n    ${nvidiaKey}: "${gpu_val}"`} includeActions={true} />
              ) : (
                <ReusableCodeBlock code={recommended_code} includeActions={true} />
              )}
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
      {props.boxPlotData && props.recommendedData[0]?.recommendation_engines?.cost?.config ? (
        <CostBoxPlotCharts
        unitValueforMemory={unitVal}
          boxPlotData={props.boxPlotData}
          showCostBoxPlot={showCostBoxPlot}
          day={props.day}
          limitRequestData={props.recommendedData[0]?.recommendation_engines?.cost?.config}
        />
      ) : (
        <div> No data to plot box</div>
      )}
      {props.displayChart && <CostHistoricCharts chartData={props.chartData} day={props.day} endtime={props.endtime} />}
    </PageSection>
  );
};

export { CostDetails, convertBytes };
