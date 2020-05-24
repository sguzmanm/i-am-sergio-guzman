<template>
  <div class="spinner"></div>
</template>

<script>
export default {
  name: 'ImageSpinner',
};
</script>

<style>
/* Taken from https://loading.io/css/ */

.spinner {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.spinner:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid var(--text-color);
  border-color: var(--text-color) transparent var(--text-color) transparent;
  animation: spinner 1.2s linear infinite;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
