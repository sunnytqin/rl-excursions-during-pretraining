import { c as create_ssr_component, b as subscribe, e as escape, d as each, f as add_attribute, g as null_to_empty, v as validate_component } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
const css$1 = {
  code: '.header-inner.svelte-1u6s84r.svelte-1u6s84r{max-width:var(--md-main-col, 760px);margin-left:auto;margin-right:auto}.title-font.svelte-1u6s84r.svelte-1u6s84r{font-family:"Iowan Old Style BT", "Iowan Old Style", "Palatino Linotype", Palatino, serif}.meta.svelte-1u6s84r.svelte-1u6s84r{font-size:16px;line-height:1.55}.authors.svelte-1u6s84r.svelte-1u6s84r{font-size:16px;line-height:2.0;text-align:center}.author.svelte-1u6s84r.svelte-1u6s84r{display:inline-flex;align-items:baseline;gap:1px;margin-right:8px;margin-bottom:4px;white-space:nowrap}.author-name.svelte-1u6s84r.svelte-1u6s84r{line-height:1.4}.affil-sup.svelte-1u6s84r.svelte-1u6s84r{display:inline-flex;align-items:flex-start;gap:0px;margin-left:0px}.affil-sup.svelte-1u6s84r .affil-logo.svelte-1u6s84r{margin-left:0px}.affil-logo.svelte-1u6s84r.svelte-1u6s84r{height:16px;width:auto;vertical-align:middle;margin-left:1px}.affil-logo--mbzuai.svelte-1u6s84r.svelte-1u6s84r{height:20px}.affil-logo--cmu.svelte-1u6s84r.svelte-1u6s84r{height:23px}.affil-logo--legend.svelte-1u6s84r.svelte-1u6s84r{height:22px;margin-right:8px}.affil-fallback.svelte-1u6s84r.svelte-1u6s84r{font-size:12px;color:#6b7280;margin-left:4px}.affiliations.svelte-1u6s84r.svelte-1u6s84r{margin-top:10px;color:#111827;opacity:0.9;text-align:center}.affiliation-line.svelte-1u6s84r.svelte-1u6s84r{display:inline-flex;align-items:center;gap:4px;justify-content:center;width:100%;margin-top:2px}.date.svelte-1u6s84r.svelte-1u6s84r{margin-top:10px;color:#111827;opacity:0.9}@media(max-width: 580px){.meta.svelte-1u6s84r.svelte-1u6s84r{font-size:15px}}',
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let authorData;
  let authorList;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  var _a;
  const logoMap = {
    ucsd: {
      src: "/assets/figures/ucsd.png",
      alt: "UC San Diego"
    },
    mbzuai: {
      src: "/assets/figures/mbzuai.png",
      alt: "MBZUAI-IFM"
    },
    cmu: {
      src: "/assets/figures/cmu.png",
      alt: "Carnegie Mellon University"
    }
  };
  const affiliationLogoMap = {
    "UC San Diego": logoMap.ucsd,
    "MBZUAI-IFM": logoMap.mbzuai,
    "Carnegie Mellon University": logoMap.cmu
  };
  const isAuthorEntry = (a) => !!a && typeof a === "object" && "name" in a;
  $$result.css.add(css$1);
  authorData = (_a = $page.data.header) === null || _a === void 0 ? void 0 : _a.authors;
  authorList = Array.isArray(authorData) && authorData.every(isAuthorEntry) ? authorData : null;
  $$unsubscribe_page();
  return `<header class="layout-xl justify-between items-start" data-sveltekit-noscroll data-sveltekit-preload-code="eager"><div class="header-inner mb-8 svelte-1u6s84r"><h1 class="title-font font-bold text-black text-3xl mb-4 leading-tight svelte-1u6s84r">${escape($page.data.header?.title ?? "IsoCompute Playbook: Optimally Scaling Sampling Compute for RL Training of LLMs")}</h1> <div class="meta text-black svelte-1u6s84r"><div class="authors svelte-1u6s84r">${authorList ? `${each(authorList, (author, i) => {
    return `<span class="author svelte-1u6s84r"><span class="author-name svelte-1u6s84r">${escape(author.name)}</span> ${author.affils ? `<sup class="affil-sup svelte-1u6s84r">${each(author.affils, (key, j) => {
      return `${logoMap[key] ? `<img${add_attribute("src", logoMap[key].src, 0)}${add_attribute("alt", logoMap[key].alt, 0)}${add_attribute("title", logoMap[key].alt, 0)} class="${escape(null_to_empty(`affil-logo ${key === "mbzuai" ? "affil-logo--mbzuai" : ""} ${key === "cmu" ? "affil-logo--cmu" : ""}`), true) + " svelte-1u6s84r"}" loading="lazy" decoding="async">` : `<span class="affil-fallback svelte-1u6s84r">${escape(key)}</span>`}`;
    })} </sup>` : ``} </span>`;
  })}` : `${escape($page.data.header?.authors ?? "__AUTHORS__")}`}</div> <div class="affiliations svelte-1u6s84r">${Array.isArray($page.data.header?.affiliations) ? `${each($page.data.header.affiliations, (line, i) => {
    return `<div class="affiliation-line svelte-1u6s84r">${affiliationLogoMap[line] ? `<img${add_attribute("src", affiliationLogoMap[line].src, 0)}${add_attribute("alt", affiliationLogoMap[line].alt, 0)}${add_attribute("title", affiliationLogoMap[line].alt, 0)} class="affil-logo affil-logo--legend svelte-1u6s84r" loading="lazy" decoding="async">` : ``} <span>${escape(line)}</span> </div>`;
  })}` : `${escape($page.data.header?.affiliations ?? "__AFFILIATIONS__")}`}</div> <div class="date svelte-1u6s84r">${escape($page.data.header?.date ?? "__DATE__")}</div></div></div> </header>`;
});
const css = {
  code: ".page-upper-right-inline.svelte-m7b9f7{position:absolute;top:6px;right:26px;display:flex;justify-content:flex-end;pointer-events:none}.page-upper-right.svelte-m7b9f7{width:clamp(140px, 16vw, 240px);height:auto;pointer-events:none}@media(max-width: 720px){.page-upper-right-inline.svelte-m7b9f7{top:4px;right:4px}.page-upper-right.svelte-m7b9f7{width:clamp(110px, 28vw, 180px)}}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-1r9of7h_START --><!-- HEAD_svelte-1r9of7h_END -->`, ""} <div class="page-upper-right-inline svelte-m7b9f7" data-svelte-h="svelte-1cbujm3"><img src="/assets/figures/upper_right2.png" alt="Institution logos" class="page-upper-right svelte-m7b9f7" loading="lazy" decoding="async"></div> ${validate_component(Header, "Header").$$render($$result, {}, {}, {})} ${`<main>${slots.default ? slots.default({}) : ``}</main>`} `;
});
export {
  Layout as default
};
