import React, { ComponentProps } from 'react';
import { Status } from '@app/RunExperiment/Status';
import { Story } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Status',
  component: Status,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof Status>> = (args) => <Status {...args} />;

export const StatusStory = Template.bind({});
StatusStory.args = {
  /*👇 The args you need here will depend on your component */
};
