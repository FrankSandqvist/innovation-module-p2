<script>
  import Button from "./Button.svelte";
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
  body {
    font-family: sans-serif;
  }
  .wrapper {
    width: 30rem;
    margin-left: auto;
    margin-right: auto;
  }
</style>

<main class="wrapper">
  <TakePhoto on:photo={addPost} />
  <h1>Hello CodeSandbox</h1>
  <h2>Start editing to see some magic happen!</h2>
  {#each posts as post}
    <Post imageData={post.data} />
  {/each}
  <Button />
</main>
