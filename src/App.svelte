<script>
  import { crossfade } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { flip } from "svelte/animate";
  import Post from "./Post.svelte";
  import Camera from "./Camera.svelte";
  import Spacer from "./Spacer.svelte";
  import Logo from "./Logo.svelte";
  import Footer from "./Footer.svelte";

  let posts = [];

  function addPost(photo) {
    let id = Math.random()
      .toString(16)
      .substring(2);

    let newPost = {
      data: photo.detail.data,
      id,
      liked: false
    };
    posts = [newPost, ...posts];
  }

  const [send, receive] = crossfade({
    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;

      return {
        duration: 600,
        easing: quintOut,
        css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
      };
    }
  });

  function handleLike(id) {
    let index = posts.findIndex(p => p.id === id);
    posts[index].liked = !posts[index].liked;
  }

  function handleDelete(id) {
    posts = posts.filter(p => p.id !== id);
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
  <Spacer />
  <Camera on:photo={addPost} />
  <Spacer />
  {#each posts as post (post.id)}
    <div
      in:receive={{ key: post.id }}
      out:send={{ key: post.id }}
      animate:flip={{ duration: 500 }}>
      <Post
        imageData={post.data}
        id={post.id}
        liked={post.liked}
        on:like={() => handleLike(post.id)}
        on:delete={() => handleDelete(post.id)} />
    </div>
  {/each}
  <Footer />
</main>
