<script lang="ts">
  import { page } from "$app/stores";
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
        {$page.data.header?.authors ?? "__AUTHORS__"}
      </div>

      <div class="affiliations">
        {#if Array.isArray($page.data.header?.affiliations)}
          {#each $page.data.header.affiliations as line, i (i)}
            <div class="affiliation-line">{line}</div>
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
  }

  .affiliations {
    margin-top: 10px; /* visual separation from authors */
    color: #111827;
    opacity: 0.9;
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
