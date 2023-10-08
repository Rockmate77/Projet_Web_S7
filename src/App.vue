<script setup xmlns="http://www.w3.org/1999/html">
import HeaderView from "@/components/HeaderView.vue";
import WelcomeView from "@/pages/WelcomeView.vue";
</script>
<script>
export default {
  methods: {
    isWelcomed() {
      const serializedFile = sessionStorage.getItem("uploadedFile");
      return !!serializedFile;
    }
  }
};
</script>

<template>
  <div class="centered-container">
    <div v-if="!this.isWelcomed()">
      <WelcomeView/>
    </div>
    <div v-else>
      <HeaderView/>
      <router-view></router-view>
    </div>
  </div>
</template>
<style>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>


