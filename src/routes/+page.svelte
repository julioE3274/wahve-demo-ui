<script>
  import { getScore } from "$lib/api";
  import TraitRanker from "./TraitRanker.svelte";

  /**
   * @param {any[]} arr
   */
  function shuffleArray(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  /**
   * @type {any[]}
   */
  let ranking = [];
  let submitting = false;
  /**
   * @type {number | null}
   */
  let score = null;
  const traits = ["Adaptability", "Empathy", "Harmony", "Discipline", "Focus"];
  const jobRanking = shuffleArray(traits);

  /**
   * @param {any[]} updated
   */
  function handleRankChange(updated) {
    ranking = updated;
    score = null;
  }

  async function submit() {
    submitting = true;
    const data = await getScore(jobRanking, ranking);
    score = data;
    submitting = false;
  }
</script>

<section class="h-screen flex flex-col justify-between">
  <div>
    <h1 class="text-2xl font-bold mb-6 mx-2">Trait Ranking Demo</h1>

    <p class="mx-7">
      Sort these traits, with the top one being the most important.
    </p>
    <div class="w-[40%] min-w-[300px]">
      <TraitRanker onRankChange={handleRankChange} {traits} />
    </div>

    <div class="flex justify-end mx-9">
      <button
        onclick={submit}
        class="bg-blue-700 text-white px-4 py-2 rounded-full active:bg-blue-600"
        >Submit</button
      >
    </div>

    <div class="mt-6 p-4 bg-gray-100 rounded">
      <h2 class="font-semibold flex-row flex align-middle items-center">
        Ranked values:
        {#if submitting}
          <div
            class="ml-3 w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"
          ></div>
        {/if}
      </h2>
      <p>{ranking.join(" → ")}</p>
      {#if score !== undefined && score !== null && typeof score === "number"}
        <p class="text-[20px] font-bold">Scored: {score}</p>
      {/if}
    </div>
  </div>

  <div class="flex flex-row justify-end">
    <div class="px-4 text-white hover:bg-gray-100 hover:text-black rounded">
      <h2 class="font-semibold">Manager expectations:</h2>
      <p>{jobRanking.join(" → ")}</p>
    </div>
  </div>
</section>
