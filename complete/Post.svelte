<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function handleLike() {
    dispatch("like", {});
  }

  function handleDelete() {
    dispatch("delete", {});
  }

  export let photoData;
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
    position: relative;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .like-button {
    font-size: 3rem;
    position: absolute;
    cursor: pointer;
    right: 2rem;
    bottom: 2rem;
  }
  .delete-button {
    font-size: 1.5rem;
    position: absolute;
    cursor: pointer;
    left: 2rem;
    top: 2rem;
  }
</style>

<div
  class="card"
  style="background-image: url('{photoData}')"
  on:dblclick={handleLike}>
  <div on:click={handleDelete} class="delete-button">✕</div>
  <div on:click={handleLike} class="like-button">{liked ? '♥' : '♡'}</div>
</div>
