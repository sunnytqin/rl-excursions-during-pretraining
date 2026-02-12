import { t as textRaw } from "../../../chunks/rl_excursions.js";
function load() {
  const text = textRaw.replace(
    /src="\/assets\/figures\//g,
    'src="../assets/figures/'
  );
  return { text };
}
export {
  load
};
