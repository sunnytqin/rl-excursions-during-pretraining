import { b as base } from "../../../chunks/paths.js";
import { t as textRaw } from "../../../chunks/rl_excursions.js";
function load() {
  const basePath = base || "";
  const text = textRaw.replace(
    /src="\.\.\/assets\/figures\//g,
    `src="${basePath}/assets/figures/`
  );
  return { text };
}
export {
  load
};
