<script>
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";

  /**
   * @type {(ranking: string[]) => void}
   */
  export let onRankChange = () => {};
  /**
   * @type {string[]}
   */
  export let traits = [];
  /**
     * @type {{ id: number; name: string }[]}
     */
  let items = [];

  $: items = traits.map((item, i) => ({ id: i, name: item }));

  const flipDurationMs = 300;
  $: onRankChange(items.map((item) => item.name));

  function handleDndConsider(e) {
    items = e.detail.items;
  }

  function handleDndFinalize(e) {
    items = e.detail.items;
    onRankChange(items.map((item) => item.name));
  }
</script>

<section
  class="overflow-auto p-5"
  use:dndzone={{ items, flipDurationMs }}
  on:consider={handleDndConsider}
  on:finalize={handleDndFinalize}
>
  {#each items as item (item.id)}
    <div
      class="border border-blue-300 p-2 m-2 bg-white"
      animate:flip={{ duration: flipDurationMs }}
    >
      {item.name}
    </div>
  {/each}
</section>
