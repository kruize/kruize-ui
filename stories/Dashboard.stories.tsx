import React, { ComponentProps } from 'react';
import { About } from '@app/About/About';
import { Story } from '@storybook/react';

//๐ This default export determines where your story goes in the story list
export default {
  title: 'Components/About',
  component: About,
};

//๐ We create a โtemplateโ of how args map to rendering
const Template: Story<ComponentProps<typeof About>> = (args) => <About {...args} />;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /*๐ The args you need here will depend on your component */
};
