import { describe, it } from "vitest";
import { availableUnitConversions } from "../services";

describe("when processing valid inputs", () => {
  it("does not throw", () => {
    // Act
    availableUnitConversions("gram");
  });
});
