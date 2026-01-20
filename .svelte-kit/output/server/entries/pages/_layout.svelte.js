import { c as create_ssr_component, b as subscribe, e as escape, d as each, v as validate_component } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
const css = {
  code: '.header-inner.svelte-pkkt66{max-width:var(--md-main-col, 760px);margin-left:auto;margin-right:auto}.title-font.svelte-pkkt66{font-family:"Iowan Old Style BT", "Iowan Old Style", "Palatino Linotype", Palatino, serif}.meta.svelte-pkkt66{font-size:16px;line-height:1.55}.authors.svelte-pkkt66{font-size:16px}.affiliations.svelte-pkkt66{margin-top:10px;color:#111827;opacity:0.9}.affiliation-line.svelte-pkkt66{margin-top:2px}.date.svelte-pkkt66{margin-top:10px;color:#111827;opacity:0.9}@media(max-width: 580px){.meta.svelte-pkkt66{font-size:15px}}',
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<header class="layout-xl justify-between items-start" data-sveltekit-noscroll data-sveltekit-preload-code="eager"><div class="header-inner mb-8 svelte-pkkt66"><h1 class="title-font font-bold text-black text-3xl mb-4 leading-tight svelte-pkkt66">${escape($page.data.header?.title ?? "IsoCompute Playbook: Optimally Scaling Sampling Compute for RL Training of LLMs")}</h1> <div class="meta text-black svelte-pkkt66"><div class="authors svelte-pkkt66">${escape($page.data.header?.authors ?? "__AUTHORS__")}</div> <div class="affiliations svelte-pkkt66">${Array.isArray($page.data.header?.affiliations) ? `${each($page.data.header.affiliations, (line, i) => {
    return `<div class="affiliation-line svelte-pkkt66">${escape(line)}</div>`;
  })}` : `${escape($page.data.header?.affiliations ?? "__AFFILIATIONS__")}`}</div> <div class="date svelte-pkkt66">${escape($page.data.header?.date ?? "__DATE__")}</div></div></div> </header>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-1r9of7h_START --><!-- HEAD_svelte-1r9of7h_END -->`, ""} ${validate_component(Header, "Header").$$render($$result, {}, {}, {})} ${`<main>${slots.default ? slots.default({}) : ``}</main>`} `;
});
export {
  Layout as default
};
