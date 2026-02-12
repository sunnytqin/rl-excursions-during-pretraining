import textRaw from "../../maintext/rl_excursions.md?raw";

export function load() {
  // Use relative paths so images work in dev and on GitHub Pages regardless of base path.
  // From route /rl-excursions (or /base/rl-excursions), ../assets/figures/ resolves correctly.
  const text = textRaw.replace(
    /src="\/assets\/figures\//g,
    'src="../assets/figures/'
  );
  return { text };
}
