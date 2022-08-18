import React, { useState } from "react";
import {
  PageSection,
  Title,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  TreeView,
} from "@patternfly/react-core";
import {Link} from "react-router-dom";
import listAuotuneTunablesJson from "./jsonFiles/listAutotuneTunables.json";

const ExperimentStatus: React.FunctionComponent = () => {
  const [activeItems, setActiveItems] = useState({});
  const [allExpanded, setAllExpanded] = useState<any | null>(null);

  const onSelect = (evt, treeViewItem) => {
    setActiveItems(treeViewItem);
  };
  const onToggle = (evt) => {
    setAllExpanded(allExpanded !== undefined ? !allExpanded : true);
  };

  const layer_name =
    listAuotuneTunablesJson &&
    listAuotuneTunablesJson.map((layerdetail) => {
      return (
        <>
          {"Layer: " +
            layerdetail.layer_name.charAt(0).toUpperCase() +
            layerdetail.layer_name.slice(1)}
        </>
      );
    });

  const tunable_name =
    listAuotuneTunablesJson &&
    listAuotuneTunablesJson.map((layers) => {
      return (
        <>
          {layers.tunables &&
            layers.tunables.map((tune) => {
              return (
                <>
                  {"Tunable: " +
                    tune.name.charAt(0).toUpperCase() +
                    tune.name.slice(1)}{" "}
                  <br />
                </>
              );
            })}
        </>
      );
    });

  const autotune_optuna = [
    {
      name: layer_name[0],
      children: [
        {
          name: tunable_name[0],
        },
      ],
    },
  ];
  const autotune = [
    {
      name: layer_name[0],
      id: "A",
      children: [
        {
          name: tunable_name[0],
        },
      ],
    },
    {
      name: layer_name[1],
      id: "B",
      children: [
        {
          name: tunable_name[1],
        },
      ],
    },
    {
      name: layer_name[2],
      id: "C",
      children: [
        {
          name: tunable_name[2],
        },
      ],
    },
  ];

  return (
    <PageSection className="pf-u-font-family-redhatVF-sans-serif">
      <Card>
        <CardHeader>
          <Title headingLevel="h1" size="lg">
            Layers and Tunable hierarchy
          </Title>
        </CardHeader>
        <CardBody>
          Let's peek into the deployment and see what's inside.......... We have
          figured out the layers and tunables for you !
        </CardBody>
      </Card>

      <Card>
        <CardHeader>Deployment Name : <b>Autotune</b></CardHeader>
        <CardBody>
         
          1. Container Image Name: <b> Autotune </b>
          <TreeView
            data={autotune}
            onSelect={onSelect}
            allExpanded={allExpanded}
          />
        </CardBody>
        <CardBody>
          2. Container Image Name: Autotune-Optuna
          <TreeView
            data={autotune_optuna}
            onSelect={onSelect}
            allExpanded={allExpanded}
          />
        </CardBody>
        <CardFooter>
          <Button variant="primary" onClick={onToggle}>
            {allExpanded && "Collapse all"}
            {!allExpanded && "Expand all"}
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Link to="/more_experiment_details">
          <Button variant="primary">Excited to Run Experiment ? </Button>
          </Link>
        </CardFooter>
      </Card>
    </PageSection>
  );
};

export { ExperimentStatus };
