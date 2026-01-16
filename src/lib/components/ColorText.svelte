<script lang="ts">
  export type NotionColor = 
    | "gray" | "brown" | "orange" | "yellow" 
    | "green" | "blue" | "purple" | "pink" | "red";
  
  export let color: NotionColor = "gray";
  export let html: string; // already-marked HTML

  // Notion's default text colors
  const colors: Record<NotionColor, string> = {
    gray: "#9B9A97",
    brown: "#64473A",
    orange: "#D9730D",
    yellow: "#DFAB01",
    green: "#0F7B6C",
    blue: "#0B6E99",
    purple: "#6940A5",
    pink: "#AD1A72",
    red: "#E03E3D",
  };

  $: textColor = colors[color] ?? colors.gray;
</script>

<span style="color: {textColor};" class="notion-color-text">
  {@html html}
</span>

<style>
  .notion-color-text {
    display: inline;
  }
</style>
