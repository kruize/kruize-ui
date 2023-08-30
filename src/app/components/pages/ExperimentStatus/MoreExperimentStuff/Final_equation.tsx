import React, { useState, useEffect } from 'react';
import { Text, TextVariants, TextContent, PageSection, PageSectionVariants } from '@patternfly/react-core';
import { MathComponent } from 'mathjax-react';

const Final_equation = (props: { data; setData }) => {
  const [net_eq, setNet_eq] = useState(props.data['net_eq']);

  useEffect(() => {
    props.setData({ ...{ ...props.data }, net_eq: net_eq, allDone: 'yes' });
  }, [net_eq]);

  useEffect(() => {
    setNet_eq(String.raw`${props.data.THequation}${props.data.RTequation}${props.data.RUequation}`);
  }, []);

  return (
    <PageSection variant={PageSectionVariants.light}>
      <TextContent>
        <Text component={TextVariants.h3}> Final Equation</Text>
      </TextContent>
      <MathComponent tex={net_eq} />
    </PageSection>
  );
};
export { Final_equation };
