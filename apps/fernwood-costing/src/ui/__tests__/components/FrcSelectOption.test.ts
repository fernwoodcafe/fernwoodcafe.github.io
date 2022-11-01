import FrcSelectOption from "@ui/components/FrcSelectOption.vue";
import { mount } from "@vue/test-utils";
import { describe, it } from "node:test";

describe("", () => {
  it("", () => {
    const wrapper = mount(FrcSelectOption, {
      label: "Ingredients",
      options: {
        foo: {
          name: "foo",
          value: 0,
        },
        bar: {
          name: "bar",
          value: 1,
        },
        baz: {
          name: "baz",
          value: 2,
        },
      },
      optionKey: "name",
      onSubmitSelect: (data) => {
        console.log("foo");
      },
    });
  });
});
