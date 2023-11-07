
<template>
  <nav  class=" navbar_custom navbar navbar-expand-lg bg-body-tertiary" style="font-size: 1vw">
    <div class="container-fluid" style="font-size: 1vw">
      <router-link  to="game" class="navbar-brand" >Circus Clicker</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" style="font-size: 1vw" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li  class="nav-item">
            <a v-if="this.retrieveFile()" :href="downloadUrl" download="uploadedFile.json" class="nav-link active" aria-current="page" href="#">Save game</a>
          </li>
          <li  class="nav-item">
            <router-link to="about" class="nav-link active" aria-current="page" href="#">About</router-link>
          </li>
          <li  class="nav-item">
            <router-link to="contact" class="nav-link active" aria-current="page" href="#">Contact</router-link>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<style>
.navbar_custom {
  position: fixed; /* La barre de navigation reste fixée en haut de l'écran */
  top: 0; /* La barre de navigation sera au sommet de la page */
  left: 0;
  width: 100%; /* La barre de navigation occupe toute la largeur de l'écran */
  background-color: #333; /* Couleur de fond de la barre de navigation */
  color: #fff; /* Couleur du texte de la barre de navigation */
  padding: 10px 0; /* Espacement intérieur pour le contenu de la barre de navigation */
  z-index: 1000; /* Assurez-vous que la barre de navigation est au-dessus de tout le reste */
  height: max-content;
  font-size: 1vw;
}
</style>
<script>
export default {
  data() {
    return {
      fileData: null,
      downloadUrl: "",
    };
  },
  methods: {
    retrieveFile() {
      var serializedFile = sessionStorage.getItem("uploadedFile");
      if (serializedFile) {
        this.fileData = JSON.parse(serializedFile);
        console.log("file retrieved")
        this.generateDownloadUrl(serializedFile);
        return true;
      } else {
        this.fileData = null;
        console.log("file not retrieved")
        this.downloadUrl = "";
        return false;
      }
    },
    generateDownloadUrl(serializedFile) {
      const blob = new Blob([serializedFile], { type: "application/json" });
      this.downloadUrl = URL.createObjectURL(blob);
      console.log("URL generated")
    },
  },
};
</script>