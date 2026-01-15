<script lang="ts">
  export type CalloutVariant = "note" | "tip" | "warning" | "info";
  export let html: string; // already-marked HTML
  export let title: string = "Callout";
  export let variant: CalloutVariant = "note";

  const styles: Record<CalloutVariant, { wrap: string; badge: string; label: string }> = {
    note: {
      wrap: "bg-slate-50 hover:bg-slate-100/60 border-slate-600",
      badge: "text-slate-700",
      label: "Note",
    },
    info: {
      wrap: "bg-sky-50 hover:bg-sky-100/60 border-sky-700",
      badge: "text-sky-800",
      label: "Info",
    },
    tip: {
      wrap: "bg-emerald-50 hover:bg-emerald-100/60 border-emerald-700",
      badge: "text-emerald-800",
      label: "Tip",
    },
    warning: {
      wrap: "bg-amber-50 hover:bg-amber-100/60 border-amber-700",
      badge: "text-amber-800",
      label: "Warning",
    },
  };

  $: meta = styles[variant] ?? styles.note;
</script>

<div class={`my-4 rounded p-4 pb-1 border-l-4 transition ${meta.wrap}`}>
  {#if title}
    <div class={`text-xs font-semibold tracking-wide uppercase ${meta.badge}`}>
      {meta.label}: {title}
    </div>
  {/if}
  <div class="prose max-w-none" class:mt-1={title}>
    <div class="md-output">{@html html}</div>
  </div>
</div>

