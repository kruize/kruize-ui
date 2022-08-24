import React, { ComponentProps } from 'react';
import { RunExperiment } from '@app/RunExperiment/RunExperiment';
import { Story } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/RunExperiment',
  component: RunExperiment,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof RunExperiment>> = (args) => <RunExperiment {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /*👇 The args you need here will depend on your component */
};
