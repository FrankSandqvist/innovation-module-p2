<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let videoElement = null,
    canvasElement = null,
    videoOK = false,
    width = null,
    height = null,
    mode = 1;

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function(s) {
        videoOK = true;
        videoElement.srcObject = s;
        height = s.getVideoTracks()[0].getSettings().height;
        width = s.getVideoTracks()[0].getSettings().width;
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  function startCountdown() {
    if (mode === 1) {
      mode = 2;
      setTimeout(function() {
        mode = 3;
        snap();
        setTimeout(function() {
          mode = 1;
        }, 1000);
      }, 1500);
    }
  }

  function snap() {
    let ctx = canvasElement.getContext("2d");
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    ctx.drawImage(videoElement, 0, 0, width, height);
    dispatch("photo", {
      data: canvasElement.toDataURL()
    });
  }
</script>

<style>
  .shutter {
    width: 7rem;
    height: 7rem;
    background: white;
    border-radius: 49.9%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    transform: translate3d(0, 0, 0);
    place-self: center;
    border: 2px solid white;
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
  .message {
    color: white;
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
    animation: appear 1s;
    animation-fill-mode: forwards;
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

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

<div class="shutter" on:click={startCountdown}>
  {#if mode === 1}
    <div class="overlay">📷</div>
  {:else if mode === 3}
    <div class="flash" />
  {/if}
  <video autoplay playsinline muted bind:this={videoElement} />
</div>
{#if !videoOK}
  <p class="message">
    Please allow camera access. If you weren't asked to allow it, please try a
    different browser.
  </p>
{/if}

<canvas {width} {height} bind:this={canvasElement} />
