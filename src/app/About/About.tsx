import * as React from 'react';
import { PageSection, Title } from '@patternfly/react-core';

const About: React.FunctionComponent = () => (
  <PageSection>
    <Title headingLevel="h1" size="lg"><center>About Autotune Page!</center></Title>
    <p>
    Autotune is an Autonomous Performance Tuning Tool for Kubernetes. Autotune accepts a user provided
Service Level Objective or "slo" goal to optimize application performance. It uses Prometheus to identify
"layers" of an application that it is monitoring and matches tunables from those layers to the user provided
slo. It then runs experiments with the help of a hyperparameter optimization framework to arrive at the most
optimal values for the identifed tunables to get a better result for the user provided slo.
<br /><br />
Autotune can take an arbitrarily large set of tunables and run experiments to continually optimize the user
provided slo in incremental steps. For this reason, it does not necessarily have a "best" value for a set of
tunables, only a "better" one than what is currently deployed.
    </p>
  </PageSection>
)

export { About };
