import { base } from "$app/paths";
import textRaw from "../../maintext/rl_excursions.md?raw";

export function load() {
  // Prefix figure paths with base so images work in dev (base="") and on GitHub Pages (base="/rl-excursions-during-pretraining").
  // Markdown uses absolute paths like /assets/figures/...; we need base + /assets/figures/... for the live site.
  const basePath = base || "";
  const text = textRaw.replace(
    /src="\/assets\/figures\//g,
    `src="${basePath}/assets/figures/`
  );
  return { text };
}
