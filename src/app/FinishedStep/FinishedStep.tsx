import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Progress, EmptyStateActions, EmptyStateHeader, EmptyStateFooter,
  
} from '@patternfly/react-core';
import { CogsIcon } from '@patternfly/react-icons';
import React, { useEffect, useState } from 'react';

const FinishedStep = () => {
  const [percent, setPercent] = useState(0);

  const tick = () => {
    setPercent((prevPercent) => {
      if (prevPercent < 100) {
        return prevPercent + 20;
      } else {
        return prevPercent;
      }
    });
  };
  useEffect(() => {});

  useEffect(() => {
    const interval = setInterval(() => tick(), 1000);

    if (percent >= 100) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [percent]);

  return (
    <div className="pf-l-bullseye">
      <EmptyState variant="lg">
        <EmptyStateHeader titleText={<>{percent === 100 ? 'YAML Applied ' : 'Applying the YAML to Kruize '}</>} icon={<EmptyStateIcon icon={CogsIcon} />} headingLevel="h4" />
        <EmptyStateBody>
          <Progress value={percent} measureLocation="outside" aria-label="validation-progress" />
        </EmptyStateBody><EmptyStateFooter>
        <EmptyStateBody>
          We are sending a post request to the backend, with the experiment details provided.
        </EmptyStateBody>
        <EmptyStateActions>
          <Button isDisabled={percent !== 100}>Back to console</Button>
        </EmptyStateActions>
      </EmptyStateFooter></EmptyState>
    </div>
  );
};

export { FinishedStep };
