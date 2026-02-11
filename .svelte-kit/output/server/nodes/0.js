import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.Cgsge1Dq.js","_app/immutable/chunks/scheduler.CHFMnfDQ.js","_app/immutable/chunks/index.BvnlO6mU.js","_app/immutable/chunks/paths.vMwWHe0N.js","_app/immutable/chunks/each.Cn-hsyDx.js","_app/immutable/chunks/stores.B4ik_xdL.js","_app/immutable/chunks/entry.B-c81K6s.js"];
export const stylesheets = ["_app/immutable/assets/0.ChBBf1Xn.css"];
export const fonts = [];
