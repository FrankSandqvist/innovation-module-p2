<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let video = null;
  let canvas = null;
  let width = null;
  let height = null;

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function(s) {
        video.srcObject = s;
        height = s.getVideoTracks()[0].getSettings().height;
        width = s.getVideoTracks()[0].getSettings().width;
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  function snap() {
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, width, height);
    dispatch("photo", {
      data: canvas.toDataURL()
    });
  }
</script>

<style>
  button {
    font-size: 2rem;
  }
  video {
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.0001;
    pointer-events: none;
  }
  canvas {
    background-color: #666;
    display: none;
  }
</style>

<button on:click={snap}>TAKE PHOTO!</button>
<video bind:this={video} autoplay playsinline muted />
<canvas {width} {height} bind:this={canvas} />
