<script lang="ts">
  import { page } from "$app/stores";

  const links = [
    // { name: "projects", href: "/projects" },
    { name: "Notes", href: "/notes" },
    // { name: "resume", href: "/resume" },
  ];

  let pageTitle: string | null = null;
  $: {
    const link = links.find(({ href }) => href === $page.url.pathname);
    if (link) {
      pageTitle = link.name.charAt(0).toUpperCase() + link.name.slice(1);
    } else {
      pageTitle = null;
    }
  }
</script>

<header
  class="layout-md justify-between items-start"
  data-sveltekit-noscroll
  data-sveltekit-preload-code="eager"
>
  <div class="mb-8">
    <h1 class="font-bold text-black text-3xl mb-4">
      IsoFLOPs Playbook: Workflows for Scaling Sampling FLOPs for RL Training of LLMs
    </h1>
    <p class="text-black text-lg">
      __AUTHORS__
      <br>
      __AFFILIATIONS__
      <br>
      __DATE__
    </p>
  </div>
  <!-- <nav>
    {#each links as link (link)}
      <a
        href={link.href}
        class="hover:text-black transition-colors"
        class:text-black={$page.url.pathname === link.href}
      >
        {link.name}
      </a>
    {/each}
  </nav> -->
</header>

<style lang="postcss">
  nav {
    @apply flex items-start text-neutral-500 justify-end space-x-6 text-lg py-0.5;
  }

  .page-title {
    @apply font-light;
  }

  @media (max-width: 580px) {
    .page-title {
      @apply block text-xl;
    }

    .page-title :first-child {
      @apply hidden;
    }
  }

  @media (max-width: 420px) {
    nav {
      @apply flex-col items-end space-x-0;
    }
  }
</style>
