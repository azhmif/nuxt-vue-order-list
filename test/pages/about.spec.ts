import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
// import Index from './pages/index.vue';
// import Index from "~/pages/index.vue";
import About from "../../pages/about.vue";

describe("My index page test", async () => {
  test("default text should be shown", () => {
    const wrapper = mount(About);
    // logger(wrapper);
    expect(wrapper.text()).toContain(
      "This page will be displayed at the /about route."
    );
  });
});
