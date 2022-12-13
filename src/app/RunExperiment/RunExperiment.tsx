import React, { useState, useContext, useEffect } from 'react';
import { Wizard, Grid, GridItem } from '@patternfly/react-core';
import RE from './RE';
import { ExperimentStatus } from '@app/ExperimentStatus/ExperimentStatus';
import { ExperimentDetails } from '@app/ExperimentStatus/MoreExperimentStuff/ExperimentDetails';
import { CodeEditorWithActions } from '@app/GenerateYaml/CodeEditorWithActions';
import nodeContext from '@app/Context_store/nodeContext';
import NodeState from '@app/Context_store/NodeState';
import { Final_equation } from 'src/app/ExperimentStatus/MoreExperimentStuff/Final_equation';
import { Throughput_details } from 'src/app/ExperimentStatus/MoreExperimentStuff/Throughput_details';
import { Response_time_details } from 'src/app/ExperimentStatus/MoreExperimentStuff/Response_time_details';
import { Resource_usage_details } from 'src/app/ExperimentStatus/MoreExperimentStuff/Resource_usage_details';
const dataa = {
  exp_name: '',
  namespace: '',
  deployment: '',

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
  net_eq: '0.25 * throughput / 0.5 * responsetime * 0.25 * resourceusage',
  allDone: ''
};

const RunExperiment = (props: { setData; data }) => {
  const [data, setData] = useState(dataa);
  const Context = useContext(nodeContext);
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
      name: 'Experiment Details',
      // component: <ExperimentDetails/>,
      enableNext: data.allDone,
      canJumpTo: stepId >= 2,
      steps: [
        {
          id: 3,
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
          canJumpTo: stepId >= 2
        },
        {
          id: 4,
          name: 'Response Time',
          component: (
            <>
              <ExperimentDetails /> <Response_time_details data={data} setData={setData} />
            </>
          ),
          canJumpTo: stepId >= 2
        },
        {
          id: 5,
          name: 'Resource Usage',
          component: (
            <>
              <ExperimentDetails /> <Resource_usage_details data={data} setData={setData} />
            </>
          ),
          canJumpTo: stepId >= 2
        },
        {
          id: 6,
          name: 'Final Equation',
          component: <Final_equation data={data} setData={setData} />,
          hideClose: true,
          canJumpTo: stepId >= 2
        }
      ]
    },
    {
      id: 7,
      name: 'YAML Generated',
      component: <CodeEditorWithActions setData={setData} data={data} />,
      nextButtonText: 'Finish',
      canJumpTo: stepId >= 3
    }
  ];
  const title = 'Basic wizard';

  return (
    <>
      <NodeState>
        <Wizard
          navAriaLabel={`${title} steps`}
          mainAriaLabel={`${title} content`}
          onNext={enable_progress}
          steps={steps}
          isNavExpandable
        />
      </NodeState>
      {console.log('step id log' + stepId)}
    </>
  );
};

export { RunExperiment };
