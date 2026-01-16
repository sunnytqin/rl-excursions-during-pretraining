<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  /** The element whose scroll progress we track (e.g. "#article .md-output") */
  export let containerSelector = '.md-output';
  /** Which headings become ticks */
  export let headingsSelector = 'h2, h3';

  type Heading = { id: string; level: 2 | 3; top: number; label: string };

  let headings: Heading[] = [];
  let visibleHeadings: Heading[] = [];
  let showAll = true;
  let visibleIdSet: Set<string> | null = null;
  let active_index = -1;
  let container_el: HTMLElement | null = null;
  let ready = false;
  let raf_id: number;
  let hydrated = false;
  let isHovering = false;

  function doc_y(el: Element) {
    const r = el.getBoundingClientRect();
    return (browser ? window.scrollY : 0) + r.top;
  }

  function should_include_heading(h: HTMLElement) {
    if (h.hasAttribute('data-skip-meter')) return false;
    if (h.getAttribute('data-meter') === 'false') return false;
    if (h.classList.contains('no-meter')) return false;
    return true;
  }

  function sanitizeHeadingLabel(text: string) {
    let out = text || '';
    // Collapse inline math: $...$ -> ...
    out = out.replace(/\$([^$]+)\$/g, (_m, inner) => inner);
    // Strip remaining math delimiters
    out = out.replace(/\$\$/g, '');
    // Simplify common LaTeX macros for readability
    out = out.replace(/\\text\{([^}]+)\}/g, '$1');
    out = out.replace(/\\mathrm\{([^}]+)\}/g, '$1');
    out = out.replace(/\\mathbf\{([^}]+)\}/g, '$1');
    out = out.replace(/\\mathit\{([^}]+)\}/g, '$1');
    out = out.replace(/\\mathcal\{([^}]+)\}/g, '$1');
    // Simplify subscripts/superscripts with braces: _{x} -> _x, ^{x} -> ^x
    out = out.replace(/_\{([^}]+)\}/g, '_$1');
    out = out.replace(/\^\{([^}]+)\}/g, '^$1');
    // Remove remaining backslashes used for LaTeX commands
    out = out.replace(/\\/g, '');
    // Normalize whitespace
    out = out.replace(/\s+/g, ' ').trim();
    return out;
  }

  function recompute() {
    if (!browser) return;
    container_el = document.querySelector(containerSelector) as HTMLElement | null;

    const nodes = container_el
      ? container_el.querySelectorAll(headingsSelector)
      : document.querySelectorAll(headingsSelector);

    headings = Array.from(nodes)
      .filter((el) => should_include_heading(el as HTMLElement))
      .map((el) => {
        const h = el as HTMLElement;
        if (!h.id) {
          // Fallback: generate a readable id from text content
          h.id = (h.textContent || '')
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        }
        return {
          id: h.id,
          level: h.tagName === 'H2' ? 2 : 3,
          top: doc_y(h),
          label: sanitizeHeadingLabel(h.textContent || '')
        };
      });

    visibleHeadings = headings;
    showAll = true;
    visibleIdSet = null;
    updateLabelWidth();
    update_progress();
  }

  function update_progress() {
    if (!browser) return;
    const y = window.scrollY + 8;
    let idx = -1;
    for (let i = 0; i < headings.length; i++) {
      if (headings[i].top <= y) idx = i;
      else break;
    }
    active_index = idx;

    const h2Indices = headings
      .map((h, i) => (h.level === 2 ? i : -1))
      .filter((i) => i !== -1) as number[];
    const firstH2Top =
      h2Indices.length > 0 ? headings[h2Indices[0]].top : null;
    const beforeFirstH2 =
      firstH2Top === null ? true : y < firstH2Top - 20;

    if (isHovering || beforeFirstH2) {
      showAll = true;
      visibleIdSet = null;
      return;
    }

    showAll = false;
    // Show current H2 and its H3s only
    let currentH2Index = -1;
    for (let i = h2Indices.length - 1; i >= 0; i--) {
      if (headings[h2Indices[i]].top <= y) {
        currentH2Index = h2Indices[i];
        break;
      }
    }

    if (currentH2Index === -1) {
      visibleIdSet = new Set();
      return;
    }

    const nextH2Index =
      h2Indices.find((i) => i > currentH2Index) ?? headings.length;
    const range = headings.slice(currentH2Index, nextH2Index);
    visibleIdSet = new Set(range.map((h) => h.id));
  }

  // list layout uses natural flow; no per-item positioning needed

  function updateLabelWidth() {
    if (!meterEl) return;
    // Prefer the main content container for accurate left margin
    const contentEl =
      (container_el?.closest(".layout-md") as HTMLElement | null) || container_el;
    if (!contentEl) return;
    const rect = contentEl.getBoundingClientRect();
    const leftMargin = Math.max(rect.left, 0);
    // Max label width is 2/3 of left margin
    const maxWidth = Math.max(180, Math.floor((leftMargin * 2) / 3));
    meterEl.style.setProperty("--toc-max-width", `${maxWidth}px`);
  }

  let onScroll: () => void;
  let onResize: () => void;
  let ro: ResizeObserver | null = null;
  let meterEl: HTMLDivElement | null = null;

  onMount(() => {
    hydrated = true;
    raf_id = requestAnimationFrame(() => {
      recompute();
      update_progress();
      ready = true;
    });
    onScroll = () => update_progress();
    onResize = () => recompute();

    if (browser) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);

      if (containerSelector) {
        const c = document.querySelector(containerSelector);
        if (c) {
          ro = new ResizeObserver(() => recompute());
          ro.observe(c);
        }
      }

      // Initialize label width once layout is ready
      setTimeout(() => updateLabelWidth(), 100);
    }
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    }
    if (ro) ro.disconnect();
    if (raf_id) cancelAnimationFrame(raf_id);
  });
</script>

<!--
  Fixed, full-height bar on the extreme left (fills viewport regardless of layout).
  The gradient is fixed over the full bar; we reveal it via clip-path based on `progress`.
  Ticks are horizontal lines that start at the very left edge and extend into the page,
  and on hover they show the heading label to the right.
-->
<nav
  class="toc"
  bind:this={meterEl}
  aria-hidden="true"
  class:ready={ready}
  class:in-body={!showAll}
  on:mouseenter={() => {
    isHovering = true;
    update_progress();
  }}
  on:mouseleave={() => {
    isHovering = false;
    update_progress();
  }}
>
  {#if hydrated}
    {#each visibleHeadings as h, i}
      <a
        href={`#${h.id}`}
        class={`toc-item ${h.level === 3 ? 'sub' : ''} ${i === active_index ? 'active' : ''} ${!showAll && visibleIdSet && !visibleIdSet.has(h.id) ? 'hidden' : ''}`}
      >
        {h.label}
      </a>
    {/each}
  {/if}
</nav>

<style>
  :root {
    --toc-max-width: 280px;
  }

  .toc {
    position: fixed;
    left: 28px;
    top: 120px;
    width: var(--toc-max-width, 280px);
    max-height: calc(100vh - 160px);
    overflow: auto;
    padding-right: 8px;
    z-index: 50;
    opacity: 0;
    transition: opacity 400ms ease;
  }

  .toc.ready {
    opacity: 1;
  }

  .toc-item {
    display: block;
    color: #6b7280;
    font-size: 14px;
    line-height: 1.6;
    text-decoration: none;
    margin: 6px 0; /* fixed spacing between all items */
  }

  .toc-item:hover {
    color: #111827;
  }

  .toc-item.active {
    color: #111827;
    font-weight: 600;
  }

  /* In body view, keep active items the same color (no black) */
  .toc.in-body .toc-item.active {
    color: #6b7280;
  }

  .toc.in-body .toc-item.active.sub {
    color: #9ca3af;
  }

  .toc-item.sub {
    margin-left: 14px;
    color: #9ca3af;
    font-size: 13px;
  }

  .toc-item.hidden {
    visibility: hidden; /* keep spacing but hide text */
    pointer-events: none;
  }

  @media (max-width: 1024px) {
    .toc {
      display: none; /* hide on small screens */
    }
  }
</style>
