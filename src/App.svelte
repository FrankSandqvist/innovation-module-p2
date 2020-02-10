<script>
  import { onMount } from "svelte";
  import { flip } from "svelte/animate";

  import Post from "./Post.svelte";
  import Camera from "./Camera.svelte";
  import Spacer from "./Spacer.svelte";
  import Logo from "./Logo.svelte";
  import Footer from "./Footer.svelte";

  import LocalDatabase from "../utils/database";

  // Let's create a local database. In real life we would talk to a
  // database on a server somewhere, so multiple people can access
  // the data, but let's keep it local for this app
  let db = new LocalDatabase();

  // Let's bring in all the stored posts.
  let posts = db.getAllPosts();

  function refreshPosts() {
    // This function synchronizes the local "posts" variable with the
    // database
    posts = db.getAllPosts();
  }

  function addPost(event) {
    // Getting the raw photo data from the event that was dispatched
    // from the Camera component
    let photoData = event.detail.photoData;

    // Constructing the new post object
    let newPost = {
      photoData,
      liked: false
    };

    // Saving the new post to the database
    db.createPost(newPost);

    refreshPosts();
  }

  function handleLike(id) {
    // Finding the index (location in the array) of the post we would
    // like to like.
    let index = posts.findIndex(p => p.id === id);

    // Getting it from the array
    let postToUpdate = posts[index];

    // Updating the "liked" property of the posts object
    postToUpdate.liked = !postToUpdate.liked;

    // Let's update the post in the database
    db.updatePost(id, postToUpdate);

    refreshPosts();
  }

  function handleDelete(id) {
    // Delete the post of this particular id from the db
    db.deletePost(id);

    refreshPosts();
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
  <p>
    This is what we will be making.
    <br />
    To get started, folders "src" -> "completed" and "exercise" -> "src".
  </p>
  <Camera on:photo={addPost} />
  <Spacer />
  {#each posts as post (post.id)}
    <div animate:flip={{ duration: 500 }}>
      <Post
        photoData={post.photoData}
        liked={post.liked}
        on:like={() => handleLike(post.id)}
        on:delete={() => handleDelete(post.id)} />
    </div>
  {/each}
  <Footer coder="..." />
</main>
