import { render } from "@testing-library/vue";
import FrcSelectOption from "@ui/components/FrcSelectOption.vue";
import { describe, expect, it } from "vitest";

describe("FrcSelectOptions", () => {
  it("renders option keys as option labels", () => {
    const { getAllByText } = render(FrcSelectOption, {
      props: {
        label: "Ingredients",
        options: [
          {
            name: "Name0",
            value: 0,
          },
          {
            name: "Name2",
            value: 2,
          },
          {
            name: "Name1",
            value: 1,
          },
        ],
        optionKey: "name",
      },
    });

    const all = getAllByText(/Name.*/);

    expect(all.map((a) => a.textContent)).toEqual(["Name0", "Name1", "Name2"]);
  });
});
