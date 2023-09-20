import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  PageSection,
  PageSectionVariants,
  Text,
  TextVariants,
  TextContent,
  Title
} from '@patternfly/react-core';
import { RunExperiment } from '@app/RunExperiment/RunExperiment';
const About = () => (
  <PageSection variant={PageSectionVariants.light}>
    <TextContent>
      <Text component={TextVariants.h1} className="pf-m-redhat-font">
        About Kruize
      </Text>
    </TextContent>

    <br />
    <Text component={TextVariants.h5} className="pf-m-redhat-font">
      Kruize is an Autonomous Performance Tuning Tool for Kubernetes. Kruize accepts a user provided Service Level
      Objective or "slo" goal to optimize application performance. It uses Prometheus to identify "layers" of an
      application that it is monitoring and matches tunables from those layers to the user provided slo. It then runs
      experiments with the help of a hyperparameter optimization framework to arrive at the most optimal values for the
      identifed tunables to get a better result for the user provided slo.
      <br />
      <br />
      Kruize can take an arbitrarily large set of tunables and run experiments to continually optimize the user provided
      slo in incremental steps. For this reason, it does not necessarily have a "best" value for a set of tunables, only
      a "better" one than what is currently deployed.
    </Text>
    <br />
    {/* <Link to="/newexperiment">
      <Button variant="primary">Start a Kruize Experiment</Button>
    </Link> 
    Hiding from the user
    */}
  </PageSection>
);

export { About };
