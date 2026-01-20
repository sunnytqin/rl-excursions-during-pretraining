<script lang="ts">
  import { page } from "$app/stores";

  const logoMap: Record<string, { src: string; alt: string }> = {
    ucsd: { src: "/assets/figures/ucsd.png", alt: "UC San Diego" },
    mbzuai: { src: "/assets/figures/mbzuai.png", alt: "MBZUAI-IFM" },
    cmu: { src: "/assets/figures/cmu.png", alt: "Carnegie Mellon University" },
  };

  const affiliationLogoMap: Record<string, { src: string; alt: string }> = {
    "UC San Diego": logoMap.ucsd,
    "MBZUAI-IFM": logoMap.mbzuai,
    "Carnegie Mellon University": logoMap.cmu,
  };

  type AuthorEntry = { name: string; affils?: string[] };

  const isAuthorEntry = (a: unknown): a is AuthorEntry =>
    !!a && typeof a === "object" && "name" in (a as AuthorEntry);

  $: authorData = $page.data.header?.authors;
  $: authorList = Array.isArray(authorData) && authorData.every(isAuthorEntry)
    ? (authorData as AuthorEntry[])
    : null;
</script>

<header
  class="layout-xl justify-between items-start"
  data-sveltekit-noscroll
  data-sveltekit-preload-code="eager"
>
  <div class="header-inner mb-8">
    <h1 class="title-font font-bold text-black text-3xl mb-4 leading-tight">
      {$page.data.header?.title ??
        "IsoCompute Playbook: Optimally Scaling Sampling Compute for RL Training of LLMs"}
    </h1>

    <div class="meta text-black">
      <div class="authors">
        {#if authorList}
          {#each authorList as author, i (i)}
            <span class="author">
              <span class="author-name">{author.name}</span>
              {#if author.affils}
                <sup class="affil-sup">
                  {#each author.affils as key, j (j)}
                    {#if logoMap[key]}
                      <img
                        src={logoMap[key].src}
                        alt={logoMap[key].alt}
                        title={logoMap[key].alt}
                      class={`affil-logo ${key === "mbzuai" ? "affil-logo--mbzuai" : ""} ${key === "cmu" ? "affil-logo--cmu" : ""}`}
                        loading="lazy"
                        decoding="async"
                      />
                    {:else}
                      <span class="affil-fallback">{key}</span>
                    {/if}
                  {/each}
                </sup>
              {/if}
            </span>
          {/each}
        {:else}
          {$page.data.header?.authors ?? "__AUTHORS__"}
        {/if}
      </div>

      <div class="affiliations">
        {#if Array.isArray($page.data.header?.affiliations)}
          {#each $page.data.header.affiliations as line, i (i)}
            <div class="affiliation-line">
              {#if affiliationLogoMap[line]}
                <img
                  src={affiliationLogoMap[line].src}
                  alt={affiliationLogoMap[line].alt}
                  title={affiliationLogoMap[line].alt}
                  class="affil-logo affil-logo--legend"
                  loading="lazy"
                  decoding="async"
                />
              {/if}
              <span>{line}</span>
            </div>
          {/each}
        {:else}
          {$page.data.header?.affiliations ?? "__AFFILIATIONS__"}
        {/if}
      </div>

      <div class="date">
        {$page.data.header?.date ?? "__DATE__"}
      </div>
    </div>
  </div>
</header>

<style lang="postcss">
  /* Keep the header aligned with the same main-text column width used by Markdown.svelte. */
  .header-inner {
    max-width: var(--md-main-col, 760px);
    margin-left: auto;
    margin-right: auto;
  }


  .title-font {
    font-family: "Iowan Old Style BT", "Iowan Old Style", "Palatino Linotype", Palatino, serif;
  }

  .meta {
    font-size: 16px;
    line-height: 1.55;
  }

  .authors {
    font-size: 16px;
    line-height: 2.0;
    text-align: center;
  }

  .author {
    display: inline-flex;
    align-items: baseline;
    gap: 1px;
    margin-right: 8px;
    margin-bottom: 4px;
    white-space: nowrap;
  }

  .author-name {
    line-height: 1.4;
  }

  .affil-sup {
    display: inline-flex;
    align-items: flex-start;
    gap: 0px;
    margin-left: 0px;
  }

  .affil-sup .affil-logo {
    margin-left: 0px;
  }

  .affil-logo {
    height: 16px;
    width: auto;
    vertical-align: middle;
    margin-left: 1px;
  }

  .affil-logo--mbzuai {
    height: 20px;
  }

  .affil-logo--cmu {
    height: 23px;
  }

  .affil-logo--legend {
    height: 22px;
    margin-right: 8px;
  }

  .affil-fallback {
    font-size: 12px;
    color: #6b7280;
    margin-left: 4px;
  }

  .affiliations {
    margin-top: 10px; /* visual separation from authors */
    color: #111827;
    opacity: 0.9;
    text-align: center;
  }

  .affiliation-line {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    justify-content: center;
    width: 100%;
  }

  .affiliation-line {
    margin-top: 2px;
  }

  .date {
    margin-top: 10px;
    color: #111827;
    opacity: 0.9;
  }

  @media (max-width: 580px) {
    .meta {
      font-size: 15px;
    }
  }
</style>
