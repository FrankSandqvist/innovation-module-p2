<script>
  import Post from "./Post.svelte";
  import TakePhoto from "./TakePhoto.svelte";

  let posts = [];

  function addPost(photo) {
    let newPost = {
      data: photo.detail.data
    };
    posts = [newPost, ...posts];
  }
</script>

<style>
  .wrapper {
    width: 30rem;
    margin-left: auto;
    margin-right: auto;
  }
</style>

<main class="wrapper">
  <TakePhoto on:photo={addPost} />
  {#each posts as post}
    <Post imageData={post.data} />
  {/each}
</main>
