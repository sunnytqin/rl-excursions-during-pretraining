import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { t as textRaw, S as Seo, a as ScrollMeter, M as Markdown } from "../../../chunks/rl_excursions.js";
import { b as base } from "../../../chunks/paths.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let text;
  text = textRaw.replace(/src="\.\.\/assets\/figures\//g, `src="${base}/assets/figures/`);
  return `  ${validate_component(Seo, "Seo").$$render(
    $$result,
    {
      title: "RL Excursions during Pre-training",
      description: "RL Excursions during Pre-training: How early is too early for On-policy Learning?"
    },
    {},
    {}
  )} <div>${validate_component(ScrollMeter, "ScrollMeter").$$render($$result, { containerSelector: ".md-output" }, {}, {})} <div class="layout-xl text-base space-y-12">${validate_component(Markdown, "Markdown").$$render($$result, { source: text }, {}, {})}</div></div>`;
});
export {
  Page as default
};
