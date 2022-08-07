import { describe, it } from "vitest";
import { convertUnit } from "../services";

describe("when processing valid inputs", () => {
  it("does not throw", () => {
    // Act
    convertUnit(5, "pound", "gram");
  });
});
