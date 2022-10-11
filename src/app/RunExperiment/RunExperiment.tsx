import React, { useState, useContext, useEffect } from "react";
import {
  Wizard,
} from "@patternfly/react-core";
import RE from "./RE";
import { ExperimentStatus } from "@app/ExperimentStatus/ExperimentStatus";
import { ExperimentDetails } from "@app/ExperimentStatus/MoreExperimentStuff/ExperimentDetails";
import { CodeEditorWithActions } from "@app/GenerateYaml/CodeEditorWithActions";
import nodeContext from "@app/Context_store/nodeContext";
// import WizardState from "@app/Context_store/WizardState";
import NodeState from "@app/Context_store/NodeState";

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
  // const dep = Context["deployment_val"];
  // const nam = Context["namespace_val"];
  const [stepId, setStepId] = useState(1);
  const enable_progress = () => {
    if (data.deployment || data.allDone) {
      setStepId(stepId + 1)
    }
  }
  // useEffect(() => {
  //   if (data.deployment || data.allDone) {
  //     enable_progress
  //   }
  // }, [data.deployment, data.allDone])
  //const check = props.data.namespace;
  //const allFieldsFilled = (props.data.exp_name) && (props.data.namespace != "") && (props.data.deployment != "");
  const steps = [
    {
      name: 'New Experiment', component: <RE setData={setData} data={data} />
      , enableNext: data.deployment
    },
    //{ name: 'Experiment Status', component: <ExperimentStatus /> },
    {
      name: 'Experiment Details', component: <ExperimentDetails setData={setData} data={data} />
      , enableNext: data.allDone, canJumpTo: stepId >= 2
    },
    {
      name: 'YAML Generation', component: <CodeEditorWithActions setData={setData} data={data} />,
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