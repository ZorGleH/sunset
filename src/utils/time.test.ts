import {
  readableTime,
  secondsToTime,
  timeToSeconds,
  yearlyLightingTime
} from "./time";
import { getSunData } from "./ephemeris";

const data = getSunData();

describe("timeToSeconds", () => {
  test("random value", () => {
    expect(timeToSeconds("08:46:02")).toEqual(31562);
  });
  test("null value", () => {
    expect(timeToSeconds("00:00:00")).toEqual(0);
  });
});

describe("secondsToTime", () => {
  test("random value", () => {
    expect(secondsToTime(31562)).toEqual("08:46:02");
  });
  test("null value", () => {
    expect(secondsToTime(0)).toEqual("00:00:00");
  });
});

describe("yearlyLightingTime", () => {
  test("no lighting", () => {
    expect(
      yearlyLightingTime(
        data,
        timeToSeconds("12:00:00"),
        timeToSeconds("12:00:00")
      )
    ).toEqual(0);
  });
  test("max lighting", () => {
    expect(
      yearlyLightingTime(
        data,
        timeToSeconds("00:00:00"),
        timeToSeconds("24:00:00")
      )
    ).toEqual(4104.15);
  });
  test("partial lighting", () => {
    expect(
      yearlyLightingTime(
        data,
        timeToSeconds("05:00:00"),
        timeToSeconds("23:00:00")
      )
    ).toEqual(1938.38);
  });
});

describe("readableTime", () => {
  test("with string", () => {
    expect(readableTime("05:32:03")).toEqual("5h32");
  });
  test("with number", () => {
    expect(readableTime(17 * 60 * 60 + 32 * 60 + 3)).toEqual("17h32");
  });
});
