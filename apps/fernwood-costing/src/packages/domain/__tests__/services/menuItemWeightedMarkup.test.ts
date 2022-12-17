import { expect, it } from "vitest";
import { menuItemWeightedMarkup } from "../../services";

[
  [Number.POSITIVE_INFINITY, 0, 0],
  [Number.POSITIVE_INFINITY, 1, Number.POSITIVE_INFINITY],
  [Number.POSITIVE_INFINITY, 2, Number.POSITIVE_INFINITY],
  [10, 0.2, 2],
].forEach(([markup, percentCategory, expected]) => {
  it("weighted markup is always zero", () => {
    // Act
    const result = menuItemWeightedMarkup(markup, percentCategory);

    // Assert
    expect(result).toBe(expected);
  });
});
