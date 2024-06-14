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
  Alert
} from '@patternfly/react-core';
import ReusableCodeBlock from './ReusableCodeBlock';
import { CostHistoricCharts } from './CostHistoricCharts';
import { addPlusSign } from './ChatDataPreparation';
import { parse } from 'postcss';

const CostDetails = (props: { recommendedData; currentData; chartData; day; endtime; displayChart }) => {
  // console.log(props.recommendedData[0].recommendation_engines);

  const convertBytes = (bytes) => {
    let value: any = parseFloat(bytes);
    let unit = 'Bytes';

    if (value >= 1024 ** 3) {
      value = Math.round(value / 1024 ** 3);
      unit = 'Gi';
    } else if (value >= 1024 ** 2) {
      value = Math.round(value / 1024 ** 2);
      unit = 'Mi';
    } else if (value >= 1024) {
      value = Math.round(value / 1024);
      unit = 'Ki';
    }

    return `${value} ${unit}`;
  };

  const MemoryFormat = (number) => {
    console.log(typeof(number))
    let parsedNo = parseFloat(number)
    if (!parsedNo) return '';
    return convertBytes(parsedNo);
  };

  const NumberFormat = (number) => {
    let parsedNo = parseFloat(number)
    console.log(parsedNo)
    if (!isNaN(parsedNo) && isFinite(parsedNo)) {
      if (Math.floor(parsedNo) !== parsedNo) {
        return parsedNo.toFixed(3);
      }
      return parsedNo.toString();
    }
    return '';
  };

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
    )}"    # ${addPlusSign(
      MemoryFormat(props.recommendedData[0]?.recommendation_engines?.cost?.variation?.requests?.memory?.amount)
    )}
    cpu: "${NumberFormat(
      props.recommendedData[0]?.recommendation_engines?.cost?.config?.requests?.cpu?.amount
    )}"            # ${addPlusSign(
      NumberFormat(props.recommendedData[0]?.recommendation_engines?.cost?.variation?.requests?.cpu?.amount)
    )}
  limits: 
    memory: "${MemoryFormat(
      props.recommendedData[0]?.recommendation_engines?.cost?.config?.limits?.memory?.amount
    )}"    # ${addPlusSign(
      MemoryFormat(props.recommendedData[0]?.recommendation_engines?.cost?.variation?.limits?.memory.amount)
    )}  
    cpu: "${NumberFormat(
      props.recommendedData[0]?.recommendation_engines?.cost?.config?.limits?.cpu?.amount
    )}"            # ${addPlusSign(
      NumberFormat(props.recommendedData[0]?.recommendation_engines?.cost?.variation?.limits?.cpu?.amount)
    )}`;

  /// Alert for over and under utlized
  useEffect(() => {
    if (props.recommendedData !== null) {
      utilizationAlert(props.recommendedData);
    }
  }, [props.recommendedData]);

  type alertVariant =  'success' | 'danger' | 'warning' | 'info' | 'custom';
 
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [notificationType, setNotificationType] = useState<alertVariant>('info');

  const utilizationAlert = (recommendation) => {
    const notifications = recommendation[0]?.recommendation_engines?.cost?.notifications;
    try {
      Object.values(notifications).forEach((notification : any, index) => {
        setTimeout(() => {
          setAlertMessage(`${notification.code} - ${notification.message}`);
          if(notification.type == "notice") {
            setNotificationType('info'); 
          }
          else if (notification.type == "error"){
            setNotificationType('danger');
          }
          setShowSuccessAlert(true);
          setTimeout(() => {
            setShowSuccessAlert(false);
          }, 2000);
        }, index * 2500);
      });
    } catch (error) {
      console.error('Error during data import:', error);
      setShowSuccessAlert(false);
    }
  };

  return (
    <PageSection variant={PageSectionVariants.light}>
      <Grid hasGutter>
        {showSuccessAlert && <Alert variant={notificationType} title={alertMessage} ouiaId="InfoAlert" />}
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
              <ReusableCodeBlock code={recommended_code} includeActions={true} />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
      {props.displayChart && <CostHistoricCharts chartData={props.chartData} day={props.day} endtime={props.endtime} />}
    </PageSection>
  );
};

export { CostDetails };
