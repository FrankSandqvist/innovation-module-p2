<script>
  import { crossfade } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { flip } from "svelte/animate";
  import Post from "./Post.svelte";
  import TakePhoto from "./TakePhoto.svelte";

  let posts = [];

  function addPost(photo) {
    let newPost = {
      data: photo.detail.data,
      id: posts.length,
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
    console.log(id);
    let index = posts.findIndex(p => p.id === id);
    posts[index] = { ...posts[index], liked: !posts[index].liked };
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
    <div
      in:receive={{ key: post.id }}
      out:send={{ key: post.id }}
      animate:flip={{ duration: 500 }}>
      <Post
        imageData={post.data}
        id={post.id}
        liked={post.liked}
        on:like={() => handleLike(post.id)} />
    </div>
  {/each}
</main>
