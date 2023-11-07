

<template>
  <div class="container">
    <div class="textmid">Welcome on Circus Clicker</div>
    <div class="line"></div>
    <div id="buttons_c">
      <label class="buttonenter textmid" style="border: none">
        <input type="file" ref="fileInput" @change="handleFileChange"  style="display:none"/>
        Load Save
      </label>
        <!-- Display your content for valid XML files here -->
        <a v-if="fileExtensionValid" href="/game"  class="buttonenter textmid" aria-current="page">Continue</a>
        <!-- Display a message or content for invalid files here -->
        <a  v-else @click="createFile()" href="/game" class="buttonenter textmid" aria-current="page">New Game</a>
      <br><br>
      <div v-if="this.selectedFile!=null">
        <p v-if="!fileExtensionValid" style="color: red">Please enter a valid xml file</p>
        <p style="color: black">you selected: {{this.selectedFile.name}}</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFile: null,
      fileContent: null,
    };
  },
  computed: {
    fileExtensionValid() {
      if (this.selectedFile) {
        const fileName = this.selectedFile.name;
        return fileName.endsWith(".json");
      }
      return false;
    },
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      this.uploadFile()
    },
    uploadFile() {
      if (this.selectedFile) {
        console.log(this.selectedFile);
        var obj = this.parseJsonFile(this.selectedFile);
        // Store the JSON content in sessionStorage
        obj.then(function(result) {
          console.log(result);
          sessionStorage.setItem("uploadedFile", JSON.stringify(result));
        });
      } else {
        console.error("No file selected.");
      }
    },
    createFile() {
      const file = JSON.parse('{' +
          '    "visiteurs": 0,' +
          '    "clickValue": 50,' +
          '    "upgrades": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],' +
          '    "basePrices": [150, 1000, 5000, 30000, 100000, 400000, 2000000, 16666666, 1234567890, 39999999999],' +
          '    "autoUpgrade": null,' +
          '    "gameRate": 1.07,' +
          '    "buttons": [{ "isActive": true, "isBought" : false, "label": "clic 2x" },{ "isActive": true, "isBought" : false, "label": "clic 2x" },{ "isActive": true, "isBought" : false, "label": "clic 3x" },{ "isActive": true, "isBought" : false, "label": "clic 3x" },{ "isActive": true, "isBought" : false, "label": "clic 4x" },{ "isActive": true, "isBought" : false, "label": "clic 4x" },{ "isActive": true, "isBought" : false, "label": "clic 9x" }]' +
          '}');

      sessionStorage.setItem("uploadedFile", JSON.stringify(file));
      console.log("new save file created")
    },
    async parseJsonFile(file) {
      return await new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = event => resolve(JSON.parse(event.target.result))
        fileReader.onerror = error => reject(error)
        fileReader.readAsText(file)
      })
    }
  },
};
</script>
<style>

.custom-file-upload input[type="file"] {
  display: none;
}
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

/* Style for the text */
div {
  font-size: 4vw;
  text-align: center;
}
@media screen and (min-width: 530px) {
  div {
    font-size: 25px;
    text-align: center;
  }
}

/* Style for the line */
.line {
  background-color: #333;
  margin: 30px auto; /* Center the line horizontally */
  height: 4px;
  width: auto; /* Set width to auto initially */
}


/* Style for the button */
.buttonenter {
  padding: 15px 30px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  height: min-content;
  text-decoration: none;
  margin: 0 10px; /* Add space between buttons */
}

/* Hover effect for the button (optional) */
.buttonenter:hover {
  background-color: #555;
}
.rl{
  color: #fff;
  font-weight: bold;
}
.rl:hover {
  background-color: #555;

}

/* Responsive styles */
@media screen and (max-width: 768px) {
  /* Reduce font size for smaller screens */
  .text {
    font-size: 18px;
  }

  /* Adjust button padding for smaller screens */
  .buttonenter {
    padding: 8px 16px;
  }
}
label{
  display: inline;
}
</style>