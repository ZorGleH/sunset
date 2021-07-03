export type Time = string;

export type Day = {
  date: string;
  sunrise: Time;
  civrise: Time;
  sunset: Time;
  civset: Time;
};

export type Moment = keyof Day | number;
