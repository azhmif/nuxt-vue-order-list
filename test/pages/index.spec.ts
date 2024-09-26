import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Index from "../../pages/index.vue";

describe("Order List page Test", async () => {
  test("Component", () => {
    const wrapper = mount(Index);
    expect(wrapper.vm).toBeTruthy();
  });
});
