import { describe, it } from "vitest";
import { valueConvertedToUnit } from "../../services";

describe("when processing valid inputs", () => {
  it("does not throw", () => {
    // Act
    valueConvertedToUnit(5, "pound", "gram");
  });
});
