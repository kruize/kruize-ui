import React, { useState, useContext, useEffect } from 'react';
import {
  PageSection,
  PageSectionVariants,
  Toolbar,
  ToolbarContent,
  FormGroup,
  Grid,
  GridItem,
  TextContent,
  Text,
  TextVariants,
  TextInputGroup,
  TextInputGroupMain
} from '@patternfly/react-core';
import NameSpaceDropDown from './NameSpaceDropDown';
import DeploymentsDropdown from './DeploymentsDropdown';
import nodeContext from '@app/ContextStore/nodeContext';

const RE = (props: { setData; data }) => {
  const [exp_name, setExp_name] = useState('--');
  const Context = useContext(nodeContext);

  useEffect(() => {
    props.setData({ ...{ ...props.data }, exp_name: exp_name });
  }, [exp_name]);

  useEffect(() => {
    setExp_name(sessionStorage.getItem('Exp name Value')!);
  }, []);

  const onTextInputHandler = (exp_name) => {
    sessionStorage.setItem('Exp name Value', exp_name);
    setExp_name(exp_name);
  };

  const dropd = () => {
    return (
      <>
        <PageSection variant={PageSectionVariants.light}>
          <Toolbar>
            <ToolbarContent style={{ paddingLeft: 0 }}>
              <TextContent>
                <Text component={TextVariants.h1}>New Experiment</Text>
                <Text component={TextVariants.p}>
                  Select your specific Namespace and Deployment to start with Experiment.
                </Text>
              </TextContent>
            </ToolbarContent>
          </Toolbar>
          <Grid hasGutter>
            <GridItem span={8}>
              <Grid hasGutter>
                <GridItem span={6}>
                  <FormGroup isRequired label="Experiment Name" fieldId="horizontal-form-email">
                    <TextInputGroup>
                      <TextInputGroupMain
                        value={exp_name || ''}
                        name="experiment_name_textbox"
                        onChange={(_event, exp_name) => onTextInputHandler(exp_name)}
                        aria-label="Text inp 101"
                      />
                    </TextInputGroup>

                    <br />
                  </FormGroup>
                </GridItem>
                <GridItem span={6}>
                  <FormGroup isRequired label="Namespace" fieldId="horizontal-form-email"></FormGroup>
                  <NameSpaceDropDown data={props.data} setData={props.setData} />
                </GridItem>
                <GridItem span={6}>
                  <FormGroup isRequired label="Deployment" fieldId="horizontal-form-email"></FormGroup>
                  <DeploymentsDropdown data={props.data} setData={props.setData} />
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </PageSection>
      </>
    );
  };
  return <div>{dropd()}</div>;
};

export default RE;
