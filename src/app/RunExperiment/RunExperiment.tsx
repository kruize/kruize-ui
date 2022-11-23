import React, { useState, useContext, useEffect } from "react";
import {
  Wizard,
} from "@patternfly/react-core";
import RE from "./RE";
import { ExperimentStatus } from "@app/ExperimentStatus/ExperimentStatus";
import { ExperimentDetails } from "@app/ExperimentStatus/MoreExperimentStuff/ExperimentDetails";
import { CodeEditorWithActions } from "@app/GenerateYaml/CodeEditorWithActions";
import nodeContext from "@app/Context_store/nodeContext";
import NodeState from "@app/Context_store/NodeState";
import { Final_equation } from "src/app/ExperimentStatus/MoreExperimentStuff/Final_equation";
import { Throughput_details } from "src/app/ExperimentStatus/MoreExperimentStuff/Throughput_details";
import { Response_time_details } from "src/app/ExperimentStatus/MoreExperimentStuff/Response_time_details";
import { Resource_usage_details } from "src/app/ExperimentStatus/MoreExperimentStuff/Resource_usage_details";
const dataa =
{
  exp_name: 'Experiment_00',
  namespace: '',
  deployment: '',

  THweightage: 25,
  THoperator: '0',
  THquery: 'application_org_acme_microprofile_metrics_PrimeNumberChecker_checksTimer_mean_seconds',
  THdatasource: 'prometheus',
  THvaluetype: 'double',
  THdirection: 'min',
  THequation: '0.25 * throughput',

  RTweightage: 50,
  RToperator: '0',
  RTquery: "application_org_acme_microprofile_metrics_PrimeNumberChecker_checksTimer_mean_seconds",
  RTdatasource: 'prometheus',
  RTvaluetype: 'double',
  RTdirection: 'min',
  RTequation: '0.5 * responsetime',

  RUweightage: 25,
  RUoperator: '0',
  RUquery: 'application_org_acme_microprofile_metrics_PrimeNumberChecker_checksTimer_mean_seconds',
  RUdatasource: 'prometheus',
  RUvaluetype: 'double',
  RUdirection: 'min',
  RUequation: '0.25 * resourceusage',
  net_eq: '0.25 * throughput / 0.5 * responsetime * 0.25 * resourceusage',
  allDone: ''
}

const RunExperiment = (props: { setData; data }) => {
  const [data, setData] = useState(dataa);
  const Context = useContext(nodeContext);
  const [stepId, setStepId] = useState(1);
  const enable_progress = () => {
    if (data.deployment || data.allDone) {
      setStepId(stepId + 1)
    }
  }
  const steps = [
    {
      id: 1, 
      name: 'New Experiment', 
      component: <RE setData={setData} data={data} />,
      enableNext: data.deployment && data.namespace && data.exp_name
    },
    //{ name: 'Experiment Status', component: <ExperimentStatus /> },
    {
      id: 2,
      name: 'Experiment Details', 
      component: <ExperimentDetails setData={setData} data={data} />,
      enableNext: data.allDone, canJumpTo: stepId >= 2,
      steps: [
        { id: 3, name: 'Throughput', component: <Throughput_details data={data} setData={setData} /> },
        { id: 4, name: 'Response Time', component: <Response_time_details data={data} setData={setData} /> },
        { id: 5, name: 'Resource Usage', component: <Resource_usage_details data={data} setData={setData} /> },
        { id: 6, name: 'Final Equation', component: <Final_equation data={data} setData={setData} />, hideClose: true }
      ]
    },
    {
      id: 7,
      name: 'YAML Generation', 
      component: <CodeEditorWithActions setData={setData} data={data} />,
      nextButtonText: 'Finish', canJumpTo: stepId >= 3
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
        />
      </NodeState>
      {console.log("step id log" + stepId)}
    </>
  )
};

export { RunExperiment };
