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
    /*display: none;*/
  }
  .photo {
    background-color: #666;
  }
</style>

<button on:click={snap}>Test</button>
<video class="video" autoplay bind:this={video} />
<canvas class="photo" width="300px" height="200px" bind:this={canvas} />
