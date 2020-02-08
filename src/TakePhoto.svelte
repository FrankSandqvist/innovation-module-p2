<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let video = null;
  let canvas = null;

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function(s) {
        video.srcObject = s;
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  function snap() {
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, 300, 200);
    dispatch("photo", {
      data: canvas.toDataURL()
    });
  }
</script>

<style>
  .video {
    position: fixed;
    top: 0;
    left: 0;
	opacity: 0.0001;
	pointer-events: none;
  }
  .photo {
    background-color: #666;
  }
</style>

<button on:click={snap}>Test</button>
<video class="video" bind:this={video} autoplay playsinline muted />
<canvas class="photo" width="300px" height="200px" bind:this={canvas} />
