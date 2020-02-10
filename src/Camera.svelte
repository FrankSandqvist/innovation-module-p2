<script>
  import { getCamera, takePhoto } from "../utils/camera";
  import { createEventDispatcher } from "svelte";
  let dispatch = createEventDispatcher();

  // We don't have to write "let" more than once when declaring
  // multiple variables in a row.
  let videoElement = null,
    camera = null, // our camera object
    mode = 1; // 1 = ready, 2 = countdown, 3 = flash!

  // The imported variable "getCamera" is what's called a Promise.
  // We won't go into details for now, but a Promise allows code to
  // be executed in the background. Promises have a function called
  // "then", which in turn takes another function as its argument.
  // This function is called when "getCamera" is done.
  getCamera.then(function(c) {
    camera = c;
  });

  // Svelte has a special feature, that allows you to write "$:"
  // before a line to make it react to changes. So with this, every
  // time "camera" changes, this if statement is executed.
  $: if (camera) {
    // Putting the camera's video stream into the video element
    videoElement.srcObject = camera.stream;
  }

  function handleClick() {
    // Only do something if we have a camera & the mode is 1 (ready).
    if (camera && mode === 1) {
      // Set the mode to 2 (countdown)
      mode = 2;

      // Call the "snapPhoto" function in 1500ms.
      setTimeout(snapPhoto, 1500);
    }
  }

  function snapPhoto() {
    // Set the mode to FLASH! (3)
    mode = 3;

    // Let's get the raw photo data using the "takePhoto" function.
    // It takes the videoElement, and the camera object. Let's store
    // the data in the "photoData" variable.
    let photoData = takePhoto(videoElement, camera);

    // Now we can dispatch the data up the stream for the App
    // component to handle the new photo.
    dispatch("photo", { photoData });

    // Call the reset function in 1000ms.
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
    left: -40%;
    top: -40%;
    width: 180%;
    height: 180%;
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
