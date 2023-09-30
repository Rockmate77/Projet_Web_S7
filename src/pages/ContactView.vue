<template>
  <div class="container mt-5">
    <h1>Contact Us:</h1>
    <p>Accueil :<a :href="telLink">{{phone}}</a></p>
    <p>Email : <a :href="emailLink">{{email}}</a></p>
  </div>
</template>

<style>
p {
  color: white;
}
</style>
<script>
export default {
  data() {
    return {
      email: 'mail.generique@efrei.fr',
      phone: '+33 188 289 000',
    };
  },
  computed: {
    emailLink() {
      return `mailto:${this.email}`;
    },
    telLink() {
      return `tel:${this.phone}`;
    },
  },
};
</script>