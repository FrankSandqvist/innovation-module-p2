<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let video = null;
  let canvas = null;
  let width = null;
  let height = null;

  let mode = 1;

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
    mode = 2;
    setTimeout(function() {
      mode = 3;
      snap();
      setTimeout(function() {
        mode = 1;
      });
    }, 1500);
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
    width: 7rem;
    height: 7rem;
    background: white;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
	transform: translate3d(0, 0, 0);
	place-self: center;
  }
  video {
    position: absolute;
    left: -75%;
    top: -75%;
    transform: translateX(37.5%) translateY(37.5%);
    width: 150%;
    height: 150%;
  }
  canvas {
    background-color: #666;
    display: none;
  }
  .overlay {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 100;
    font-size: 2rem;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .flash {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: white;
    animation: flash 0.5s;
    animation-fill-mode: forwards;
  }

  @keyframes flash {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>

<div class="shutter" on:click={startCountdown}>
{#if mode === 1}
  <div class="overlay">📷</div>
  {:else if mode === 3}
  <div class="flash" />
  {/if}
  <video bind:this={video} autoplay playsinline muted />
</div>

<canvas {width} {height} bind:this={canvas} />
