import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.ChLlgYj5.js","_app/immutable/chunks/scheduler.CHFMnfDQ.js","_app/immutable/chunks/index.CVT-IMcY.js","_app/immutable/chunks/each.CeinbROj.js","_app/immutable/chunks/stores.llz5rraP.js","_app/immutable/chunks/entry.CjhgFF90.js"];
export const stylesheets = ["_app/immutable/assets/0.BKfXKD0t.css"];
export const fonts = [];
