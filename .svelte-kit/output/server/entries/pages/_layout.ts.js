const prerender = true;
const trailingSlash = "always";
const load = async ({ url }) => {
  return {
    pathname: url.pathname,
    header: {
      title: "IsoCompute Playbook: Optimally Scaling Sampling Compute for RL Training of LLMs",
      // Edit these three fields to update the header author block.
      authors: "Zhoujun Cheng*, Yutao Xie*, Yuxiao Qu*, Amrith Setlur*, Shibo Hao, Varad, Tongtong Liang, Feng Yao, Hector Liu, Eric Xing, Virginia Smith, Ruslan Salakhutdinov, Zhiting Hu, Taylor Killian, Aviral Kumar",
      affiliations: [
        "UCSD, MBZUAI-IFM, Carnegie Mellon University",
        "* equal contribution"
      ],
      date: "2026 01/19"
    }
  };
};
export {
  load,
  prerender,
  trailingSlash
};
