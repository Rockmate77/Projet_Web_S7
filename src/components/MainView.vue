<script setup>
import Clickframe from "@/App.vue";
</script>

<template>
  <div class="curtain"></div>
  <div class="main_content">
    <Clickframe></Clickframe>
  </div>
</template>

<style>
body {
  margin: 0;
  overflow: hidden;
  position: relative;
}

.curtain {
  position: absolute;
  top: 0;
  left: 0; /* Adjusted left position to start from the left edge */
  width: 100%; /* Set initial width to 100% */
  height: 100%;
  background: var(--color-background); /* Red color for the curtains */
  animation: openCurtains 4s ease-in-out forwards;
  z-index: 2; /* Place the curtains above other content */
  transform-origin: left top; /* Adjusted transform-origin */
}

.content {
  position: relative;
  z-index: 1; /* Place the content below the curtains */
  padding: 20px;
  text-align: center;
}

@keyframes openCurtains {
  0% {
    transform: scaleX(1); /* Start with curtains fully closed */
  }
  100% {
    transform: scaleX(0); /* Close the curtains */
  }
}
</style>
