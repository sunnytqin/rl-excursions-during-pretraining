<script lang="ts">
  export let title: string = "Details";
  export let open: boolean = false;
  export let html: string; // already-marked HTML
</script>

<details class="my-4 rounded border border-neutral-200 bg-white" open={open}>
  <summary class="cursor-pointer select-none px-4 py-3 font-semibold text-neutral-900 hover:bg-neutral-50">
    {title}
  </summary>
  <div class="px-4 pb-3 pt-2">
    <div class="md-output">{@html html}</div>
  </div>
</details>

