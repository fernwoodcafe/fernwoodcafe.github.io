import { render } from "@testing-library/vue";
import FrcSelectOption from "@ui/components/FrcSelectOption.vue";
import "jest-extended";
import { beforeAll, describe, expect, it } from "vitest";

describe("FrcSelectOptions", () => {
  let getAllByText;

  beforeAll(() => {
    ({ getAllByText } = render(FrcSelectOption, {
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
    }));
  });

  it("renders option keys as option labels", () => {
    const options = getAllByText(/Name.*/);

    expect(options.map((a) => a.textContent)).toIncludeAllMembers([
      "Name0",
      "Name2",
      "Name1",
    ]);
  });

  it("renders option keys in alpha order", () => {
    const options = getAllByText(/Name.*/);

    expect(options.map((a) => a.textContent)).toEqual([
      "Name0",
      "Name1",
      "Name2",
    ]);
  });
});
