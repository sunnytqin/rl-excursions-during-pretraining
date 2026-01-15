const prerender = true;
const trailingSlash = "always";
const load = async ({ url }) => {
  return { pathname: url.pathname };
};
export {
  load,
  prerender,
  trailingSlash
};
