import { c as create_ssr_component, b as subscribe, v as validate_component } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
const css = {
  code: "@media(max-width: 580px){}@media(max-width: 420px){}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const links = [
    // { name: "projects", href: "/projects" },
    { name: "Notes", href: "/notes" }
  ];
  $$result.css.add(css);
  {
    {
      const link = links.find(({ href }) => href === $page.url.pathname);
      if (link) {
        link.name.charAt(0).toUpperCase() + link.name.slice(1);
      }
    }
  }
  $$unsubscribe_page();
  return `<header class="layout-md justify-between items-start" data-sveltekit-noscroll data-sveltekit-preload-code="eager" data-svelte-h="svelte-17v4y9h"><div class="mb-8"><h1 class="font-bold text-black text-3xl mb-4">IsoFLOPs Playbook: Workflows for Scaling Sampling FLOPs for RL Training of LLMs</h1> <p class="text-black text-lg">__AUTHORS__
      <br>
      __AFFILIATIONS__
      <br>
      __DATE__</p></div>  </header>`;
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
