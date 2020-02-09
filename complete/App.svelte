<script>
  import { onMount } from "svelte";
  import Post from "./Post.svelte";
  import Camera from "./Camera.svelte";
  import Spacer from "./Spacer.svelte";
  import Logo from "./Logo.svelte";
  import Footer from "./Footer.svelte";
  import FakeDatabase from "../utils/database";
  import { flip } from "svelte/animate";

  let db = new FakeDatabase();
  let posts = db.getAllPosts();

  function addPost(event) {
    let photoData = event.detail.photoData;
    let newPost = {
      photoData,
      liked: false
    };
    db.createPost(newPost);
    posts = db.getAllPosts();
  }

  function handleLike(id) {
    let index = posts.findIndex(p => p.id === id);
    let postToUpdate = posts[index];
    postToUpdate.liked = !postToUpdate.liked;
    db.updatePost(id, postToUpdate);
    posts = db.getAllPosts();
  }

  function handleDelete(id) {
    db.deletePost(id);
    posts = db.getAllPosts();
  }
</script>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    max-width: 30rem;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
</style>

<main class="wrapper">
  <Logo />
  <Camera on:photo={addPost} />
  <Spacer />
  {#each posts as post (post.id)}
    <div animate:flip={{ duration: 500 }}>
      <Post
        photoData={post.photoData}
        id={post.id}
        liked={post.liked}
        on:like={() => handleLike(post.id)}
        on:delete={() => handleDelete(post.id)} />
    </div>
  {/each}
  <Footer coder="..." />
</main>
