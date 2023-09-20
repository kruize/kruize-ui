import React, { useState } from 'react';
import {
  PageSection,
  Title,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  TreeView,
  PageSectionVariants,
  Text,
  Toolbar,
  TextVariants,
  ToolbarContent,
  TextContent
} from '@patternfly/react-core';
import { Link } from 'react-router-dom';
import listAuotuneTunablesJson from './jsonFiles/listAutotuneTunables.json';

const ExperimentStatus = () => {
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
      return <>{'Layer: ' + layerdetail.layer_name.charAt(0).toUpperCase() + layerdetail.layer_name.slice(1)}</>;
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
                  {'Tunable: ' + tune.name.charAt(0).toUpperCase() + tune.name.slice(1)} <br />
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
          name: tunable_name[0]
        }
      ]
    }
  ];
  const autotune = [
    {
      name: layer_name[0],
      id: 'A',
      children: [
        {
          name: tunable_name[0]
        }
      ]
    },
    {
      name: layer_name[1],
      id: 'B',
      children: [
        {
          name: tunable_name[1]
        }
      ]
    },
    {
      name: layer_name[2],
      id: 'C',
      children: [
        {
          name: tunable_name[2]
        }
      ]
    }
  ];

  return (
    <PageSection variant={PageSectionVariants.light}>
      <Toolbar>
        <ToolbarContent style={{ paddingLeft: 0 }}>
          <TextContent>
            <Text component={TextVariants.h1}>Layers and Tunable hierarchy</Text>
            <Text component={TextVariants.p}>
              Let's peek into the deployment and see what's inside.......... We have figured out the layers and tunables
              for you !
            </Text>
          </TextContent>
        </ToolbarContent>
      </Toolbar>
      Deployment Name : <b> Autotune</b>
      <CardBody>
        1. Container Image Name: <b> Autotune </b>
        <TreeView data={autotune} onSelect={onSelect} allExpanded={allExpanded} />
      </CardBody>
      <CardBody>
        2. Container Image Name: Autotune-Optuna
        <TreeView data={autotune_optuna} onSelect={onSelect} allExpanded={allExpanded} />
      </CardBody>
      <CardFooter>
        <Button variant="primary" onClick={onToggle}>
          {allExpanded && 'Collapse all'}
          {!allExpanded && 'Expand all'}
        </Button>
      </CardFooter>
    </PageSection>
  );
};

export { ExperimentStatus };
