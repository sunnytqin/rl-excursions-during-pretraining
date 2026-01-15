// @ts-nocheck
import type { LayoutLoad } from "./$types";

export const prerender = true;
export const trailingSlash = "always";

export const load = async ({ url }: Parameters<LayoutLoad>[0]) => {
  return { pathname: url.pathname };
};
