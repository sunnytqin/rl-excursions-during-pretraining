import { sveltekit } from "@sveltejs/kit/vite";
import pluginYaml from "@rollup/plugin-yaml";
import yaml from "js-yaml";
import { dataToEsm } from "@rollup/pluginutils";
import type { UserConfig } from "vite";

/** A custom Markdown plugin for Vite, with TOML frontmatter support. */
function markdown() {
  return {
    name: "markdown",

    transform(src: string, id: string) {
      if (/\.md$/.test(id)) {
        let frontmatter = {};
        let content = src;
        if (src.startsWith("---")) {
          const end = src.indexOf("---", 3);
          if (end === -1) {
            throw new Error(`Unclosed TOML frontmatter in ${id}`);
          }
          frontmatter = yaml.load(src.substring(3, end).trim()) as any;
          content = src.substring(end + 3).trim();
        }
        return {
          code: dataToEsm({ ...frontmatter, content }),
          map: null,
        };
      }
    },
  };
}

const config: UserConfig = {
  plugins: [sveltekit(), pluginYaml() as any, markdown()],
  preview: {
    host: '0.0.0.0', // 允许外部访问
    port: 4173,      // 默认 preview 端口
  },
};

export default config;
