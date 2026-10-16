import { describe, expect, it } from "vitest";
import type { Task } from "../content/types";
import {
  checkChoice,
  checkExpression,
  checkNumeric,
  parseCzechNumber,
} from "./check";

describe("parseCzechNumber", () => {
  it.each([
    ["3", 3],
    ["-2", -2],
    ["1,5", 1.5],
    ["1.5", 1.5],
    ["-0,25", -0.25],
    ["1 000", 1000],
    ["  42  ", 42],
    ["+7", 7],
  ])("parse(%s) = %d", (input, expected) => {
    expect(parseCzechNumber(input)).toBe(expected);
  });

  it.each(["", "abc", "1,2,3", "1/2", "3x", "--5", "NaN"])(
    "parse(%s) = null",
    (input) => {
      expect(parseCzechNumber(input)).toBeNull();
    },
  );
});

describe("checkNumeric", () => {
  it("přesná shoda i s čárkou", () => {
    expect(checkNumeric(1.5, "1,5")).toBe(true);
    expect(checkNumeric(1.5, "1.5")).toBe(true);
    expect(checkNumeric(-4, "-4")).toBe(true);
  });

  it("tolerance zaokrouhlení", () => {
    expect(checkNumeric(1 / 3, "0,333", { abs: 1e-3 })).toBe(true);
    expect(checkNumeric(100, "101", { rel: 0.02 })).toBe(true);
    expect(checkNumeric(100, "101", { rel: 0.001 })).toBe(false);
  });

  it("neshoda a nesmysly", () => {
    expect(checkNumeric(5, "6")).toBe(false);
    expect(checkNumeric(5, "")).toBe(false);
    expect(checkNumeric(5, "pět")).toBe(false);
  });
});

describe("checkExpression", () => {
  it.each([
    ["x+1", "1+x"],
    ["2*(x+1)", "2x+2"],
    ["(x-1)*(x+1)", "x^2-1"],
    ["x/2", "0.5x"],
    ["x+0", "x"],
    ["(x+2)/4", "x/4+0,5"],
  ])("ekvivalentní: %s ≡ %s", (expected, input) => {
    expect(checkExpression(expected, input)).toBe(true);
  });

  it.each([
    ["x+1", "x+2"],
    ["x^2", "x*2"],
    ["x+1", "x-1"],
    ["1/x", "x"],
  ])("neekvivalentní: %s ≢ %s", (expected, input) => {
    expect(checkExpression(expected, input)).toBe(false);
  });

  it("neparsovatelný vstup je špatně", () => {
    expect(checkExpression("x+1", "")).toBe(false);
    expect(checkExpression("x+1", "???")).toBe(false);
    expect(checkExpression("x+1", "x+")).toBe(false);
  });
});

describe("checkChoice", () => {
  const t = { spravna: 2 } as Task;
  it("porovná index se správnou možností", () => {
    expect(checkChoice(t, 2)).toBe(true);
    expect(checkChoice(t, 3)).toBe(false);
  });
});
