import React, { ComponentProps } from 'react';
import { About } from '@app/About/About';
import { Story } from '@storybook/react';

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/About',
  component: About,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<ComponentProps<typeof About>> = (args) => <About {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /*👇 The args you need here will depend on your component */
};
