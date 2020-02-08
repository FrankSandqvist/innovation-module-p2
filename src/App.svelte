<script>
  import Post from "./Post.svelte";
  import TakePhoto from "./TakePhoto.svelte";

  let posts = [];

  function addPost(photo) {
    let newPost = {
      data: photo.detail.data,
      id: posts.length
    };
    posts = [newPost, ...posts];
  }
</script>

<style>
  .wrapper {
    width: 100%;
    max-width: 30rem;
    margin-left: auto;
    margin-right: auto;
  }
</style>

<main class="wrapper">
  <TakePhoto on:photo={addPost} />
  {#each posts as post (post.id)}
    <Post imageData={post.data} id={post.id}/>
  {/each}
</main>
