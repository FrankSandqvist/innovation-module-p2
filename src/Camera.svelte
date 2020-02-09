<script>
  import { getCamera, takePhoto } from "../utils/camera";
  import { createEventDispatcher } from "svelte";
  let dispatch = createEventDispatcher();

  let videoElement = null,
    canvasElement = null,
    camera = null,
    mode = 1;

  /*if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function(s) {
        cameraOK = true;
        videoElement.srcObject = s;
        let trackWidth = s.getVideoTracks()[0].getSettings().width,
          trackHeight = s.getVideoTracks()[0].getSettings().height;
        let scale = trackWidth > MAX_WIDTH ? MAX_WIDTH / trackWidth : 1;
        width = trackWidth * scale;
        height = trackHeight * scale;
      })
      .catch(function(err) {
        console.log(err);
      });
  }*/
  getCamera.then(c => {
    camera = c;
  });

  $: if (camera) {
    videoElement.srcObject = camera.stream;
  }

  function handleClick() {
    if (camera && mode === 1) {
      mode = 2;

      setTimeout(snapPhoto, 1500);
    }
  }

  function snapPhoto() {
    mode = 3;

    let photoData = takePhoto(videoElement, camera);
    dispatch("photo", { photoData });

    setTimeout(reset, 1000);
  }

  function reset() {
    mode = 1;
  }
</script>

<style>
  .camera {
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
    cursor: pointer;
  }
  video {
    position: absolute;
    left: -10%;
    top: -10%;
    width: 120%;
    height: 120%;
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
    background-color: rgba(255, 255, 255, 0.8);
    animation: appear 2s;
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
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>

<div class="camera" on:click={handleClick}>
  {#if mode === 1}
    <div class="overlay">📷</div>
  {:else if mode === 3}
    <div class="flash" />
  {/if}
  <video autoplay playsinline muted bind:this={videoElement} />
</div>
{#if !camera}
  <p class="message">
    Please allow camera access. If you weren't asked, please try a different
    browser.
  </p>
{/if}
