import * as React from 'react';
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
  TextVariants,
  Tabs,
  Tab,
  TabTitleText
} from '@patternfly/react-core';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RecommendationTables } from './RecommendationTables';
import { ExperimentSelection } from './ExperimentSelection';

const SREdataa = {
  experiment_name: '',
  container_name: '',
  cluster_name: '',
  namespace: '',
  name: '',
  type: '',
  containerArray: [],
  experiment_type: ''
};

const Monitoring = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const experimentNameFromUrl = queryParams.get('experiment_name');
  
  const [SREdata, setSREdata] = useState(SREdataa);
  const [endTimeArray, setEndTimeArray] = useState<any | null>(null);
  const [displyRecc, setDisplayRecc] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<any | null>({
    level1: {},
    level2: { info: {}, others: {} },
    level3: {}
  });

  return (
    <>
    <PageSection variant={PageSectionVariants.light}>
      <TextContent>
        <Text component={TextVariants.h1}>Monitoring</Text>
      </TextContent>
      <br />
      <ExperimentSelection
        setEndTimeArray={setEndTimeArray}
        endTimeArray={endTimeArray}
        setSREdata={setSREdata}
        SREdata={SREdata}
        setDisplayRecc={setDisplayRecc}
        notification={notifications}
        setNotification={setNotifications}
        initialExperimentName={experimentNameFromUrl}
      />
      </PageSection>
      <>
      {displyRecc && (
        <RecommendationTables
          setEndTimeArray={setEndTimeArray}
          endTimeArray={endTimeArray}
          setSREdata={setSREdata}
          SREdata={SREdata}
          notification={notifications}
          setNotification={setNotifications}
        />
      )}
    </>
    </>
  );
};

export { Monitoring };
