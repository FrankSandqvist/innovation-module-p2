<script>
  export let imageData;
</script>

<style>
  .card {
    width: 100%;
	max-height: 30rem;
	height: 100vw;
    box-shadow: rgba(0, 0, 0, 0.2) 0rem 1rem 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    background-color: white;
    overflow: hidden;
    background-size: cover;
    background-position: center;
  }
</style>

<div class="card" style="background-image: url('{imageData}')" />
