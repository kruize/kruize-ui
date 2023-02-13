import { Button, EmptyState, EmptyStateBody, EmptyStateIcon, EmptyStateSecondaryActions, Progress, Title } from '@patternfly/react-core';
import { CogsIcon } from '@patternfly/react-icons';
import React, { useEffect, useState } from 'react'

const FinishedStep = () => {
    const [percent, setPercent] = useState(0);

    const tick = () => {
        setPercent(prevPercent => {
            if (prevPercent < 100) {
                return prevPercent + 20;
            } else {
                return prevPercent;
            }
        });
    };

    useEffect(() => {
        const interval = setInterval(() => tick(), 1000);

        if (percent >= 100) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [percent]);

    return (
        <div className="pf-l-bullseye">
            <EmptyState variant="large">
                <EmptyStateIcon icon={CogsIcon} />
                <Title headingLevel="h4" size="lg">
                    {percent === 100 ? 'YAML Applied ' : 'Applying the YAML to Kruize '}
                </Title>
                <EmptyStateBody>
                    <Progress value={percent} measureLocation="outside" aria-label="validation-progress" />
                </EmptyStateBody>
                <EmptyStateBody>
                    We are sending a post request to the backend, with the experiment details provided.
                </EmptyStateBody>
                <EmptyStateSecondaryActions>
                    <Button isDisabled={percent !== 100} >
                        Back to console
                    </Button>
                </EmptyStateSecondaryActions>
            </EmptyState>
        </div>
    );
};

export { FinishedStep }

