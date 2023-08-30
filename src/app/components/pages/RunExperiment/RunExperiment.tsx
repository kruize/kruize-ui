import React, { useState, useContext, useEffect } from 'react';
import { Wizard, Grid, GridItem } from '@patternfly/react-core';
import RE from './RE';
import { ExperimentStatus } from '../ExperimentStatus/ExperimentStatus';
import nodeContext from '@app/components/Common/ContextStore/nodeContext';
import { DefineGoals } from './DefineGoals';
import { PerformanceProfiles } from './PerformanceProfilePages/PerformanceProfiles';
import { Throughput_details } from '../ExperimentStatus/MoreExperimentStuff/Throughput_details';
import { ExperimentDetails } from '../ExperimentStatus/MoreExperimentStuff/ExperimentDetails';
import { Response_time_details } from '../ExperimentStatus/MoreExperimentStuff/Response_time_details';
import { Resource_usage_details } from '../ExperimentStatus/MoreExperimentStuff/Resource_usage_details';
import { Final_equation } from '../ExperimentStatus/MoreExperimentStuff/Final_equation';
import { CodeEditorWithActions } from '../GenerateYaml/CodeEditorWithActions';
import { FinishedStep } from '../FinishedStep/FinishedStep';
import EnvState from '@app/components/common/ContextStore/EnvState';
const dataa = {
  exp_name: '',
  namespace: '',
  deployment: '',
  profile: '',

  THweightage: 25,
  THoperator: '1',
  THquery: 'application_org_acme_microprofile_metrics_PrimeNumberChecker_checksTimer_mean_seconds',
  THdatasource: 'prometheus',
  THvaluetype: 'double',
  THdirection: 'max',
  THequation: '0.25 * throughput',

  RTweightage: 50,
  RToperator: '1',
  RTquery: 'application_org_acme_microprofile_metrics_PrimeNumberChecker_checksTimer_mean_seconds',
  RTdatasource: 'prometheus',
  RTvaluetype: 'double',
  RTdirection: 'min',
  RTequation: '0.5 * responsetime',

  RUweightage: 25,
  RUoperator: '1',
  RUquery: 'application_org_acme_microprofile_metrics_PrimeNumberChecker_checksTimer_mean_seconds',
  RUdatasource: 'prometheus',
  RUvaluetype: 'double',
  RUdirection: 'min',
  RUequation: '0.25 * resourceusage',
  net_eq: ' : (0.25 * Throughput) / ( (0.5 * Response Time) * ( 0.25 * Resource Usage) )',
  allDone: ''
};

const RunExperiment = (props: { setData; data }) => {
  const [data, setData] = useState(dataa);
  const [stepId, setStepId] = useState(1);
  const enable_progress = () => {
    if (data.deployment || data.allDone) {
      setStepId(stepId + 1);
    }
  };

  const steps = [
    {
      id: 1,
      name: 'New Experiment',
      component: <RE setData={setData} data={data} />,
      enableNext: data.deployment != '' && data.namespace && data.exp_name
    },
    //{ name: 'Experiment Status', component: <ExperimentStatus /> },
    {
      id: 2,
      name: 'Define Performance Goals',
      component: <DefineGoals setData={setData} data={data} />,
      enableNext: data.profile,
      canJumpTo: stepId >= 2
    },
    {
      id: 3,
      name: data.profile === 'custom' ? 'Experiment Details' : 'Performance Profiles',
      component:
        data.profile === 'custom' ? <ExperimentDetails /> : <PerformanceProfiles data={data} setData={setData} />,
      // enableNext: data.allDone,
      canJumpTo: stepId >= 3,
      steps:
        data.profile === 'custom'
          ? [
              {
                id: 4,
                name: 'Throughput',
                component: (
                  <Grid hasGutter>
                    <GridItem span={7}>
                      <Throughput_details data={data} setData={setData} />
                    </GridItem>
                    <GridItem span={5}>
                      <ExperimentDetails />
                    </GridItem>
                  </Grid>
                ),
                canJumpTo: stepId >= 3
              },
              {
                id: 5,
                name: 'Response Time',
                component: (
                  <Grid hasGutter>
                    <GridItem span={7}>
                      <Response_time_details data={data} setData={setData} />
                    </GridItem>
                    <GridItem span={5}>
                      <ExperimentDetails />
                    </GridItem>
                  </Grid>
                ),
                canJumpTo: stepId >= 3
              },
              {
                id: 6,
                name: 'Resource Usage',
                component: (
                  <Grid hasGutter>
                    <GridItem span={7}>
                      <Resource_usage_details data={data} setData={setData} />
                    </GridItem>
                    <GridItem span={5}>
                      <ExperimentDetails />
                    </GridItem>
                  </Grid>
                ),
                canJumpTo: stepId >= 3
              },
              {
                id: 7,
                name: 'Final Equation',
                component: <Final_equation data={data} setData={setData} />,
                hideClose: true,
                canJumpTo: stepId >= 3
              }
            ]
          : null
    },
    {
      id: 8,
      name: 'YAML Generated',
      component: <CodeEditorWithActions setData={setData} data={data} />,
      nextButtonText: 'Apply',
      canJumpTo: stepId >= 4
    },
    { name: 'Finish', component: <FinishedStep />, isFinishedStep: true }
  ];
  const title = 'Basic wizard';

  return (
    <>
      <EnvState>
        <Wizard
          navAriaLabel={`${title} steps`}
          mainAriaLabel={`${title} content`}
          onNext={enable_progress}
          steps={steps}
          isNavExpandable
        />
      </EnvState>
    </>
  );
};

export { RunExperiment };
