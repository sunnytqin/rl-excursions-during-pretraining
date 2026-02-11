import { base } from "$app/paths";
import textRaw from "../../maintext/rl_excursions.md?raw";

export function load() {
  // Resolve figure paths so images work in dev (base="") and on GitHub Pages (base="/rl-excursions-during-pretraining").
  // Must run in load() so prerendered HTML gets correct URLs.
  const basePath = base || "";
  const text = textRaw.replace(
    /src="\.\.\/assets\/figures\//g,
    `src="${basePath}/assets/figures/`
  );
  return { text };
}
