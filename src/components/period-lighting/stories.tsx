import React from "react";
import { PeriodLighting } from ".";
import { Story, Meta } from "@storybook/react/types-6-0";
import { take } from "lodash";
import { getSunData } from "../../utils/ephemeris";

export default {
  title: "Period Lighting",
  component: PeriodLighting,
  args: {
    data: take(getSunData(), 50),
    areas: [
      { from: 0, to: "sunrise", color: "#BADA55" },
      { from: "civrise", to: "sunrise", color: "blue" },
      { from: "sunrise", to: "civset", color: "rgba(0,255,167,.5)" },
      { from: "sunset", to: 24 * 60 * 60, color: "deeppink" }
    ]
  }
} as Meta;

const Template: Story<React.ComponentProps<typeof PeriodLighting>> = args => (
  <PeriodLighting {...args} />
);

export const Basic = Template.bind({});
