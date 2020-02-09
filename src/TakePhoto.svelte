<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let video = null;
  let canvas = null;
  let width = null;
  let height = null;

  let countdown = null;

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

  function startCountdown() {
    countdown = 3;
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
  .shutter {
    width: 5rem;
    height: 5rem;
    background: white;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    position: relative;
    overflow: hidden;
  }
  video {
    position: absolute;
    left: -2.5rem;
    top: -2.5rem;
    transform: translateX(2.5rem) translateY(2.5rem);
    min-width: 100%;
    max-height: 100%;
  }
  canvas {
    background-color: #666;
    display: none;
  }
</style>

<div class="shutter" on:click={startCountdown}>
  📷
  <video bind:this={video} autoplay playsinline muted />
</div>

<canvas {width} {height} bind:this={canvas} />
