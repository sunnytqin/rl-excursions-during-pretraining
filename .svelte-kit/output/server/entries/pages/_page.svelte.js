import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import { t as text, S as Seo, a as ScrollMeter, M as Markdown } from "../../chunks/iso_compute_final0.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Seo, "Seo").$$render(
    $$result,
    {
      title: "IsoCompute Playbook: Optimally Scaling Sampling Compute for RL Training of LLMs",
      description: "IsoCompute Playbook: Optimally Scaling Sampling Compute for RL Training of LLMs (image URLs replaced with placeholders)."
    },
    {},
    {}
  )} <div>${validate_component(ScrollMeter, "ScrollMeter").$$render($$result, { containerSelector: ".md-output" }, {}, {})} <div class="layout-xl text-base space-y-12">${validate_component(Markdown, "Markdown").$$render($$result, { source: text }, {}, {})}</div></div>`;
});
export {
  Page as default
};
