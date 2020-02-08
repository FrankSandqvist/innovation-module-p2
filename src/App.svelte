<script>
  import Button from "./Button.svelte";
  import TakePhoto from "./TakePhoto.svelte";
</script>

<style>
  body {
    font-family: sans-serif;
  }
  .wrapper {
    width: 30rem;
    margin-left: auto;
    margin-right: auto;
  }
</style>

<main class="wrapper">
  <TakePhoto />
  <h1>Hello CodeSandbox</h1>
  <h2>Start editing to see some magic happen!</h2>
  <Button />
</main>
