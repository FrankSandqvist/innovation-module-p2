<script>
  export let imageData;
</script>

<style>
  .card {
    width: 100%;
    height: 30rem;
    box-shadow: rgba(0, 0, 0, 0.2) 0rem 1rem 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    background-color: white;
    overflow: hidden;
    background-size: cover;
    animation: appear 0.5s;
    background-position: center;
  }
  @keyframes appear {
    from {
      transform: translateY(-100%) scale(0);
    }
    to {
      transform: translateY(0rem) scale(1);
    }
  }
</style>

<div class="card" style="background-image: url('{imageData}')" />
