import React from "react";
import { Ephemeris } from ".";
import { Story, Meta } from "@storybook/react/types-6-0";
import { getSunData } from "../../utils/ephemeris";

export default {
  title: "Ephemeris",
  component: Ephemeris,
  args: { data: getSunData() }
} as Meta;

const Template: Story<React.ComponentProps<typeof Ephemeris>> = args => (
  <Ephemeris {...args} />
);

export const Basic = Template.bind({});
