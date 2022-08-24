import * as React from 'react';
import { PageSection, PageSectionVariants, Toolbar, ToolbarContent, TextContent, Text, TextVariants, Title } from '@patternfly/react-core';
import { Link } from "react-router-dom";

const InstallationGuide: React.FunctionComponent = () => {
  return (
    <PageSection variant={PageSectionVariants.light}>
      <Toolbar>
        <ToolbarContent style={{ paddingLeft: 0 }}>
          <TextContent>
            <Text component={TextVariants.h1}>
              Let's define peformance objectives
            </Text>
            <Text component={TextVariants.p}>

              Here's what our system found for you! You bet. This is the best with
              all 3 parameters combined!<br />
              Want to fiddle around with the parameters? Click here for{" "}
              <Link
                to="/advanceduser/objectivefunction"
                className="btn btn-primary"
              >
                Advanced Settings
              </Link>

            </Text>
          </TextContent>
        </ToolbarContent>
      </Toolbar>
    </PageSection>
  )
};

export { InstallationGuide };
