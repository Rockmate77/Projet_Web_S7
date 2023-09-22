

<template>
  <div class="container">
    <div class="textmid">Welcome on Circus Clicker</div>
    <div class="line"></div>
    <div id="buttons_c">
      <a href="#" class="buttonenter">Load Game</a>
      <a href="#" class="buttonenter">New Game</a>
    </div>

  </div>
</template>

<style>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

/* Style for the text */
.textmid {
  font-size: 36px;
  text-align: center;
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
  font-size: 24px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  margin: 0 10px; /* Add space between buttons */
}

/* Hover effect for the button (optional) */
.buttonenter:hover {
  background-color: #555;
}

/* Responsive styles */
@media screen and (max-width: 768px) {
  /* Reduce font size for smaller screens */
  .text {
    font-size: 18px;
  }

  /* Adjust line width for smaller screens */
  .line {
    width: 80px;
  }

  /* Adjust button padding for smaller screens */
  .buttonenter {
    padding: 8px 16px;
  }
}
</style>