import { describe, it } from "vitest";
import { lookupUnitAvailableConversions } from "../services";

describe("when processing valid inputs", () => {
  it("does not throw", () => {
    // Act
    lookupUnitAvailableConversions("gram");
  });
});
