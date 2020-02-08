<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function handleLike() {
    dispatch("like", {});
  }

  export let id;
  export let imageData;
  export let liked;
</script>

<style>
  .card {
    width: 100%;
    max-height: 30rem;
    height: 100vw;
    box-shadow: rgba(0, 0, 0, 0.2) 0rem 1rem 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    background-color: white;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    color: white;
    font-size: 3rem;
    padding-bottom: 1rem;
    padding-right: 1.5rem;
  }
  .heart {
    transition: 0.2s;
  }
</style>

<div
  class="card"
  style="background-image: url('{imageData}')"
  on:click={handleLike}>
  <div class="heart" style="transform: scale({liked ? 1 : 0})">❤</div>
</div>
